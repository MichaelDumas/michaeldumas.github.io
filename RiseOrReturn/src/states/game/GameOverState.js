import State from"../../../lib/State.js";import GameStateName from"../../enums/GameStateName.js";import SoundName from"../../enums/SoundName.js";import{CANVAS_HEIGHT,CANVAS_WIDTH,context,keys,sounds,stateMachine,images}from"../../globals.js";import ImageName from"../../enums/ImageName.js";export default class GameOverState extends State{constructor(){super()}enter(e){this.level=e.level,this.didReturn=e.didReturn,sounds.stop(SoundName.MainTheme),sounds.stop(SoundName.MainThemeTrap),sounds.play(SoundName.GameOver),this.didReturn?this.graveText="Returned":this.graveText="Died at"}update(){keys.Enter&&(keys.Enter=!1,this.didReturn?stateMachine.change(GameStateName.Transition,{fromState:this,toState:stateMachine.states[GameStateName.HighScoreName],level:this.level}):stateMachine.change(GameStateName.Transition,{fromState:this,toState:stateMachine.states[GameStateName.TitleScreen]}))}render(){images.render(ImageName.GameOver,0,0,CANVAS_WIDTH,CANVAS_HEIGHT),context.font="25px Joystix",context.fillStyle="white",context.textBaseline="middle",context.textAlign="center",context.fillText("Press Enter To Continue",CANVAS_WIDTH/2,CANVAS_HEIGHT/2-80),context.font="25px Death",context.fillStyle="red",context.fillText(this.graveText,CANVAS_WIDTH/2-5,CANVAS_HEIGHT/2+50),context.fillText("LVL "+this.level,CANVAS_WIDTH/2-5,CANVAS_HEIGHT/2+70)}}