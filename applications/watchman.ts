import { execSync } from 'node:child_process';
import chalk from 'chalk';

function installWatchman() {
  try {
    // Check if Watchman is already installed
    execSync('command -v watchman', { stdio: 'ignore' });
    console.log(chalk.yellow('Watchman is already installed.'));
  } catch {
    console.log(chalk.blue('Installing Watchman...'));
    execSync('brew install watchman', { stdio: 'inherit' });
    console.log(chalk.green('Installed Watchman successfully.'));
  }
}

export default installWatchman;
