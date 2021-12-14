import State from"../../../lib/State.js";import Player from"../../entities/Player.js";import GameStateName from"../../enums/GameStateName.js";import ImageName from"../../enums/ImageName.js";import SoundName from"../../enums/SoundName.js";import{CANVAS_HEIGHT,CANVAS_WIDTH,context,images,keys,sounds,stateMachine,timer}from"../../globals.js";import Dungeon from"../../objects/Dungeon.js";import Room from"../../objects/Room.js";import UserInterface from"../../services/UserInterface.js";export default class PlayState extends State{constructor(){super(),this.player=new Player,this.dungeon=new Dungeon(this.player),this.userInterface=new UserInterface(this.player),this.paused=!1}enter(e){null!=e.dungeon?(sounds.play(SoundName.MainThemeTrap),this.risen=!0,this.player.roomShifting=!0,this.dungeon=e.dungeon):(this.player.reset(),this.dungeon=new Dungeon(this.player),this.player.equipment=e.equipment)}update(e){if(this.risen&&(timer.wait(.01,(()=>{this.player.roomShifting=!1})),this.risen=!1),this.paused)keys.Escape&&(keys.Escape=!1,this.paused=!1);else{if(this.dungeon.update(e),timer.update(e),this.player.isDead){let e=this.player.level;stateMachine.change(GameStateName.Transition,{fromState:this,toState:stateMachine.states[GameStateName.GameOver],level:e})}this.player.gameWon&&stateMachine.change(GameStateName.Transition,{fromState:this,toState:stateMachine.states[GameStateName.Win],level:this.player.level}),this.player.level%Room.BOSS_LEVEL_INCREMENT==0&&this.player.level>0&&this.player.canRise&&(this.player.canRise=!1,this.player.roomShifting=!0,stateMachine.change(GameStateName.Transition,{fromState:this,toState:stateMachine.states[GameStateName.RiseReturn],level:this.player.level,dungeon:this.dungeon})),keys.Escape&&(keys.Escape=!1,this.paused=!0)}}render(){this.paused?(images.render(ImageName.Background,0,0,CANVAS_WIDTH,CANVAS_HEIGHT),context.save(),context.font="50px Zelda",context.fillStyle="white",context.textBaseline="middle",context.textAlign="left",context.fillText("Rise",CANVAS_WIDTH/8-20,CANVAS_HEIGHT/4),context.fillText("Or",CANVAS_WIDTH/8,CANVAS_HEIGHT/4+40),context.fillText("Return",CANVAS_WIDTH/8+20,CANVAS_HEIGHT/4+80),context.textAlign="center",context.fillStyle="red",context.fillText("Paused",.75*CANVAS_WIDTH,CANVAS_HEIGHT/2),context.restore()):(this.dungeon.render(),this.userInterface.render(),context.font="15px Zelda",context.fillStyle="white",context.textBaseline="middle",context.textAlign="center",context.fillText("Level ",CANVAS_WIDTH-38,CANVAS_HEIGHT/20),context.fillText(this.player.level,CANVAS_WIDTH-10,CANVAS_HEIGHT/20),context.font="15px Zelda",context.fillStyle="white")}}