import { execSync } from 'node:child_process';
import chalk from 'chalk';

function installCocoapods() {
  try {
    // Check if Cocoapods is already installed
    execSync('command -v pod', { stdio: 'ignore' });
    console.log(chalk.yellow('Cocoapods is already installed.'));
  } catch {
    console.log(chalk.blue('Installing Cocoapods...'));
    execSync('brew install cocoapods', { stdio: 'inherit' });
    console.log(chalk.green('Installed Cocoapods successfully.'));
  }
}

export default installCocoapods;
