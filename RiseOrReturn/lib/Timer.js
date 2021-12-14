export default class Timer{constructor(){this.tasks=[]}update(t){this.updateTasks(t),this.removeFinishedTasks()}addTask(t,s,i=0,a=(()=>{})){const e=new Task(t,s,i,a);return this.tasks.push(e),e}updateTasks(t){this.tasks.forEach((s=>{s.update(t)}))}removeFinishedTasks(){this.tasks=this.tasks.filter((t=>!t.isDone))}clear(){this.tasks=[]}tween(t,s,i,a,e=(()=>{})){const n=Object.assign({},t);this.addTask((e=>{s.forEach(((s,h)=>{const r=i[h]-t[s]>0?1:-1,o=n[s],c=i[h],l=e/a;if(1===r){const i=o+(c-o)*l;t[s]=Math.min(c,i)}else{const i=o-(o-c)*l;t[s]=Math.max(c,i)}}))}),0,a,e)}async tweenAsync(t,s,i,a){return new Promise((e=>{this.tween(t,s,i,a,e)}))}wait(t,s=(()=>{})){return this.addTask((()=>{}),0,t,s)}async waitAsync(t){return new Promise((s=>{this.addTask((()=>{}),0,t,s)}))}}class Task{constructor(t,s,i=0,a=(()=>{})){this.action=t,this.interval=s,this.intervalTimer=0,this.totalTime=0,this.duration=i,this.callback=a,this.isDone=!1}clear(){this.isDone=!0}update(t){this.intervalTimer+=t,this.totalTime+=t,0===this.interval?this.action(this.totalTime):this.intervalTimer>=this.interval&&(this.intervalTimer%=this.interval,this.action(t)),0!==this.duration&&this.totalTime>=this.duration&&(this.callback(),this.isDone=!0)}}