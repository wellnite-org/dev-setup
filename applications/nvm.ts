import { execSync } from 'node:child_process';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function installNvm() {
  const NVM_INSTALLER = 'https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh';
  const homeDir = os.homedir();
  const shell = process.env.SHELL || '';

  try {
    // Check if NVM is installed
    execSync(`bash -c "source ${homeDir}/.nvm/nvm.sh && command -v nvm"`, { stdio: 'ignore' });
    console.log(chalk.yellow('NVM is already installed.'));
    return;
  } catch {
    // Script is currently only tested on bash and zsh shells
    if (!shell.includes('zsh') && !shell.includes('bash')) {
      console.error(chalk.red('Unsupported shell for NVM installation. Please install it manually.'));
      return;
    }

    if (shell.includes('zsh')) {
      const zshrcPath = path.join(homeDir, '.zshrc');
      // Check if .zshrc exists, create it if not
      if (!fs.existsSync(zshrcPath)) {
        fs.writeFileSync(zshrcPath, '');
      }
    } else {
      const bashProfilePath = path.join(homeDir, '.bash_profile');
      // Check if .bash_profile exists, create it if not
      if (!fs.existsSync(bashProfilePath)) {
        fs.writeFileSync(bashProfilePath, '');
      }
    }

    // Run the NVM installer
    console.log(chalk.blue('Installing NVM...'));
    execSync(`curl -o- "${NVM_INSTALLER}" | bash`, { stdio: 'inherit' });
    console.log(chalk.green('Installed NVM successfully.'));
  }
}

export default installNvm;
