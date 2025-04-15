#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Homebrew if not present
install_homebrew() {
    if ! command_exists brew; then
        # Check if running on macOS
        if [[ "$(uname)" != "Darwin" ]]; then
            echo -e "${RED}Unsupported operating system for Homebrew installation. Please install it manually or use an alternative.${NC}"
            return 1
        fi

        echo -e "${BLUE}Installing Homebrew...${NC}"
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        # Append Homebrew initialization to .zprofile if not already present
        if ! grep -q 'eval "$(/opt/homebrew/bin/brew shellenv)"' "$HOME/.zprofile"; then
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"
        fi

        # Immediately evaluate the Homebrew environment settings for the current session
        eval "$(/opt/homebrew/bin/brew shellenv)"

        # Disable Homebrew analytics
        brew analytics off

        echo -e "${GREEN}Installed Homebrew successfully.${NC}"
    else
        echo -e "${YELLOW}Homebrew is already installed.${NC}"
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
        # Check if running on macOS
        if [[ "$(uname)" != "Darwin" ]]; then
            echo -e "${RED}Unsupported operating system for Google Cloud SDK installation. Please install it manually.${NC}"
            return 1
        fi

        echo -e "${BLUE}Installing Google Cloud SDK...${NC}"
        brew install --cask google-cloud-sdk

        # Initialize gcloud
        echo -e "${BLUE}Initializing Google Cloud SDK...${NC}"
        gcloud init

        echo -e "${GREEN}Installed Google Cloud SDK successfully.${NC}"
    else
        echo -e "${YELLOW}Google Cloud SDK is already installed.${NC}"
    fi
}

# Function to add VS Code to PATH
add_code_command() {
    local shell="$SHELL"
    local home_dir="$HOME"
    local profile_script
    
    # Determine the appropriate shell profile script
    if [[ "$shell" == *"zsh"* ]]; then
        profile_script="$home_dir/.zshrc"
    else
        profile_script="$home_dir/.bash_profile"
    fi

    local code_path="/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
    local command_to_add="\n# Add Visual Studio Code (code)\nexport PATH=\"\$PATH:${code_path}\"\n"

    # Append the command to the shell profile script if not already present
    if ! grep -q "export PATH=\"\$PATH:${code_path}\"" "$profile_script"; then
        echo -e "$command_to_add" >> "$profile_script"
    fi
}

# Function to install Visual Studio Code if not present
install_vscode() {
    if [ ! -d "/Applications/Visual Studio Code.app" ]; then
        echo -e "${BLUE}Installing Visual Studio Code...${NC}"
        brew install --cask visual-studio-code

        # Add the `code` command to the shell profile script
        add_code_command

        echo -e "${GREEN}Installed Visual Studio Code successfully.${NC}"
    else
        echo -e "${YELLOW}Visual Studio Code is already installed.${NC}"
    fi
}

# Main installation process
echo -e "${BLUE}Installing common development tools...${NC}"
install_homebrew
install_git
install_docker
install_google_cloud_sdk
install_vscode 