import { execSync } from 'node:child_process';
import chalk from 'chalk';
import os from 'node:os';

function installGoogleCloudSDK() {
  const currentOS = os.type();
  try {
    // Check if Google Cloud SDK is already installed
    execSync('type -p gcloud', { stdio: 'ignore' });
    console.log(chalk.yellow('Google Cloud SDK is already installed.'));
  } catch {
    // Script is currently only tested on macOS
    if (currentOS === 'Darwin') {
      console.log(chalk.blue('Installing Google Cloud SDK...'));
      // we can install kubectl here in future if needed
      execSync(`brew install --cask google-cloud-sdk`, { stdio: 'inherit' });
      // we can install kubectl above and gke-cloud-auth-plugin here in future if needed
      // execSync(`gcloud components install gke-cloud-auth-plugin --quiet`, { stdio: 'inherit' });
      console.log(chalk.green('Installed Google Cloud SDK successfully.'));
    } else {
      console.error(chalk.red('Unsupported operating system for Google Cloud SDK installation. Please install it manually.'));
      return;
    }

    // Initialize gcloud
    execSync('gcloud init', { stdio: 'inherit' });
    // Configure docker to use your gcloud credentials for authorization?
    // execSync('gcloud auth configure-docker', { stdio: 'inherit' });
  }
}

export default installGoogleCloudSDK;
