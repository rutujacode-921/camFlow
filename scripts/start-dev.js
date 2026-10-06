// Cross-platform runner to launch both Backend and Frontend concurrently
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

console.log('🚀 Starting CamFlow Backend Server (Port 5000)...');
const serverProcess = spawn(npmCmd, ['run', 'start'], {
  cwd: path.join(rootDir, 'server'),
  stdio: 'inherit',
  shell: true,
});

console.log('✨ Starting CamFlow Frontend Client (Port 5173)...');
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(rootDir, 'client'),
  stdio: 'inherit',
  shell: true,
});

process.on('SIGINT', () => {
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
});

