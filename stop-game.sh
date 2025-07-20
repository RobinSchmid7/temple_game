#!/bin/bash

# Colors for pretty output
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}🛑 Stopping Temple Game Server...${NC}"

# Stop Docker containers
docker-compose down

echo -e "${BLUE}✅ Game server stopped!${NC}"
echo ""
echo -e "To start again, run: ${BLUE}./start-game.sh${NC}" 