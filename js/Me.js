import { Common , meGauge } from './Common';
import { computer } from './Common';
import PingPongMath from '../lib/Math.js';
import { Animation } from '../lib/Animation.js';
import Node from '../lib/LinkedList.js';

let id;

class Me {
    constructor() {
        this.name = 'person';
        this.x = 20;
        this.y = ctx.canvas.height/2;
        this.width = 20;
        this.height = 150;
        this.velocity = 2;
        this.score = 0;
        this.barColor = 'white';
        this.keyupListener = undefined;
        this.keydownListener = undefined;
        this.ctx = me_ctx;
        this.animateCount = 0;
        this.animate = undefined;
        this.keyFlag = undefined;
        this.spaceBar = undefined;
        this.spaceBarCtrl = true;
    }
    init() {
        this.animate = () => {
            if(this.y <= 0) {
                if(this.keyFlag === 'up') { 
                    this.keyFlag = undefined;
                    new Node(new Animation()).animation.hit(this);
                } 
            } else if(this.y >= ctx.canvas.height-this.height) {
                if(this.keyFlag === 'down') {
                    this.keyFlag = undefined;
                    new Node(new Animation()).animation.hit(this);
                }
            }

            if(this.keyFlag === 'up')         this.y -= this.velocity ;
            else if(this.keyFlag === 'down')  this.y += this.velocity ;
            
            if(!this.spaceBarCtrl) {
                this.spaceBar = false;
            }

            if(!this.spaceBar)  {
                meGauge.terminate();
                if(!this.spaceBarCtrl) 
                    this.spaceBarCtrl = !this.spaceBarCtrl;
            } 
            
            this.com.animate();

            Common.clear.call(this);
            this.ctx.fillStyle = this.barColor;
            Common.createBar.call(this);
            Common.createBar.call(this.com);
        }
        this.keydownListener = (e) => {
            switch(e.keyCode) {
                // up
                case 38 : {
                    this.keyFlag = 'up';
                }
                break;
                // down
                case 40 : {
                    this.keyFlag = 'down';
                }
                break;
                // space
                case 32 : {
                    if(this.spaceBarCtrl) {
                        if(!this.spaceBar)  meGauge.start();
                        this.spaceBar = true;
                    } else  {
                        this.spaceBar = false;;   
                    }
                    
                }
                break;
            }
        }
        this.keyupListener = (e) => {
            switch(e.keyCode) {
                // up
                case 38 : {
                    if(this.keyFlag === 'up') 
                        this.keyFlag = undefined;
                }
                break;
                // down
                case 40 : {
                    if(this.keyFlag === 'down')
                        this.keyFlag = undefined;
                }
                break;
                // space
                case 32 : {
                    if(this.spaceBar)
                        this.spaceBar = false;
                }
                break;
            }
        }
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
        this.animate = this.animate.bind(this);
        window.addEventListener('keydown',this.keydownListener);
        window.addEventListener('keyup',this.keyupListener);
        
        id = window.setInterval(this.animate,10); // 무한루프
        //window.requestAnimationFrame(this.animate); 이거 쓰면안됨.
    }
    
}


export default Me;