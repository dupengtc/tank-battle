@echo off
cd /d C:\Users\Garu\.qclaw\workspace-agent-2e1ffa57\tank-battle
git add push.bat
"C:\Program Files\GitHub CLI\gh.exe" commit -m "chore: add push script"
"C:\Program Files\GitHub CLI\gh.exe" repo sync --source dupengtc/tank-battle --force
