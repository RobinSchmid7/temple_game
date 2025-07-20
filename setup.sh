#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up Temple Game...${NC}"
echo ""

# Make scripts executable
echo -e "${BLUE}📝 Making scripts executable...${NC}"
chmod +x start-game.sh stop-game.sh

# Check if Docker is installed and running
echo -e "${BLUE}🐳 Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker Desktop first.${NC}"
    echo -e "${YELLOW}   Download from: https://www.docker.com/products/docker-desktop${NC}"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running!${NC}"

# Check if Docker Compose is available
echo -e "${BLUE}🔧 Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker Compose is available!${NC}"

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${BLUE}Commands available:${NC}"
echo -e "  ${GREEN}./start-game.sh${NC}  - Start the game server"
echo -e "  ${RED}./stop-game.sh${NC}   - Stop the game server"
echo ""
echo -e "${YELLOW}💡 Run ./start-game.sh to get started!${NC}" 