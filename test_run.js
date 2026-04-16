const fs = require('fs');
const html = fs.readFileSync('C:/Users/Garu/.qclaw/workspace-agent-2e1ffa57/tank-battle/tank-battle.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  console.log('ERROR: No script found');
  process.exit(1);
}

const js = scriptMatch[1];

// Mock DOM globals
// Mock canvas with getContext
const createMockCanvas = () => ({
  width: 800,
  height: 564,
  getContext: (type) => mockCtx,
  style: { display: 'block' }
});

global.document = {
  getElementById: (id) => {
    if (id === 'c' || id === 'minimap') {
      return createMockCanvas();
    }
    return {
      textContent: '',
      innerHTML: '',
      style: { display: 'block' },
      appendChild: () => {},
      innerHTML: ''
    };
  },
  createElement: (tag) => {
    if (tag === 'canvas') {
      return createMockCanvas();
    }
    return {
      className: '',
      appendChild: () => {}
    };
  },
  addEventListener: () => {}
};

global.window = { 
  AudioContext: function() {},
  webkitAudioContext: function() {},
  requestAnimationFrame: (cb) => setTimeout(cb, 16)
};
global.AudioContext = function() {};
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);

// Mock canvas context
const mockCtx = {
  fillStyle: '',
  fillRect: () => {},
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  scale: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  stroke: () => {},
  drawImage: () => {},
  createOscillator: () => ({ frequency: { value: 0 }, type: '', connect: () => {}, start: () => {}, stop: () => {} }),
  createGain: () => ({ gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }),
  destination: {}
};

global.HTMLCanvasElement = function() {};
global.HTMLCanvasElement.prototype.getContext = () => mockCtx;

console.log('Starting script execution...');

try {
  // Execute the script
  eval(js);
  console.log('Script executed successfully!');
  console.log('gameState:', typeof gameState !== 'undefined' ? gameState : 'undefined');
  console.log('player:', typeof player !== 'undefined' ? (player ? 'exists' : 'null') : 'undefined');
} catch(e) {
  console.log('ERROR:', e.message);
  if (e.stack) {
    const lines = e.stack.split('\n').slice(0, 5);
    lines.forEach(l => console.log('  ', l));
  }
}
