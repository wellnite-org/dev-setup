import { execSync } from 'node:child_process';
import chalk from 'chalk';

function installDocker() {
  try {
    // Check if Docker is already installed
    execSync('type -p docker', { stdio: 'ignore' });
    console.log(chalk.yellow('Docker is already installed.'));
  } catch {
    console.log(chalk.blue('Installing Docker...'));
    execSync('brew install --cask docker', { stdio: 'inherit' });
    console.log(chalk.green('Installed Docker successfully.'));
  }
}

export default installDocker;
