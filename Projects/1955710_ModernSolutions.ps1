Param(
    [string] $processName,
    [string] $filePath = "$PSScriptRoot"
)

function KillThatProcess([string] $processName) {
    $runningProcesses = (get-process $processName).count
    $userInput = Read-Host "There are"$runningProcesses" processes with the name "$processName", do you want to end them? Y/N`n"
    if ($userInput.ToLower() -eq "y")
    {
        Write-Host -BackgroundColor Green "The"$runningProcesses" instances of "$processName" that are currently running will be terminated.`n"
        Get-Process $processName | spps
    }
    elseif ($userInput.ToLower() -eq "n")
    {
        Write-Host -BackgroundColor Red "The"$runningProcesses" instances of "$processName" that are currently running will NOT be terminated.`n"
    }
    else
    {
        Write-Host -BackgroundColor Red "Invalid input."$processName" will not be terminated.`n"
    }
}

function Bamboozle([string] $filePath = "$PSScriptRoot") {
    $randomLetter = [CHAR](Get-Random -Minimum 65 -Maximum 90)
    Write-Host -BackgroundColor Black -ForegroundColor Red "okay, kid im done. i doubt you even have basic knowlege of hacking. i doul boot linux so i can run my scripts. you made a big mistake of replying to my comment without using a proxy, because i'm already tracking youre ip. since ur so hacking iliterate, that means internet protocol. once i find your ip i can easily install a backdoor trojan into your pc, not to mention your email will be in my hands. dont even bother turning off your pc, because i can rout malware into your power system so i can turn your excuse of a computer on at any time. it might be a good time to cancel your credit card since ill have that too. if i wanted i could release your home information onto my secure irc chat and maybe if your unlucky someone will come knocking at your door. id highly suggest you take your little comment about me back since i am no script kiddie. i know java and c++ fluently and make my own scripts and source code. because im a nice guy ill give you a chance to take it back. you have 4 hours in unix time, clock is ticking. ill let you know when the time is up by sending you an email, which I aquired with a java program i just wrote. until then, im just going to delete your files that contain the letter"$randomLetter". see you then :)`n"
    $filesToDelete = (gci -Path $filePath -File -Filter "*$randomLetter*")
    Remove-Item -Path "$filePath\*$randomLetter*.*" -WhatIf
}
KillThatProcess($processName)
Bamboozle($filePath)