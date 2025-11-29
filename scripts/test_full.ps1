$ErrorActionPreference = "Stop"

Write-Host "Starting Backend..."
$process = Start-Process -FilePath "uvicorn" -ArgumentList "backend.main:app", "--host", "0.0.0.0", "--port", "8000" -PassThru
Start-Sleep -Seconds 5

try {
    Write-Host "Running Integration Checks..."
    python scripts/check_api.py
    if ($LASTEXITCODE -ne 0) { throw "Integration checks failed" }
    
    Write-Host "Running Pytest..."
    python -m pytest
    if ($LASTEXITCODE -ne 0) { throw "Pytest failed" }
    
    Write-Host "SUCCESS: Backend verified."
}
catch {
    Write-Host "FAILURE: $_"
}
finally {
    Write-Host "Stopping Backend..."
    Stop-Process -Id $process.Id -Force
}
