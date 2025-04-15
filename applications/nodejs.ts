import { execSync } from 'node:child_process';
import chalk from 'chalk';
import os from 'node:os';

function installNode() {
  const version = 'lts/*';
  const shell = process.env.SHELL || '';
  const homeDir = os.homedir();

  // Script is currently only tested on bash and zsh shells
  if (!shell.includes('zsh') && !shell.includes('bash')) {
    console.error(chalk.red('Unsupported shell for Node installation. Please install it manually.'));
    return;
  }

  try {
    // Check if Node.js is already installed
    execSync('command -v node', { stdio: 'ignore' });
    console.log(chalk.yellow('Node.js is already installed.'));
    return;
  } catch {
    console.log(chalk.blue('Installing Node.js (LTS version) using NVM...'));
    // execSync starts a non-interactive shell, so we need to source the NVM script to use it
    execSync(`bash -c "source ${homeDir}/.nvm/nvm.sh && nvm install ${version} --latest-npm"`, { stdio: 'inherit' });
    execSync(`bash -c "source ${homeDir}/.nvm/nvm.sh && nvm use ${version}"`, { stdio: 'inherit' });
  }

  console.log(chalk.green('Installed Node.js successfully.'));
}

export default installNode;
