#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
RED='\033[0;31m'

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install NVM
install_nvm() {
    local NVM_INSTALLER="https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh"
    local shell="$SHELL"
    
    # Check if NVM is already installed and working
    if [ -s "$HOME/.nvm/nvm.sh" ] && command -v nvm >/dev/null 2>&1; then
        echo -e "${GREEN}NVM is already installed${NC}"
        return
    fi
    
    # Check for supported shell
    if [[ ! "$shell" =~ (zsh|bash)$ ]]; then
        echo -e "${RED}Unsupported shell for NVM installation. Please install it manually.${NC}"
        return 1
    fi
    
    # Create shell config file if it doesn't exist
    if [[ "$shell" == *"zsh"* ]]; then
        touch "$HOME/.zshrc"
    else
        touch "$HOME/.bash_profile"
    fi
    
    # Install NVM
    echo -e "${BLUE}Installing NVM...${NC}"
    curl -o- "$NVM_INSTALLER" | bash
    
    # Load NVM in current shell
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Verify installation
    if command -v nvm >/dev/null 2>&1; then
        echo -e "${GREEN}NVM installed successfully${NC}"
    else
        echo -e "${RED}NVM installation failed${NC}"
        return 1
    fi
}

# Function to install Node.js
install_node() {
    local version="lts/*"
    local shell="$SHELL"
    
    # Check for supported shell
    if [[ ! "$shell" =~ (zsh|bash)$ ]]; then
        echo -e "${RED}Unsupported shell for Node installation. Please install it manually.${NC}"
        return 1
    fi
    
    # Check if Node.js is already installed
    if command_exists node; then
        echo -e "${GREEN}Node.js is already installed${NC}"
        return
    fi
    
    echo -e "${BLUE}Installing Node.js (LTS version) using NVM...${NC}"
    
    # Load NVM and install Node.js
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Install Node.js with latest npm
    if nvm install "$version" --latest-npm; then
        nvm use "$version"
        echo -e "${GREEN}Node.js installed successfully${NC}"
    else
        echo -e "${RED}Node.js installation failed${NC}"
        return 1
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