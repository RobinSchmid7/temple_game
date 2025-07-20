#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎮 Starting Temple Game Server...${NC}"

# Get the actual IP address
IP=$(ifconfig en0 | grep "inet " | awk '{print $2}')

if [ -z "$IP" ]; then
    echo -e "${YELLOW}⚠️  Could not detect IP address. Using localhost.${NC}"
    IP="localhost"
fi

echo -e "${BLUE}📡 Starting Docker container...${NC}"

# Start Docker in the background
docker-compose up --build -d

# Wait a moment for the container to start
sleep 3

echo ""
echo -e "${GREEN}🎮 Temple Game Server is running!${NC}"
echo -e "${BLUE}📍 Local:    http://localhost:8080${NC}"
echo -e "${BLUE}🌐 Network:  http://${IP}:8080${NC}"
echo ""
echo -e "${YELLOW}💡 Share http://${IP}:8080 with others on your WiFi to play together!${NC}"
echo ""
echo -e "Commands:"
echo -e "  ${BLUE}./stop-game.sh${NC}  - Stop the game server"
echo -e "  ${BLUE}docker-compose logs -f${NC}  - View server logs" 