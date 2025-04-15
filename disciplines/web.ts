import chalk from 'chalk';
import { installCommon } from '../applications/common.ts';
import installNode from '../applications/nodejs.ts';
import installNvm from '../applications/nvm.ts';
import installYarn from '../applications/yarn.ts';

function installWebTooling() {
  console.log(
    chalk.blueBright(`The following applications will be installed for web development:
    1. Homebrew
    2. Git
    3. Docker
    4. Google Cloud SDK
    5. Visual Studio Code
    6. NVM
    7. Node.js
    8. Yarn`)
  );
  installCommon();
  installNvm();
  installNode();
  installYarn();
  // npm registry setup further down the line(?)
}

export default installWebTooling;
