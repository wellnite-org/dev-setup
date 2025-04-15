import chalk from 'chalk';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function replaceInFile(filePath: string, searchValue: string, replaceValue: string) {
  try {
    if (fs.existsSync(filePath)) {
      let fileContent = fs.readFileSync(filePath, 'utf8');
      fileContent = fileContent.replace(searchValue, replaceValue);
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(chalk.blue('Updated SDKMAN configuration file.'));
    } else {
      console.log(chalk.yellow('SDKMAN configuration file not found.'));
    }
  } catch {
    console.error(chalk.red('Error updating SDKMAN configuration file'));
  }
}

function installSdkman() {
  const homeDir = os.homedir();
  const currentOS = os.type();

  try {
    // Check if SDKMAN is installed
    const sdkmanInitPath = path.join(homeDir, '.sdkman', 'bin', 'sdkman-init.sh');
    execSync(`bash -c "source ${sdkmanInitPath}"`, { stdio: 'ignore' });
    console.log(chalk.yellow('SDKMAN is already installed.'));
    return;
  } catch {
    console.log(chalk.blue('Installing SDKMAN...'));
    execSync('curl -s https://get.sdkman.io | bash', { stdio: 'inherit' });

    const sdkmanConfigPath = path.join(homeDir, '.sdkman', 'etc', 'config');

    if (currentOS === 'Darwin') {
      console.log(chalk.blue('Enabling automatic JDK selection if a .sdkmanrc file is present in a repository...'));
      replaceInFile(sdkmanConfigPath, 'sdkman_auto_env=false', 'sdkman_auto_env=true');
    } else {
      console.error(chalk.yellow('Unsupported operating system for SDKMAN configuration. Please do it manually.'));
    }

    console.log(chalk.green('Installed SDKMAN successfully.'));
  }
}

export default installSdkman;
