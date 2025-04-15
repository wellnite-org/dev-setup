import chalk from 'chalk';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function addCodeCommand() {
  const shell = process.env.SHELL || '';
  const homeDir = os.homedir();
  // Determine the appropriate shell profile script
  let profileScript = path.join(homeDir, shell.includes('zsh') ? '.zshrc' : '.bash_profile');

  const codePath = '/Applications/Visual Studio Code.app/Contents/Resources/app/bin';
  const commandToAdd = `# Add Visual Studio Code (code)\nexport PATH=\"$PATH:${codePath}\"\n`;

  // Append the command to the shell profile script
  if (fs.existsSync(profileScript)) {
    fs.appendFileSync(profileScript, commandToAdd);
  } else {
    fs.writeFileSync(profileScript, commandToAdd);
  }
}

function installVisualStudioCode() {
  const applicationName = 'Visual Studio Code';
  const applicationsPath = '/Applications';

  // Check if Visual Studio Code is already installed
  const installedApplications = fs.readdirSync(applicationsPath);
  if (installedApplications.includes(`${applicationName}.app`)) {
    console.log(chalk.yellow(`${applicationName} is already installed.`));
    return;
  }

  // Install Visual Studio Code using Homebrew
  console.log(chalk.blue(`Installing ${applicationName}...`));
  execSync('brew install --cask visual-studio-code', { stdio: 'inherit' });

  // Add the `code` command to the shell profile script
  addCodeCommand();
  console.log(chalk.green(`Installed ${applicationName} successfully.`));
}

export default installVisualStudioCode;
