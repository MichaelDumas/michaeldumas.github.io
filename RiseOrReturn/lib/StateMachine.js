export default class StateMachine{constructor(){this.states={}}add(t,e){e.name=t,this.states[t]=e,this.currentState=e}change(t,e){this.currentState.exit(),this.currentState=this.states[t],this.currentState.enter(e)}update(t){this.currentState.update(t)}render(t){this.currentState.render(t)}}