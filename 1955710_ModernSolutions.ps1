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
    Write-Host -BackgroundColor Black -ForegroundColor Red "What the"$randomLetter" did you just fucking say about me, you little"$randomLetter"? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the "$randomLetter" out with precision the likes of which has never been seen before on this Earth, mark my "$randomLetter"-ing words. You think you can get away with saying that "$randomLetter" to me over the Internet? Think again, "$randomLetter"-er. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're "$randomLetter"-ing dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable "$randomLetter" off the face of the continent, you little "$randomLetter". If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your "$randomLetter"-ing tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will "$randomLetter" fury all over you and you will drown in it. You're "$randomLetter"-ing dead, kiddo."
    $filesToDelete = (gci -Path $filePath -File -Filter "*$randomLetter*")
    Remove-Item -Path "$filePath\*$randomLetter*.*" -WhatIf
}
KillThatProcess($processName)
Bamboozle($filePath)