# Tank Battle UI & Gameplay Redesign - Cyberpunk Edition

**Date:** 2026-04-21
**Status:** Approved

---

## 1. Concept & Vision

Transform Tank Battle into a visually stunning cyberpunk experience with strategic depth. The game should feel like piloting a high-tech tank in a neon-drenched digital battlefield. Strategic gameplay emerges through the fusion mechanic — combining two powerups creates powerful hybrid abilities that reward experimentation and tactical decision-making.

---

## 2. Design Language

### Aesthetic Direction
**Cyberpunk Neon** — Deep black backgrounds (#000) with vibrant neon accents. Glowing borders, holographic HUD elements, scan-line overlays, and pulsing light effects. Think Tron meets Battle City.

### Color Palette
- **Primary:** Cyan (#0ff) — player elements, UI highlights
- **Secondary:** Magenta (#f0f) — fusion effects, rare items
- **Accent:** Purple (#90f) — enemy highlights, special effects
- **Warning:** Orange (#f80) — low HP, danger zones
- **Background:** Near-black (#0a0a12) with subtle blue tint
- **Text:** White (#fff) with cyan glow

### Typography
- HUD: `'Courier New', monospace` with glow effects
- Titles: Bold, letter-spacing: 4px, animated glow pulse

### Spatial System
- Game area: 800x600 with 24px grid tiles
- HUD height: 36px at top, semi-transparent black
- Minimap: 80x60px, bottom-right, holographic border

### Motion Philosophy
- **Glow pulse:** 2s cycle, opacity 0.6-1.0 on active elements
- **Fusion burst:** Radial neon rings expanding outward
- **Screen shake:** On explosions (intensity based on damage)
- **Scan lines:** Subtle CRT overlay, 2px repeating pattern

### Visual Assets
- Tanks: Pixel-style with neon glow outlines
- Projectiles: Bright core + trailing glow
- Terrain: Brick (orange), Steel (gray), Water (blue animated), Forest (green)
- New terrain: Mud (brown), Ice (cyan tint), Cliff (dark), Bridge (wood)

---

## 3. Layout & Structure

### Screen Layout
```
┌──────────────────────────────────────────────────────────────┐
│ HUD: SCORE | WAVE | ENEMIES | LIVES | WEAPON | POWERUPS     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                     GAME CANVAS                              │
│                    (800 x 564)                               │
│                                                              │
│  [MINIMAP]                                                   │
└──────────────────────────────────────────────────────────────┘
```

### HUD Elements (Left to Right)
1. **SCORE** — Current score with animated pop on gain
2. **WAVE** — Current wave number with gold accent
3. **ENEMIES** — Remaining enemies count (red)
4. **LIVES** — Player lives as tank icons
5. **WEAPON** — Current weapon icon + name
6. **POWERUPS** — Active powerup icons with timer bars
7. **HI-SCORE** — Persisted high score

### Visual Pacing
- Start screen: Dramatic title with pulsing neon, floating particles
- Gameplay: Clean battlefield, minimal UI clutter
- Wave transitions: 3s countdown with dramatic "WAVE X" reveal
- Game over: Darkened overlay, stats panel with neon borders

### Responsive Strategy
- Canvas scales to fit viewport while maintaining aspect ratio
- HUD elements remain fixed size for readability
- Mobile: Virtual joystick (left) + fire button (right)

---

## 4. Features & Interactions

### 4.1 Fusion System (Core Mechanic)

**Powerup Types (5 base):**
| Icon | Name | Effect |
|------|------|--------|
| 🛡️ | Shield | Blue bubble, blocks 3 hits |
| ⚡ | Rapid | Yellow, 2x fire rate for 8s |
| 👻 | Stealth | Purple, invisible to enemies for 6s |
| ❄️ | Freeze | Cyan, enemies frozen 4s |
| 🔮 | Mega | Magenta, giant bullets for 10s |

**Fusion Rules:**
When player touches a powerup while already holding one, fusion occurs:
- Shield + Rapid = **OVERDRIVE** — Invincible + rapid fire, orange glow
- Shield + Stealth = **PHASE SHIFT** — Pass through enemies, cyan ghost trail
- Shield + Freeze = **CRYO SHIELD** — Enemies near you freeze, ice particles
- Shield + Mega = **TITAN MODE** — Giant tank, 3x size, crushing force
- Rapid + Stealth = **BLITZ** — Speed burst + invisible, silver trail
- Rapid + Freeze = **FROST BOLT** — Bullets slow enemies, ice blue
- Rapid + Mega = **BARRAGE** — Triple-spread shot, golden bullets
- Stealth + Freeze = **GLACIER** — Trail freezes enemies behind you
- Stealth + Mega = **PHANTOM** — Massive ghost tank, purple aura
- Freeze + Mega = **TUNDRA** — Ice missiles, blue explosions

**Fusion Feedback:**
1. Screen flash white (100ms)
2. Central fusion ring expands (3 concentric neon rings)
3. Combined powerup icon appears center with name
4. Play fusion sound (ascending arpeggio)
5. Player gains fused powerup for 12 seconds

### 4.2 Weapon System

**4 Weapons (Z to cycle):**
1. **Standard** — Single bullet, fast fire rate
2. **Shotgun** — 3-way spread, short range, high damage
3. **Laser** — Pierces all enemies in line, continuous beam
4. **Missile** — Homing missiles, slow fire, high damage

**Switch Animation:** Weapon icon flips with 0.2s rotation

### 4.3 Terrain Interactions

| Terrain | Player Effect | Enemy Effect | Strategic Use |
|---------|---------------|--------------|---------------|
| Mud | -50% speed | -50% speed | Kiting, chokepoints |
| Ice | Slide, no friction | Slide, no friction | Advanced maneuvering |
| Cliff | Impassable | Avoids | Natural barriers |
| Bridge | Normal | Normal | Cover + mobility |

### 4.4 Enemy Types

| Type | Color | HP | Speed | Behavior |
|------|-------|-----|-------|----------|
| Scout | Light red | 1 | Fast | Rushes player |
| Standard | Red | 2 | Medium | Balanced |
| Heavy | Dark red | 4 | Slow | Targets base |
| Boss | Purple (#90f) | 15+ | Medium | All-out assault |

### 4.5 Wave System

- Wave 1: 3 scouts (tutorial)
- Wave 2: 4 standard
- Wave 3: 3 standard + 2 scouts
- Wave 4+: Scaling difficulty
- Every 5 waves: Boss wave with warning siren

---

## 5. Component Inventory

### 5.1 HUD Panel
- **Default:** Semi-transparent black, neon cyan border glow
- **Active state:** Current section pulses brighter
- **Alert state:** Red pulse when base HP low or enemies critical

### 5.2 Powerup Icons
- **Default:** Colored icon with dark background
- **Active:** Icon glows, timer bar depletes below
- **Warning (<3s):** Icon blinks at 4Hz
- **Fusion ready:** Sparkle particles

### 5.3 Minimap
- **Border:** 1px cyan glow
- **Player:** Green dot
- **Enemies:** Red dots
- **Base:** Blue dot
- **Powerups:** Yellow dots

### 5.4 Message Overlay
- **Start screen:** Title with 2s glow pulse, instruction text below
- **Pause:** Dark overlay (80% black), "PAUSED" centered
- **Game over:** Stats panel with neon border, "PRESS ENTER" blinking
- **Wave countdown:** Large "WAVE X" with dramatic reveal

### 5.5 Virtual Controls (Mobile)
- **Joystick:** 100px circle, left side, translucent
- **Fire button:** 80px circle, right side, orange with "FIRE" text

---

## 6. Technical Approach

### Architecture
- Single HTML file with embedded CSS and JavaScript
- Canvas-based rendering at 60fps via requestAnimationFrame
- Object pools for bullets (100), particles (500), explosions (50)
- Spatial hash grid for collision detection optimization

### State Management
- `gameState`: 'start' | 'playing' | 'paused' | 'gameover' | 'waveTransition'
- `player`: { x, y, dir, hp, weapon, powerups, skills }
- `enemies[]`: Array of enemy objects
- `bullets[]`: Bullet pool instances

### Key Systems
1. **Input Handler:** Keyboard events → key state map
2. **Game Loop:** Fixed timestep deltaTime update
3. **Collision System:** Spatial hash + AABB detection
4. **Render Pipeline:** Clear → terrain → entities → particles → HUD

### Audio
- Web Audio API for all sounds
- Procedurally generated 8-bit style effects
- Background music loop (optional, toggleable)

### Persistence
- localStorage for: hi-score, muted state, unlock progress

---

## 7. Implementation Priorities

### Phase 1: Visual Foundation
1. Cyberpunk color scheme and HUD styling
2. Neon glow effects on UI elements
3. CRT scan-line overlay
4. Screen shake system

### Phase 2: Gameplay Core
1. Fusion system implementation
2. 4-weapon system
3. Powerup balancing
4. Enemy AI

### Phase 3: Polish
1. Particle effects enhancement
2. Sound effects
3. Wave transitions
4. Game over flow

---

## Success Criteria

- [ ] HUD displays all info with cyberpunk aesthetic
- [ ] Fusion system creates distinct visual and gameplay effects
- [ ] 4 weapons are clearly distinguishable
- [ ] Game runs at 60fps with 20+ enemies
- [ ] Mobile controls functional
- [ ] No console errors during gameplay