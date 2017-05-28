import Me from './Me';
import { Common } from './Common';
import { ball } from './Common';
import { Animation } from '../lib/Animation.js';
import Node from '../lib/LinkedList.js';

class Computer {
    constructor() {
        this.width = 20;
        this.height = 150;
        this.velocity = 3;
        this.score = 0;
        this.ctx = me_ctx;
        this.topEffect = true;
        this.bottomEffect = true;
        this.name = 'computer';
        this.x = ctx.canvas.width - 40;
        this.y = ctx.canvas.height/2;
    }
    init() {
        this.animate = (ball) => {
            if(Math.abs(ball.incX) > 3 && Math.abs(ball.incX) < 7 ) this.velocity = Math.abs(ball.incX);
            
            if(ball.y + ball.height/2  < this.y + this.height/2) {
                if(ball.y + ball.height/2  - this.y + this.height/2 - this.height < this.velocity*10)
                    this.keyFlag = undefined;
                this.keyFlag = 'up';
            }
            else if(ball.y + ball.height/2  > this.y + this.height/2) {
                //console.log(ball.y + ball.height/2  - this.y + this.height/2 - this.height)
                if(ball.y + ball.height/2  - this.y + this.height/2 - this.height < this.velocity*10)
                    this.keyFlag = undefined;
                this.keyFlag = 'down';
            }
            this.move();
        } 
        this.move = () => {
            if(this.keyFlag === 'up') {
                this.y -= this.velocity;
            }
            else if(this.keyFlag === 'down') {
                this.y += this.velocity;
            }

            if(this.y < 0 ) {
                this.y += this.velocity;
            } else if(this.y > ctx.canvas.height - this.height) {
                this.y -= this.velocity; 
            }
        }
        this.animate = this.animate.bind(this,ball);
    }
}

export default Computer;