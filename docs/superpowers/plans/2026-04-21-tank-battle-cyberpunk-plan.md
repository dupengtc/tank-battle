# Tank Battle Cyberpunk UI & Fusion Gameplay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Tank Battle into a cyberpunk neon experience with strategic fusion mechanics

**Architecture:** Single HTML file modifications targeting three phases: (1) Visual foundation (CSS + HUD cyberpunk styling), (2) Fusion system core (powerup combining logic + 10 fusion effects), (3) Weapon system integration + polish

**Tech Stack:** Vanilla HTML/CSS/JS, Canvas 2D, Web Audio API, localStorage

---

## File Structure

- **Modify:** `tank-battle.html` (the only file — 150KB+ existing game)
  - CSS: Lines 8-59 (styles)
  - HUD HTML: Lines 70-114
  - Constants: Lines 135-500
  - Entity Classes: Lines 1075+ (Tank class ~line 1075)
  - Game Loop: Find and modify
  - Rendering: Find and modify

---

## Phase 1: Cyberpunk Visual Foundation

### Task 1: CSS Cyberpunk Overhaul

**Files:**
- Modify: `tank-battle.html:7-59` (CSS styles)

- [ ] **Step 1: Replace CSS color scheme**

Replace lines 7-59 with cyberpunk palette:

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #0a0a12;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}
#wrap {
  position: relative;
  display: inline-block;
  transform-origin: center;
  transform-style: preserve-3d;
}
#c {
  background: #0a0a12;
  display: block;
  image-rendering: pixelated;
  border: 2px solid #0ff;
  box-shadow: 0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(0,255,255,0.2), inset 0 0 20px rgba(0,255,255,0.1);
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,255,255,0.02);
  pointer-events: none;
  z-index: 2;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px);
}
#scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px);
  pointer-events: none;
  z-index: 3;
  opacity: 0.5;
}
#vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
  z-index: 3;
}
#crt-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  mix-blend-mode: screen;
  opacity: 0.05;
}
#hud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  background: rgba(10,10,18,0.95);
  color: #0ff;
  font-size: 13px;
  z-index: 4;
  border-bottom: 1px solid #0ff;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 15px rgba(0,255,255,0.3);
}
.hud-item { display: flex; align-items: center; gap: 8px; }
.hud-label { color: #888; font-size: 11px; letter-spacing: 1px; text-shadow: none; }
.hud-val { color: #0ff; font-weight: bold; min-width: 40px; text-shadow: 0 0 8px #0ff, 0 0 15px #0ff; }
.hud-val.red { color: #f44; text-shadow: 0 0 10px #f44, 0 0 20px #f44; font-size: 18px; }
.hud-val.gold { color: #fd0; text-shadow: 0 0 6px #fd0, 0 0 12px #fd0; }
#msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
  display: none;
  pointer-events: none;
}
#msg h1 {
  font-size: 42px;
  color: #0ff;
  text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0af;
  margin-bottom: 16px;
  letter-spacing: 6px;
  animation: glow 1.5s ease-in-out infinite;
}
#msg h2 {
  font-size: 22px;
  color: #f0f;
  text-shadow: 0 0 15px #f0f, 0 0 30px #f0f;
  margin-bottom: 12px;
}
#msg p { color: #aaa; font-size: 13px; line-height: 1.8; }
#msg .blink { animation: blink 0.8s infinite; }
#msg .btn-hint { animation: btnPulse 1.2s ease-in-out infinite; cursor: pointer; transition: transform 0.2s; }
#msg .btn-hint:hover { transform: scale(1.1); color: #0ff; }
@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0af; }
  50% { text-shadow: 0 0 30px #0ff, 0 0 60px #0ff, 0 0 90px #0af, 0 0 120px #0ff; }
}
@keyframes btnPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.lives { display: flex; gap: 4px; }
.life-icon { width: 14px; height: 14px; background: #0ff; clip-path: polygon(50% 0%, 100% 30%, 100% 100%, 0 100%, 0 30%); box-shadow: 0 0 6px #0ff; }
.life-icon.dead { background: #333; box-shadow: none; }
#level-up {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f0f;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 20px #f0f, 0 0 40px #f0f;
  z-index: 6;
  display: none;
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes fadeUp { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(1); } }
#minimap {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 80px;
  height: 60px;
  border: 1px solid #0ff;
  z-index: 4;
  opacity: 0.9;
  background: rgba(0,20,30,0.9);
  box-shadow: 0 0 10px rgba(0,255,255,0.4);
}
body.high-contrast #c { filter: contrast(1.5) brightness(1.2); }
body.high-contrast .hud-val { color: #fff; text-shadow: 0 0 10px #fff; }
body.high-contrast .enemy { filter: contrast(1.5); }
```

- [ ] **Step 2: Commit**

```bash
git add tank-battle.html
git commit -m "feat: cyberpunk CSS overhaul - neon color scheme, glow effects, scan lines

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 2: HUD Cyberpunk Enhancement

**Files:**
- Modify: `tank-battle.html:70-114` (HUD HTML)

- [ ] **Step 1: Add weapon display and fusion powerup to HUD**

Replace HUD section (lines 70-114) with:

```html
<div id="hud">
  <div class="hud-item">
    <span class="hud-label">SCORE</span>
    <span class="hud-val" id="score">0</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">WAVE</span>
    <span class="hud-val gold" id="wave">1</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">ENEMIES</span>
    <span class="hud-val red" id="enemies">0</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">WEAPON</span>
    <span id="weapon-display" style="color:#0ff;text-shadow:0 0 6px #0ff;font-size:12px">NORMAL</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">LIVES</span>
    <span id="lives-display" style="color:#0ff;font-size:16px;text-shadow:0 0 8px #0ff"></span>
  </div>
  <div class="hud-item">
    <span class="hud-label">FUSION</span>
    <span id="fusion-display" style="color:#f0f;text-shadow:0 0 8px #f0f;font-size:11px">---</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">HI-SCORE</span>
    <span class="hud-val gold" id="hiscore">0</span>
  </div>
  <div class="hud-item">
    <span class="hud-label">BASE</span>
    <span id="base-hp" style="color:#0ff;font-size:16px;text-shadow:0 0 8px #0ff">♥♥♥</span>
  </div>
  <div id="powerup-status" style="display:flex;gap:6px;align-items:center;margin-left:8px"></div>
</div>
```

- [ ] **Step 2: Add fusion animation CSS after existing animations**

Find line ~49 (after `@keyframes scorePop`) and add:

```css
/* Cyberpunk fusion animations */
@keyframes fusionRing {
  0% { transform: scale(0.1); opacity: 1; border-width: 8px; }
  100% { transform: scale(3); opacity: 0; border-width: 1px; }
}
@keyframes neonPulse {
  0%, 100% { opacity: 0.7; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.3); }
}
.fusion-active {
  animation: neonPulse 0.5s ease-in-out infinite;
  color: #f0f !important;
  text-shadow: 0 0 10px #f0f, 0 0 20px #f0f, 0 0 30px #f0f !important;
}
```

- [ ] **Step 3: Commit**

```bash
git add tank-battle.html
git commit -m "feat: HUD cyberpunk enhancement - weapon display, fusion indicator, neon styling

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 3: Screen Shake System Enhancement

**Files:**
- Modify: `tank-battle.html` (existing screenShake variables around line 496-500)

- [ ] **Step 1: Find and enhance screen shake variables**

Find the line containing `let screenShake=0,flashTimer=0,flashColor='rgba(255,255,0,0.3)';` (around line 496-500) and add cyberpunk shake variables after it:

```javascript
// Cyberpunk screen shake enhancement
let screenShakeX=0,screenShakeY=0;
let screenShakeDecay=0.9;
let fusionFlashTimer=0;
```

- [ ] **Step 2: Update shake application in render loop**

Find where `screenShake` is applied to canvas transform and replace with enhanced version:

```javascript
// Apply cyberpunk screen shake with spring physics
if(screenShake>0){
  screenShake*=screenShakeDecay;
  screenShakeX=(Math.random()-0.5)*screenShake*2;
  screenShakeY=(Math.random()-0.5)*screenShake*2;
  wrap.style.transform=`translate(${screenShakeX}px,${screenShakeY}px) scale(${scale})`;
}else{
  screenShakeX=0;
  screenShakeY=0;
  wrap.style.transform=`scale(${scale})`;
}
```

- [ ] **Step 3: Add fusion flash effect**

Find where fusion happens (when two powerups combine) and add:

```javascript
function triggerFusionFlash(){
  fusionFlashTimer=8;
  flashColor='rgba(255,0,255,0.5)';
  screenShake=8;
}
```

- [ ] **Step 4: Commit**

```bash
git add tank-battle.html
git commit -m "feat: cyberpunk screen shake - spring physics, fusion flash effect

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 2: Fusion System Core

### Task 4: Powerup Type System

**Files:**
- Modify: `tank-battle.html` (powerup constants ~line 816)

- [ ] **Step 1: Define cyberpunk powerup types and fusion table**

Find the line `pu:{life:'#f00',rapid:'#ff0',big:'#f80',shield:'#00f',star:'#0ff',frozen:'#0ef',repair:'#0f0',invis:'#c0c',megaShield:'#0ff','2xScore':'#fd0'}` (~line 816) and replace with:

```javascript
// Cyberpunk Powerup Types
const POWERUP_TYPES = {
  SHIELD: { name: 'SHIELD', color: '#00f', icon: '▣', duration: 480 },
  RAPID: { name: 'RAPID', color: '#ff0', icon: '⚡', duration: 480 },
  STEALTH: { name: 'STEALTH', color: '#c0c', icon: '◈', duration: 360 },
  FREEZE: { name: 'FREEZE', color: '#0ef', icon: '❄', duration: 240 },
  MEGA: { name: 'MEGA', color: '#f0f', icon: '◉', duration: 600 }
};

// Fusion table - keys are sorted type pairs
const FUSION_TABLE = {
  'SHIELD,RAPID': { name: 'OVERDRIVE', color: '#f80', icon: '✦', duration: 720, effect: 'invincible_rapid' },
  'SHIELD,STEALTH': { name: 'PHASE SHIFT', color: '#0ff', icon: '◈', duration: 600, effect: 'phase_shift' },
  'SHIELD,FREEZE': { name: 'CRYO SHIELD', color: '#8cf', icon: '❄', duration: 540, effect: 'cryo_shield' },
  'SHIELD,MEGA': { name: 'TITAN MODE', color: '#f0f', icon: '▣', duration: 720, effect: 'titan_mode' },
  'RAPID,STEALTH': { name: 'BLITZ', color: '#fff', icon: '⚡', duration: 480, effect: 'blitz' },
  'RAPID,FREEZE': { name: 'FROST BOLT', color: '#8ff', icon: '❄', duration: 480, effect: 'frost_bolt' },
  'RAPID,MEGA': { name: 'BARRAGE', color: '#fd0', icon: '⁂', duration: 600, effect: 'barrage' },
  'STEALTH,FREEZE': { name: 'GLACIER', color: '#aef', icon: '✧', duration: 540, effect: 'glacier' },
  'STEALTH,MEGA': { name: 'PHANTOM', color: '#c0f', icon: '◉', duration: 600, effect: 'phantom' },
  'FREEZE,MEGA': { name: 'TUNDRA', color: '#0ef', icon: '❄', duration: 600, effect: 'tundra' }
};

// Active powerups on player
let activePowerups = [];
let heldPowerup = null; // Powerup being carried (not yet used)
```

- [ ] **Step 2: Update powerup spawn in code**

Find where powerups are created and update to use new types. Search for `powerups.push(new Powerup` and update Powerup class instantiation.

- [ ] **Step 3: Commit**

```bash
git add tank-battle.html
git commit -m "feat: cyberpunk powerup system - 5 types, 10 fusion combinations

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 5: Fusion Logic Implementation

**Files:**
- Modify: `tank-battle.html` (collision handling when player touches powerup)

- [ ] **Step 1: Find powerup collision and add fusion logic**

Search for `if(powerups[i]&&player&&!player.invincible&&` or similar collision code. Add fusion check:

```javascript
// Cyberpunk Fusion System
function checkPowerupFusion(pu) {
  if (heldPowerup === null) {
    // Pick up powerup to hold
    heldPowerup = pu;
    playPowerup();
    return true;
  }
  
  // Try to fuse with held powerup
  const key = [heldPowerup.type, pu.type].sort().join(',');
  const fusion = FUSION_TABLE[key];
  
  if (fusion) {
    // Fusion success!
    activePowerups = [{ ...fusion, timer: fusion.duration }];
    heldPowerup = null;
    triggerFusionEffect(fusion);
    playFusionSound();
    return true;
  } else {
    // No fusion - replace held powerup
    heldPowerup = pu;
    playPowerup();
    return true;
  }
}

function triggerFusionEffect(fusion) {
  // Screen flash
  fusionFlashTimer = 8;
  flashColor = fusion.color.replace('#', 'rgba(').replace(/(..)(..)(..)/, (_, r, g, b) => 
    `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, 0.5)`) + ')';
  
  // Screen shake
  screenShake = 12;
  
  // Show fusion name
  showFusionNotification(fusion.name, fusion.color);
  
  // Big particle burst
  for (let i = 0; i < 50; i++) {
    const p = getParticle();
    p.reset(player.cx, player.cy, fusion.color, 8, true, 60);
    p.vx = (Math.random() - 0.5) * 10;
    p.vy = (Math.random() - 0.5) * 10;
    p.size = 3 + Math.random() * 5;
    p.maxLife = p.life;
    particles.push(p);
  }
}

function showFusionNotification(name, color) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${color};
    font-size: 28px;
    font-weight: bold;
    text-shadow: 0 0 20px ${color}, 0 0 40px ${color};
    z-index: 100;
    animation: fusionPop 1.5s ease-out forwards;
    pointer-events: none;
  `;
  notification.textContent = name + '!';
  document.getElementById('wrap').appendChild(notification);
  setTimeout(() => notification.remove(), 1500);
  
  // Update HUD fusion display
  document.getElementById('fusion-display').textContent = name;
  document.getElementById('fusion-display').style.color = color;
}

function playFusionSound() {
  // Ascending arpeggio
  [400, 500, 600, 800, 1000, 1200].forEach((f, i) => 
    setTimeout(() => playTone(f, 'square', 0.15, 0.2), i * 50));
}
```

- [ ] **Step 2: Add CSS for fusion notification**

Add after fusionRing animation (~line 61):

```css
@keyframes fusionPop {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
  20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  40% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add tank-battle.html
git commit -m "feat: fusion logic - powerup combining, screen effects, notification

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 6: Fusion Effect Implementations

**Files:**
- Modify: `tank-battle.html` (game loop, apply fusion effects)

- [ ] **Step 1: Find game loop and add fusion effect application**

Find the main game update loop (search for `function gameLoop` or `update()`). Add at the beginning:

```javascript
// Apply active fusion effects
function applyFusionEffects() {
  for (let i = activePowerups.length - 1; i >= 0; i--) {
    const pu = activePowerups[i];
    pu.timer--;
    
    if (pu.timer <= 0) {
      activePowerups.splice(i, 1);
      continue;
    }
    
    // Apply effect based on type
    switch (pu.effect) {
      case 'invincible_rapid':
        player.invincible = Math.max(player.invincible, 1);
        player.rapid = true;
        player.bigBullet = true;
        break;
      case 'phase_shift':
        player.invincible = Math.max(player.invincible, 1);
        // Render player as semi-transparent ghost
        break;
      case 'cryo_shield':
        // Freeze nearby enemies
        enemies.forEach(e => {
          if (e.alive && Math.hypot(e.cx - player.cx, e.cy - player.cy) < TS * 4) {
            e.frozen = Math.max(e.frozen || 0, 60);
          }
        });
        break;
      case 'titan_mode':
        player.level = 4; // Giant tank
        player.bigBullet = true;
        break;
      case 'blitz':
        player.rapid = true;
        player.invincible = Math.max(player.invincible, 1);
        player.speed *= 2;
        break;
      case 'frost_bolt':
        // Bullets slow enemies on hit
        break;
      case 'barrage':
        // Triple spread shot
        player.rapid = true;
        player.bigBullet = true;
        break;
      case 'glacier':
        // Trail freezes enemies behind
        if (Math.random() < 0.3) {
          const trail = getParticle();
          trail.reset(player.cx, player.cy, '#8cf', 3, true, 120);
          trail.vx = -player.vx * 0.3;
          trail.vy = -player.vy * 0.3;
          particles.push(trail);
        }
        break;
      case 'phantom':
        // Massive ghost tank
        player.invincible = Math.max(player.invincible, 1);
        break;
      case 'tundra':
        // Ice missiles
        player.bigBullet = true;
        break;
    }
  }
  
  // Clear effects when fusion expires
  if (activePowerups.length === 0) {
    player.rapid = false;
    player.bigBullet = false;
    player.speed = player.isPlayer ? 2.5 : 2.2;
    if (player.level > 3) player.level = 3;
  }
}
```

- [ ] **Step 2: Call applyFusionEffects in game loop**

Find where other update functions are called and add:

```javascript
if(gameState==='playing'){
  applyFusionEffects(); // Add this
  updatePlayer();
  updateEnemies();
  // ... rest of game loop
}
```

- [ ] **Step 3: Commit**

```bash
git add tank-battle.html
git commit -m "feat: fusion effects - 10 unique powerup combinations with gameplay impact

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 3: Weapon System Integration

### Task 7: 4-Weapon System

**Files:**
- Modify: `tank-battle.html` (existing weapon system ~line 1086-1143)

- [ ] **Step 1: Enhance existing weapon system**

Find `this.weaponType` usage (~line 1086-1143) and update:

```javascript
// In Tank class, update weaponType initialization (around line 1087)
// Weapon types: 0=Normal, 1=Shotgun, 2=Laser, 3=Missile
this.weaponType=0;
this.weaponNames=['NORMAL','SHOTGUN','LASER','MISSILE'];
this.weaponCooldown=[350,500,200,800]; // Fire rate per weapon
```

Find the `canShoot` method (~line 1106) and update:

```javascript
canShoot(){
  const now=Date.now();
  const baseCd=this.weaponCooldown[this.weaponType];
  const cd=this.rapid?(baseCd/2):baseCd;
  return now-this.lastShot>cd;
}
```

Find the `shoot` method and update for all weapon types:

```javascript
shoot(){
  const now=Date.now();
  if(!this.canShoot())return null;
  this.lastShot=now;
  
  switch(this.weaponType){
    case 0: // Normal
      this.fireSingle();
      break;
    case 1: // Shotgun
      this.fireShotgun();
      break;
    case 2: // Laser
      this.fireLaser();
      break;
    case 3: // Missile
      this.fireMissile();
      break;
  }
  screenShake=Math.max(screenShake,this.weaponType===1?4:2);
  return null;
}

fireSingle(){
  const big=this.bigBullet||this.level>=3;
  const bx=this.dir===0?this.cx-2:(this.dir===1?this.x+TS:this.dir===2?this.cx-2:this.x-6);
  const by=this.dir===0?this.y-6:(this.dir===1?this.cy-2:this.dir===2?this.y+TS:this.cy-2);
  const nb=getBullet();
  nb.reset(bx,by,this.dir,this.isPlayer,big,this.isPlayer2);
  bullets.push(nb);
  playShoot(big);
  spawnMuzzleFlash(bx,by,this.dir);
}

fireShotgun(){
  const angles=[-0.2,0,0.2];
  angles.forEach(a=>{
    const bx=this.cx,by=this.cy;
    const nb=getBullet();
    nb.reset(bx,by,this.dir,this.isPlayer,false,this.isPlayer2);
    nb.angle=this.dir*Math.PI/2+a;
    nb.vx=Math.cos(nb.angle)*8;
    nb.vy=Math.sin(nb.angle)*8;
    nb.isLaser=false;
    bullets.push(nb);
  });
  playShoot(true);
  for(let i=0;i<8;i++)spawnMuzzleFlash(this.cx,this.cy,this.dir);
}

fireLaser(){
  // Laser pierces all enemies in a line
  const bx=this.cx,by=this.cy;
  const nb=getBullet();
  nb.reset(bx,by,this.dir,this.isPlayer,false,this.isPlayer2);
  nb.isLaser=true;
  nb.piercing=true;
  bullets.push(nb);
  playTone(1000,'sawtooth',0.1,0.15);
}

fireMissile(){
  const bx=this.cx,by=this.cy;
  const nb=getBullet();
  nb.reset(bx,by,this.dir,this.isPlayer,true,this.isPlayer2);
  nb.isMissile=true;
  nb.homing=true;
  bullets.push(nb);
  playTone(300,'sawtooth',0.1,0.1);
}
```

- [ ] **Step 2: Update weapon switch (Z key)**

Find `switchWeapon()` method and update:

```javascript
switchWeapon(){
  this.weaponType=(this.weaponType+1)%4;
  screenShake=5;
  playTone(600+this.weaponType*100,'square',0.1,0.2);
  // Update HUD
  const names=['NORMAL','SHOTGUN','LASER','MISSILE'];
  document.getElementById('weapon-display').textContent=names[this.weaponType];
}
```

- [ ] **Step 3: Add Z key handler for weapon switch**

Find keyboard handler section and add:

```javascript
if(keys['z']||keys['Z']){
  if(player&&!player.switchCooldown){
    player.switchWeapon();
    player.switchCooldown=15;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add tank-battle.html
git commit -m "feat: 4-weapon system - Normal/Shotgun/Laser/Missile with unique behaviors

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 4: Polish & Integration

### Task 8: Powerup Icons & HUD Update

**Files:**
- Modify: `tank-battle.html` (drawHUD function or similar)

- [ ] **Step 1: Find and update powerup icon rendering**

Search for `powerup-status` or `drawPowerup` function. Update to use new cyberpunk icons:

```javascript
function updatePowerupDisplay(){
  const container=document.getElementById('powerup-status');
  container.innerHTML='';
  
  // Show held powerup
  if(heldPowerup){
    const pu=POWERUP_TYPES[heldPowerup];
    container.innerHTML+=`
      <div class="pu-icon fusion-active" style="color:${pu.color};text-shadow:0 0 8px ${pu.color}">
        ${pu.icon}
        <div class="pu-bar"><div class="pu-bar-fill" style="width:100%;background:${pu.color}"></div></div>
      </div>
    `;
  }
  
  // Show active fusion
  activePowerups.forEach(f=>{
    container.innerHTML+=`
      <div class="pu-icon fusion-active" style="color:${f.color};text-shadow:0 0 8px ${f.color}">
        ${f.icon}
        <div class="pu-bar">
          <div class="pu-bar-fill" style="width:${(f.timer/f.duration)*100}%;background:${f.color}"></div>
        </div>
      </div>
    `;
  });
}
```

- [ ] **Step 2: Update lives display**

Find `updateLivesDisplay` or `lives-display` and update to use neon hearts:

```javascript
// Update lives display with cyberpunk styling
function updateLivesDisplay(){
  const el=document.getElementById('lives-display');
  el.textContent='♦'.repeat(lives);
  el.style.color='#0ff';
  el.style.textShadow='0 0 8px #0ff';
}
```

- [ ] **Step 3: Update base HP display**

```javascript
function updateBaseDisplay(){
  const el=document.getElementById('base-hp');
  const hp=base?base.hp:3;
  el.textContent='♥'.repeat(hp);
  el.style.color=hp<=1?'#f44':'#0ff';
  el.style.textShadow=`0 0 8px ${hp<=1?'#f44':'#0ff'}`;
}
```

- [ ] **Step 4: Commit**

```bash
git add tank-battle.html
git commit -m "feat: cyberpunk powerup icons and HUD updates - neon styling, fusion display

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 9: Final Integration & Cleanup

**Files:**
- Modify: `tank-battle.html` (overall integration)

- [ ] **Step 1: Update start screen text**

Find `#msg` content (~line 119-127) and update:

```html
<div id="msg">
  <h1>TANK BATTLE</h1>
  <h2>CYBERPUNK EDITION</h2>
  <p style="color:#0ff">方向键移动 | 空格射击 | Z换武器</p>
  <p style="color:#f0f">融合系统：拾取道具自动融合</p>
  <p style="color:#888">P暂停 | M静音</p>
  <p class="blink" style="margin-top:16px;color:#0ff;text-shadow:0 0 10px #0ff">[ PRESS ENTER ]</p>
</div>
```

- [ ] **Step 2: Remove old powerup references**

Search for old powerup references like `shieldTimer`, `rapidTimer`, `bigBulletTimer` and ensure they don't conflict with new fusion system. Keep compatibility for existing code.

- [ ] **Step 3: Validate JavaScript syntax**

```bash
node validate2.js
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add tank-battle.html
git commit -m "feat: final integration - cyberpunk start screen, cleanup, validation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 10: Push & Report

- [ ] **Step 1: Push all commits**

```bash
git push origin master
```

- [ ] **Step 2: Report completion**

---

## Implementation Summary

| Task | Description | Complexity |
|------|-------------|------------|
| 1 | Cyberpunk CSS overhaul | Low |
| 2 | HUD cyberpunk enhancement | Low |
| 3 | Screen shake system | Medium |
| 4 | Powerup type system | Medium |
| 5 | Fusion logic | High |
| 6 | Fusion effects (10 combos) | High |
| 7 | 4-weapon system | Medium |
| 8 | Powerup icons & HUD | Medium |
| 9 | Final integration | Medium |
| 10 | Push & report | Low |

**Total: 10 tasks**

---

## Success Criteria

- [ ] Cyberpunk neon aesthetic visible in all UI elements
- [ ] Picking up 2 powerups triggers fusion with visual effect
- [ ] 10 unique fusion effects with distinct gameplay impact
- [ ] Z key cycles through 4 weapons with distinct behaviors
- [ ] No JavaScript errors in console
- [ ] Game runs at 60fps with 20+ enemies

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-21-tank-battle-cyberpunk-plan.md`**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?