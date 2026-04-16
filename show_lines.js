const fs = require('fs');
const s = fs.readFileSync('C:/Users/Garu/.qclaw/workspace-agent-2e1ffa57/tank-battle/tank-battle.html', 'utf8');
const lines = s.split('\n');
let charCount = 0;
let targetLine = 0;
for (let i = 0; i < lines.length; i++) {
  if (charCount + lines[i].length >= 30673) {
    targetLine = i;
    break;
  }
  charCount += lines[i].length + 1;
}
console.log('function drawMinimap is at line', targetLine + 1);
console.log('Showing lines', targetLine + 1, 'to', targetLine + 25);
for (let i = targetLine; i < Math.min(targetLine + 25, lines.length); i++) {
  console.log((i+1) + ':', lines[i].substring(0, 100));
}
