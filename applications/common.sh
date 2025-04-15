#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Homebrew if not present
install_homebrew() {
    if ! command_exists brew; then
        echo -e "${BLUE}Installing Homebrew...${NC}"
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        echo -e "${GREEN}Homebrew is already installed${NC}"
    fi
}

# Function to install Git if not present
install_git() {
    if ! command_exists git; then
        echo -e "${BLUE}Installing Git...${NC}"
        brew install git
    else
        echo -e "${GREEN}Git is already installed${NC}"
    fi
}

# Function to install Docker if not present
install_docker() {
    if ! command_exists docker; then
        echo -e "${BLUE}Installing Docker...${NC}"
        brew install --cask docker
    else
        echo -e "${GREEN}Docker is already installed${NC}"
    fi
}

# Function to install Google Cloud SDK if not present
install_google_cloud_sdk() {
    if ! command_exists gcloud; then
        echo -e "${BLUE}Installing Google Cloud SDK...${NC}"
        brew install --cask google-cloud-sdk
    else
        echo -e "${GREEN}Google Cloud SDK is already installed${NC}"
    fi
}

# Function to install Visual Studio Code if not present
install_vscode() {
    if ! command_exists code; then
        echo -e "${BLUE}Installing Visual Studio Code...${NC}"
        brew install --cask visual-studio-code
    else
        echo -e "${GREEN}Visual Studio Code is already installed${NC}"
    fi
}

# Main installation process
echo -e "${BLUE}Installing common development tools...${NC}"
install_homebrew
install_git
install_docker
install_google_cloud_sdk
install_vscode 