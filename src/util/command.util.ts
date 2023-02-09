import { exec } from 'child_process';

export function runCommand(command: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
