import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import { startSudo, stopSudo } from './helpers/sudoKeepAlive.ts';

// support no colors
const installTooling = async () => {
  try {
    const disciplines = await checkbox({
      message: 'Which discipline would you like to install tooling for?',
      choices: [
        {
          name: 'Web',
          value: 'web',
          description: 'If you are working on the web application'
        },
        {
          name: 'Backend',
          value: 'backend',
          description: 'If you are working on the backend application',
          disabled: '(Coming soon)'
        },
        {
          name: 'iOS',
          value: 'ios',
          description: 'If you are working on the iOS application',
        },
        {
          name: 'Android',
          value: 'android',
          description: 'If you are working on the android application',
        }
      ]
    });

    console.log(chalk.greenBright(`Installing tooling for: ${disciplines.join(', ')}`));
    console.log(chalk.blueBright(`You may be prompted for your password to run some installers with sudo.`));

    const sudoPid = startSudo();
    for (const discipline of disciplines) {
      try {
        const installer = await import(`./disciplines/${discipline}.ts`);
        installer.default();
      } catch (error) {
        console.error(chalk.red(`Failed to load tooling for ${discipline}`), error);
      }
    }
    stopSudo(sudoPid);
  } catch (error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
      // noop; silence this error
    } else {
      throw error;
    }
  }
};

installTooling();
