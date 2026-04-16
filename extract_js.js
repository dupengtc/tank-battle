const fs = require('fs');
const html = fs.readFileSync('C:/Users/Garu/.qclaw/workspace-agent-2e1ffa57/tank-battle/tank-battle.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  fs.writeFileSync('C:/Users/Garu/.qclaw/workspace-agent-2e1ffa57/tank-battle/game.js', scriptMatch[1]);
  console.log('Extracted ' + scriptMatch[1].length + ' characters');
} else {
  console.log('No script found');
}
