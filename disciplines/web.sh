#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install NVM
install_nvm() {
    if [ ! -d "$HOME/.nvm" ]; then
        echo -e "${BLUE}Installing NVM...${NC}"
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    else
        echo -e "${GREEN}NVM is already installed${NC}"
    fi
}

# Function to install Node.js
install_node() {
    if ! command_exists node; then
        echo -e "${BLUE}Installing Node.js...${NC}"
        nvm install --lts
        nvm use --lts
    else
        echo -e "${GREEN}Node.js is already installed${NC}"
    fi
}

# Function to install Yarn
install_yarn() {
    if ! command_exists yarn; then
        echo -e "${BLUE}Installing Yarn...${NC}"
        npm install -g yarn
    else
        echo -e "${GREEN}Yarn is already installed${NC}"
    fi
}

# Main installation process
echo -e "${BLUE}The following applications will be installed for web development:${NC}"
echo "1. Homebrew"
echo "2. Git"
echo "3. Docker"
echo "4. Google Cloud SDK"
echo "5. Visual Studio Code"
echo "6. NVM"
echo "7. Node.js"
echo "8. Yarn"

# Install common tools
source ../applications/common.sh

# Install web-specific tools
install_nvm
install_node
install_yarn 