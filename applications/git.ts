import { execSync } from 'node:child_process';
import chalk from 'chalk';

function installGit() {
  try {
    // Check if Git is already installed
    execSync('type -p git', { stdio: 'ignore' });
    console.log(chalk.yellow('Git is already installed.'));
  } catch {
    console.log(chalk.blue('Installing Git...'));
    execSync('brew install git', { stdio: 'inherit' });
    console.log(chalk.green('Installed Git successfully.'));
  }
}

export default installGit;
