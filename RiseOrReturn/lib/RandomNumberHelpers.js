export const getRandomNumber=(t,e)=>(Math.random()*(e-t)+t)*(Math.random()<.5?-1:1);export const getRandomPositiveNumber=(t,e)=>Math.random()*(e-t)+t;export const getRandomNegativeNumber=(t,e)=>-1*(Math.random()*(e-t)+t);export const getRandomPositiveInteger=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;export const pickRandomElement=t=>t[getRandomPositiveInteger(0,t.length-1)];export const didSucceedChance=t=>getRandomPositiveInteger(1,100)<=100*t;