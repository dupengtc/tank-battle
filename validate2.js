const fs = require('fs');
const path = 'C:\\Users\\Garu\\.qclaw\\workspace-agent-2e1ffa57\\tank-battle\\tank-battle.html';
const html = fs.readFileSync(path, 'utf8');

// Extract script content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
    console.log('ERROR: No script tag found');
    process.exit(1);
}

const jsCode = scriptMatch[1];
console.log('JavaScript length:', jsCode.length, 'bytes');

// Try to parse with more detail
const vm = require('vm');

// Check for specific issues
const lines = jsCode.split('\n');
console.log('Total lines:', lines.length);

// Check each line for obvious issues
let issues = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    // Check for unmatched braces in function definitions
    if (line.includes('function') && line.includes('{')) {
        // This is fine
    }
}

// Try to find the error location
try {
    new vm.Script(jsCode);
    console.log('✅ JavaScript syntax is valid');
} catch (e) {
    console.log('❌ Syntax error:', e.message);
    if (e.stack) {
        console.log('Stack:', e.stack);
    }
    
    // Try to find the problematic area
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        console.log('Error around position:', pos);
        console.log('Context:');
        console.log(jsCode.substring(Math.max(0, pos - 50), pos + 50));
    }
}
