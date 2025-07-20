import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, "../../../../client/build");
app.use(express.static(clientBuildPath));

app.get("/ping", (req, res) => {
  res.json({ status: "success" });
});

// Serve React app for all other routes (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

export default app;
