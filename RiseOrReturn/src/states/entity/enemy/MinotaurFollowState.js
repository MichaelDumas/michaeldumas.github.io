import Animation from"../../../../lib/Animation.js";import{didSucceedChance,getRandomPositiveInteger,pickRandomElement}from"../../../../lib/RandomNumberHelpers.js";import State from"../../../../lib/State.js";import Enemy from"../../../entities/enemies/Enemy.js";import Direction from"../../../enums/Direction.js";import EnemyStateName from"../../../enums/EnemyStateName.js";import MinotaurStateName from"../../../enums/MinotaurStateName.js";import{timer}from"../../../globals.js";import Room from"../../../objects/Room.js";export default class MinotaurFollowState extends State{static SPIN_DISTANCE=30;constructor(i,t,e){super(),this.enemy=i,this.animation=t,this.player=e}enter(){this.enemy.currentAnimation=this.animation[this.enemy.direction]}update(i){this.move(i),(Math.abs(this.enemy.hitbox.position.x-this.enemy.room.player.hitbox.position.x)<=MinotaurFollowState.SPIN_DISTANCE||Math.abs(this.enemy.hitbox.position.x+this.enemy.hitbox.dimensions.x-this.enemy.room.player.hitbox.position.x+this.enemy.room.player.hitbox.dimensions.x)<=MinotaurFollowState.SPIN_DISTANCE)&&(Math.abs(this.enemy.hitbox.position.y-this.enemy.room.player.hitbox.position.y)<=MinotaurFollowState.SPIN_DISTANCE||Math.abs(this.enemy.hitbox.position.y+this.enemy.hitbox.dimensions.y-this.enemy.room.player.hitbox.position.y+this.enemy.room.player.hitbox.dimensions.y)<=MinotaurFollowState.SPIN_DISTANCE)&&this.enemy.canSpin&&this.enemy.changeState(MinotaurStateName.Spin)}move(i){this.player.hitbox.position.y>this.enemy.hitbox.position.y&&(this.enemy.position.y+=this.enemy.speed*i,this.enemy.direction=Direction.Down),this.player.hitbox.position.x>this.enemy.hitbox.position.x&&(this.enemy.position.x+=this.enemy.speed*i,this.enemy.direction=Direction.Right),this.player.hitbox.position.y<this.enemy.hitbox.position.y&&(this.enemy.position.y-=this.enemy.speed*i,this.enemy.direction=Direction.Up),this.player.hitbox.position.x<this.enemy.hitbox.position.x&&(this.enemy.position.x-=this.enemy.speed*i,this.enemy.direction=Direction.Left),this.enemy.currentAnimation=this.animation[this.enemy.direction]}}