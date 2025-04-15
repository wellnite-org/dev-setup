import chalk from 'chalk';
import { installCommon } from '../applications/common.ts';
import installNode from '../applications/nodejs.ts';
import installNvm from '../applications/nvm.ts';
import installYarn from '../applications/yarn.ts';
import installSdkman from '../applications/sdkman.ts';
import installWatchman from '../applications/watchman.ts';
import installCocoapods from '../applications/cocoapods.ts';

function installIOSTooling() {
  console.log(
    chalk.blueBright(`The following applications will be installed for iOS development:
    1.  Homebrew
    2.  Git
    3.  Docker
    4.  Google Cloud SDK
    5.  Visual Studio Code
    6.  NVM
    7.  Node.js
    8.  Yarn
    9.  Watchman
    10. Cocoapods`)
  );
  installCommon();
  installNvm();
  installNode();
  installYarn();
  installWatchman();
  // Add Xcode installation
  installCocoapods();
}

export default installIOSTooling;
