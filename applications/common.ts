import installDocker from './docker.ts';
import installGit from './git.ts';
import installGoogleCloudSDK from './googleCloudSDK.ts';
import installHomebrew from './homebrew.ts';
import installVisualStudioCode from './visualStudioCode.ts';

function installCommonBase() {
  //TODO: Add SSH doctor script to confirm that SSH is working
  installHomebrew();
  installGit();
}

function installCommon() {
    installCommonBase();
    installDocker();
    installGoogleCloudSDK();
    installVisualStudioCode();
}

export { installCommon };
