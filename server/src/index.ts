import httpServer from "./server";

const os = require("os");
const PORT = (process as any).env.PORT || 4000;

// Function to get local IP address  
const getLocalIP = (): string => {
  const nets = os.networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  // Return the first external IPv4 address found
  for (const name of Object.keys(results)) {
    if (results[name].length > 0) {
      return results[name][0];
    }
  }
  
  return 'localhost';
};

httpServer.listen(PORT, undefined, () => {
  const isDocker = (process as any).env.NODE_ENV === 'production' || (process as any).env.DOCKER_ENV;
  
  console.log(`🎮 Temple Game Server is running!`);
  
  if (isDocker) {
    // For Docker, we need to get the host machine's IP, not the container IP
    const { execSync } = require('child_process');
    
    let hostIP = 'localhost';
    try {
      // Try to get the host machine's IP address (works on Mac/Linux)
      const result = execSync("ip route show default | awk '/default/ {print $3}' 2>/dev/null || route -n get default | grep gateway | awk '{print $2}' 2>/dev/null || echo 'localhost'", { encoding: 'utf8' }).trim();
      if (result && result !== 'localhost' && result.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        hostIP = result;
      } else {
        // Fallback: try to get Docker host IP
        const dockerResult = execSync("getent hosts host.docker.internal | awk '{print $1}' 2>/dev/null || echo 'localhost'", { encoding: 'utf8' }).trim();
        if (dockerResult && dockerResult !== 'localhost' && dockerResult.match(/^\d+\.\d+\.\d+\.\d+$/)) {
          hostIP = dockerResult;
        }
      }
    } catch (e) {
      // If all fails, use localhost
      hostIP = 'localhost';
    }
    
    console.log(`📍 Local:    http://localhost:8080`);
    if (hostIP !== 'localhost') {
      console.log(`🌐 Network:  http://${hostIP}:8080`);
      console.log(`\n💡 Share http://${hostIP}:8080 with others on your WiFi!`);
    } else {
      console.log(`🌐 Network:  http://[your-ip]:8080`);
      console.log(`\n💡 Find your IP with: ifconfig en0 | grep "inet " | awk '{print $2}'`);
      console.log(`💡 Then share http://[your-ip]:8080 with others on your WiFi!`);
    }
  } else {
    const localIP = getLocalIP();
    console.log(`📍 Local:    http://localhost:${PORT}`);
    console.log(`🌐 Network:  http://${localIP}:${PORT}`);
    console.log(`\n💡 Share the Network URL with others on your WiFi to play together!`);
  }
});
