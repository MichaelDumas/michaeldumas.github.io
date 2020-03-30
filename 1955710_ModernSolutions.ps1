Param(
    [string] $processName,
    [string] $filePath = "$PSScriptRoot"
)

function KillThatProcess([string] $processName) {
    $runningProcesses = (get-process $processName).count
    $userInput = Read-Host "There are"$runningProcesses" processes with the name "$processName", do you want to end them? Y/N"
    if ($userInput.ToLower() -eq "y")
    {
        Write-Host -BackgroundColor Green "The"$runningProcesses" instances of "$processName" that are currently running will be terminated."
        Get-Process $processName | spps
    }
    elseif ($userInput.ToLower() -eq "n")
    {
        Write-Host -BackgroundColor Red "The"$runningProcesses" instances of "$processName" that are currently running will NOT be terminated."
    }
    else
    {
        Write-Host -BackgroundColor Red "Invalid input."$processName" will not be terminated."
    }
}

function Bamboozle([string] $filePath = "$PSScriptRoot") {
    $randomLetter = [CHAR](Get-Random -Minimum 65 -Maximum 90)
    Write-Host -BackgroundColor Black -ForegroundColor Red "A"$randomLetter"oofy "$randomLetter"essage. "$randomLetter"he "$randomLetter"essage "$randomLetter"ust "$randomLetter"learly "$randomLetter"ndicate "$randomLetter"hich "$randomLetter"etter "$randomLetter"as "$randomLetter"een "$randomLetter"hosen."
    $filesToDelete = (gci -Path $filePath -File -Filter "*$randomLetter*")
    Remove-Item -Path "$filePath\*$randomLetter*.*" -WhatIf
}
KillThatProcess($processName)
Bamboozle($filePath)