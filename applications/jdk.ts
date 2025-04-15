import chalk from 'chalk';
import { execSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

function installJdk() {
  let version = '17';
  let distribution: string;
  const architecture = os.arch();
  const homeDir = os.homedir();
  const sdkmanInitPath = path.join(homeDir, '.sdkman', 'bin', 'sdkman-init.sh');

  // try {
  //   // Check if JDK is already installed
  //   execSync('command -v java', { stdio: 'ignore' });
  //   console.log(chalk.yellow('JDK is already installed.'));
  //   return;
  // } catch {
    console.log(chalk.blue(`Finding the latest version of Corretto JDK for Java ${version}...`));

    if (architecture === 'arm64') {
      console.log(chalk.blue('ARM64 architecture detected. Using Zulu JDK...'));
      // execSync starts a non-interactive shell, so we need to source the SDKMAN script to use it
      distribution = execSync(
        `bash -c "source ${sdkmanInitPath} && sdk list java | grep zulu | cut -d '|' -f 6 | grep -E "^.*${version}" | head -n 1"`,
        {
          encoding: 'utf8'
        }
      ).trim();
    } else {
      console.log(chalk.blue('Using Corretto JDK...'));
      // execSync starts a non-interactive shell, so we need to source the SDKMAN script to use it
      distribution = execSync(
        `bash -c "source ${sdkmanInitPath} && sdk list java | grep amzn | cut -d '|' -f 6 | grep -E "^.*${version}" | head -n 1"`,
        {
          encoding: 'utf8'
        }
      ).trim();
    }

    console.log(chalk.blue(`Installing JDK version: ${distribution}`));
    // execSync starts a non-interactive shell, so we need to source the SDKMAN script to use it
    execSync(`bash -c "source ${sdkmanInitPath} && sdk install java ${distribution}"`, { stdio: 'inherit' });
    console.log(chalk.green(`Installed JDK version ${distribution} successfully.`));
  // }
}

export default installJdk;
