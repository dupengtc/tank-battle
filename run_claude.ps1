$ErrorActionPreference = "Continue"
Set-Location "C:\Users\Garu\.qclaw\workspace-agent-2e1ffa57\tank-battle"

$prompt = Get-Content "claude_prompt.txt" -Raw

$process = Start-Process -FilePath "claude" -ArgumentList "--permission-mode","bypassPermissions","--print",$prompt -NoNewWindow -PassThru -RedirectStandardOutput "output.log" -RedirectStandardError "error.log"

Write-Host "Started Claude Code with PID: $($process.Id)"

# Wait for completion or timeout (2 hours max)
$completed = $process.WaitForExit(7200)

if ($completed) {
    Write-Host "Claude Code finished with exit code: $($process.ExitCode)"
} else {
    Write-Host "Timeout reached. Process may still be running."
}

# Show output
if (Test-Path "output.log") {
    Write-Host "=== OUTPUT ==="
    Get-Content "output.log"
}
if (Test-Path "error.log") {
    Write-Host "=== ERRORS ==="
    Get-Content "error.log"
}
