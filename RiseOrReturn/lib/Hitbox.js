import{isAABBCollision}from"./CollisionHelpers.js";import Vector from"./Vector.js";export default class Hitbox{constructor(i=0,s=0,o=0,t=0,e="red"){this.colour=e,this.set(i,s,o,t)}set(i,s,o,t){this.position=new Vector(i,s),this.dimensions=new Vector(o,t)}didCollide(i){return isAABBCollision(this.position.x,this.position.y,this.dimensions.x,this.dimensions.y,i.position.x,i.position.y,i.dimensions.x,i.dimensions.y)}render(i){i.save(),i.strokeStyle=this.colour,i.beginPath(),i.rect(this.position.x,this.position.y,this.dimensions.x,this.dimensions.y),i.stroke(),i.closePath(),i.restore()}}