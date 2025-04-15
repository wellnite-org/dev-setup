import { exec, spawn } from 'node:child_process';

function startSudo() {
  // Run `sudo -v` to keep sudo alive and spawn a background process to refresh it
  const sudoProcess = spawn('bash', ['-c', 'while true; do sudo -v; sleep 60; done'], {
    detached: true,
    stdio: 'ignore'
  });

  // Save the PID of the sudo process
  const sudoPid = sudoProcess.pid;
  console.log(`Sudo process started with PID: ${sudoPid}`);

  // Set up signal handlers to stop the sudo process on termination
  process.on('SIGINT', () => stopSudo(sudoPid));
  process.on('SIGTERM', () => stopSudo(sudoPid));
  
  return sudoPid;
}

function stopSudo(pid?: number) {
  if (pid) {
    console.log('Stopping sudo...');

    // Kill the sudo process
    process.kill(pid);

    // Expire the sudo session
    exec('sudo -k', (error) => {
      if (error) {
        console.error('Error expiring sudo session:', error.message);
      } else {
        console.log('Sudo session expired.');
      }
    });

    process.exit();
  }
}

export { startSudo, stopSudo };
