import { execSync } from 'node:child_process';
import os from 'node:os';
import chalk from 'chalk';

function installHomebrew() {
  const HOMEBREW_INSTALLER = 'https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh';
  const currentOS = os.type();
  const homeDir = os.homedir();

  try {
    // Check if Homebrew is already installed
    execSync('type -p brew', { stdio: 'ignore' });
    console.log(chalk.yellow('Homebrew is already installed.'));
  } catch {
    // Script is currently only tested on macOS
    if (currentOS === 'Darwin') {
      console.log(chalk.blue('Installing Homebrew...'));
      execSync(`/bin/bash -c "$(curl -fsSL '${HOMEBREW_INSTALLER}')"`, { stdio: 'inherit' });
    } else {
      console.error(chalk.red('Unsupported operating system for Homebrew installation. Please install it manually or use an alternative.'));
      return;
    }
    // Append Homebrew initialization to .zprofile
    execSync(`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ${homeDir}/.zprofile`, { stdio: 'inherit' });
    // Immediately evaluate the Homebrew environment settings for the current session
    execSync(`eval "$(/opt/homebrew/bin/brew shellenv)"`, { stdio: 'inherit' });
    // Disable Homebrew analytics
    execSync('brew analytics off', { stdio: 'inherit' });
    console.log(chalk.blue('Installed Homebrew successfully.'));
  }
}

export default installHomebrew;
