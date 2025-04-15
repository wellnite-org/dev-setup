#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display the menu
show_menu() {
    echo -e "${BLUE}Which discipline would you like to install tooling for?${NC}"
    echo "1) Web"
    echo "2) iOS"
    echo "3) Android"
    echo "4) Exit"
    echo
    read -p "Enter your choice (1-4): " choice
}

# Function to handle sudo password
handle_sudo() {
    # Keep sudo alive
    sudo -v
    while true; do
        sudo -n true
        sleep 60
        kill -0 "$$" || exit
    done 2>/dev/null &
    SUDO_PID=$!
}

# Function to stop sudo
stop_sudo() {
    if [ ! -z "$SUDO_PID" ]; then
        kill $SUDO_PID
    fi
}

# Main installation process
main() {
    show_menu
    
    case $choice in
        1)
            echo -e "${GREEN}Installing tooling for Web development...${NC}"
            cd disciplines && ./web.sh
            ;;
        2)
            echo -e "${GREEN}Installing tooling for iOS development...${NC}"
            cd disciplines && ./ios.sh
            ;;
        3)
            echo -e "${GREEN}Installing tooling for Android development...${NC}"
            cd disciplines && ./android.sh
            ;;
        4)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice. Please try again.${NC}"
            main
            ;;
    esac
}

# Start the installation process
echo -e "${BLUE}You may be prompted for your password to run some installers with sudo.${NC}"
handle_sudo
main
stop_sudo 