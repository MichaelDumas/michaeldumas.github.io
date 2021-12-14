import GameStateName from"./enums/GameStateName.js";import Game from"../lib/Game.js";import{canvas,context,fonts,images,keys,sounds,stateMachine}from"./globals.js";import PlayState from"./states/game/PlayState.js";import GameOverState from"./states/game/GameOverState.js";import TitleScreenState from"./states/game/TitleScreenState.js";import TransitionState from"./states/game/TransitionState.js";import ScrollState from"./states/game/ScrollState.js";import RuleScreenState from"./states/game/RuleScreenState.js";import HighScoreState from"./states/game/HighScoreState.js";import EquipementSelectState from"./states/game/EquipementSelectState.js";import HighScoreNameState from"./states/game/HighScoreNameState.js";import WinState from"./states/game/WinState.js";import RiseOrReturnState from"./states/game/RiseOrReturnState.js";fetch("./src/config.json").then((e=>e.json())).then((e=>{const{images:t,fonts:a,sounds:s}=e;images.load(t),fonts.load(a),sounds.load(s),stateMachine.add(GameStateName.Transition,new TransitionState),stateMachine.add(GameStateName.TitleScreen,new TitleScreenState),stateMachine.add(GameStateName.GameOver,new GameOverState),stateMachine.add(GameStateName.Play,new PlayState),stateMachine.add(GameStateName.Scroll,new ScrollState),stateMachine.add(GameStateName.Rules,new RuleScreenState),stateMachine.add(GameStateName.HighScore,new HighScoreState),stateMachine.add(GameStateName.HighScoreName,new HighScoreNameState),stateMachine.add(GameStateName.Equipement,new EquipementSelectState),stateMachine.add(GameStateName.Win,new WinState),stateMachine.add(GameStateName.RiseReturn,new RiseOrReturnState),stateMachine.change(GameStateName.TitleScreen),canvas.addEventListener("keydown",(e=>{keys[e.key]=!0})),canvas.addEventListener("keyup",(e=>{keys[e.key]=!1})),new Game(stateMachine,context,canvas.width,canvas.height).start(),canvas.focus()}));