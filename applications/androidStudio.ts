import chalk from 'chalk';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function updateConfigFile(configFilePath: string, linesToAdd: string) {
  try {
    if (fs.existsSync(configFilePath)) {
      const fileContent = fs.readFileSync(configFilePath, 'utf8');
      if (fileContent.includes('ANDROID_HOME')) {
        return;
      }
      fs.appendFileSync(configFilePath, linesToAdd);
    } else {
      fs.writeFileSync(configFilePath, linesToAdd);
    }
    console.log(chalk.blue('Configured ANDROID_HOME environment variable.'));
  } catch {
    console.error(chalk.red('Error configuring ANDROID_HOME environment variable.'));
  }
}

function configureAndroidHome() {
  const homeDir = os.homedir();
  const androidHome = `${homeDir}/Library/Android/sdk`;
  const bashConfig = path.join(homeDir, '.bash_profile');
  const exportLines = `
# Android Studio Environment Variables
export ANDROID_HOME=${androidHome}
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
`;

  // Determine the user's shell and update the appropriate configuration file
  const shell = process.env.SHELL || '';

  // Script is currently only tested on bash and zsh shells
  if (!shell.includes('zsh') && !shell.includes('bash')) {
    console.error(chalk.red('Unsupported shell for ANDROID_HOME configuration. Please do it manually.'));
    return;
  }

  if (shell.includes('zsh')) {
    const zshrcPath = path.join(homeDir, '.zshrc');
    updateConfigFile(zshrcPath, exportLines);
  } else {
    updateConfigFile(bashConfig, exportLines);
  }
}

function installAndroidStudio() {
  const applicationName = 'Android Studio';
  const applicationsPath = '/Applications';

  // Check if Android Studio is already installed
  const installedApplications = fs.readdirSync(applicationsPath);
  if (installedApplications.includes(`${applicationName}.app`)) {
    console.log(chalk.yellow(`${applicationName} is already installed.`));
    return;
  }

  // Install Android Studio using Homebrew
  console.log(chalk.blue(`Installing ${applicationName}...`));
  execSync('brew install --cask android-studio', { stdio: 'inherit' });

  console.log(chalk.blue('Configuring the ANDROID_HOME environment variable...'));
  // Configure ANDROID_HOME environment variable
  configureAndroidHome();

  console.log(chalk.green(`Installed ${applicationName} successfully.`));
}

export default installAndroidStudio;
