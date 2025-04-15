# dev-setup

# Create the directory structure
mkdir -p dev-setup/{disciplines,applications,helpers}
cd dev-setup

# Download the main setup script
curl -s https://raw.githubusercontent.com/wellnite-org/dev-setup/master/setup.sh -o setup.sh

# Download discipline scripts
curl -s https://raw.githubusercontent.com/wellnite-org/dev-setup/master/disciplines/web.sh -o disciplines/web.sh
curl -s https://raw.githubusercontent.com/wellnite-org/dev-setup/master/disciplines/ios.sh -o disciplines/ios.sh
curl -s https://raw.githubusercontent.com/wellnite-org/dev-setup/master/disciplines/android.sh -o disciplines/android.sh

# Download application scripts
curl -s https://raw.githubusercontent.com/wellnite-org/dev-setup/master/applications/common.sh -o applications/common.sh

# Make all scripts executable
chmod +x setup.sh
chmod +x disciplines/*.sh
chmod +x applications/*.sh

# Run the setup script
./setup.sh
