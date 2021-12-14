import GameObject from"./GameObject.js";import Sprite from"../../lib/Sprite.js";import ImageName from"../enums/ImageName.js";import{images}from"../globals.js";import Vector from"../../lib/Vector.js";import Player from"../entities/Player.js";export default class Potion extends GameObject{static WIDTH=16;static HEIGHT=16;static HIT=0;static NOT_HIT=1;static POTION_FRAME=5;constructor(e,t,a){super(e,t),this.isConsumable=!0,this.sprites=Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Potion),Potion.WIDTH,Potion.HEIGHT),this.currentFrame=Potion.POTION_FRAME,this.room=a}onConsume(e){this.wasConsumed||e.health==e.maxHealth||(super.onConsume(),e instanceof Player&&(e.chestplateActive&&(e.chestplateDamageTaken-=e.maxHealth-e.health),e.health=e.maxHealth),this.wasConsumed=!0,this.cleanUp=!0)}}