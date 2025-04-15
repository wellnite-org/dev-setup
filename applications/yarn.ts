import { execSync } from 'node:child_process';
import chalk from 'chalk';

function installYarn() {
  const shell = process.env.SHELL || '';

  // Script is currently only tested on bash and zsh shells
  if (!shell.includes('zsh') && !shell.includes('bash')) {
    console.error(chalk.red('Unsupported shell for Yarn installation. Please install it manually.'));
    return;
  }

  try {
    // Check if Yarn is installed
    execSync("command -v yarn", { stdio: 'ignore' });
    console.log(chalk.yellow('Yarn is already installed.'));
    return;
  } catch {
    console.log(chalk.blue('Installing Yarn...'));
    execSync("corepack enable", { stdio: 'inherit' });
  }

  console.log(chalk.green('Installed Yarn successfully.'));
}

export default installYarn;
