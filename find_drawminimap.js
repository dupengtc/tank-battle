const fs = require('fs');
const s = fs.readFileSync('C:/Users/Garu/.qclaw/workspace-agent-2e1ffa57/tank-battle/tank-battle.html', 'utf8');
let pos = 0;
let count = 0;
while ((pos = s.indexOf('drawMinimap', pos)) !== -1) {
  count++;
  console.log(`Occurrence ${count} at position ${pos}:`);
  console.log(`  Context: ...${s.substring(Math.max(0, pos - 30), pos)}[drawMinimap]${s.substring(pos + 11, pos + 41)}...`);
  pos++;
}
