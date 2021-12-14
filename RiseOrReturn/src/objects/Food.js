import GameObject from"./GameObject.js";import Sprite from"../../lib/Sprite.js";import ImageName from"../enums/ImageName.js";import Animation from"../../lib/Animation.js";import{images,context,DEBUG}from"../globals.js";import Vector from"../../lib/Vector.js";import Player from"../entities/Player.js";import{getRandomNumber,getRandomPositiveInteger}from"../../lib/RandomNumberHelpers.js";export default class Food extends GameObject{static WIDTH=16;static HEIGHT=16;static SPRITE_WIDTH=32;static SPRITE_HEIGHT=32;static HIT=0;static NOT_HIT=1;constructor(t,e,o){super(t,e),this.isConsumable=!0,this.food=this.getRandomFood(),this.sprites=Sprite.generateSpritesFromSpriteSheet(images.get(this.food),Food.SPRITE_WIDTH,Food.SPRITE_WIDTH),this.currentFrame=0,this.room=o,this.healAmount=1}render(t,e,o){const s=this.position.x+t,a=this.position.y+e;this.sprites[this.currentFrame].render(Math.floor(s),Math.floor(a),o),DEBUG&&this.hitbox.render(context)}onConsume(t){this.wasConsumed||t.health==t.maxHealth||(super.onConsume(),t instanceof Player&&(t.health==t.maxHealth-this.healAmount?t.health=t.maxHealth:t.health+=this.healAmount,t.chestplateActive&&(t.chestplateDamageTaken-=this.healAmount)),this.wasConsumed=!0,this.cleanUp=!0)}getRandomFood(){switch(getRandomPositiveInteger(0,2)){case 0:return ImageName.Food1;case 1:return ImageName.Food2;case 2:return ImageName.Food3}}}