import { ballAnimation , gaugeAnimation } from '../lib/Animation';
import Me from './Me';
import Computer from './Computer';

const me = new Me();
me.com = new Computer();
const ball = new ballAnimation();
const meGauge = new gaugeAnimation();
const comGauge = new gaugeAnimation();


class Common {
    constructor() {
        this.x = 0; // ball의 x값
        this.y = 0; // ball의 y값
        this.img = undefined;
    }
    static init() {
        this.drawBackground();
        this.drawCenterLine();
        this.img = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

        ///////////////////////////////////////////////////////////////////////////////////////
        me.init();               // player 초기화
        me.com.init();           // computer 초기화
        this.createBar.call(me); // bar 생성
        this.createBar.call(me.com); // bar 생성

        meGauge.init(me);
        comGauge.init(me.com);

    }
    // 전체(기본적인)그리기
    static drawBasicDisplay() {
        ctx.putImageData(this.img,0,0);
    }
    // 배경화면
    static drawBackground() {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.restore();
    }
    // 중앙 선
    static drawCenterLine() {
        const interval = 5;
        let y = 0;

        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';        

        for(let i=0; i< 2/(interval/ctx.canvas.height); i++) {
            ctx[ i % 2 == 0 ? 'moveTo' : 'lineTo' ]
                ((ctx.canvas.width/2)-ctx.lineWidth, y+=interval);
        }

        ctx.stroke();
        ctx.restore();
    }
    // bar 생성
    static createBar() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.restore();
    }
    // 볼 생성
    static createBall() {
        ball_ctx.save();
        ball_ctx.beginPath();
        ball_ctx.fillStyle = '#68a8c4';
        ball_ctx.rect(this.x,this.y,this.width,this.height);
        ball_ctx.fill();
        ball_ctx.restore();
    }
    static clear() {
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
    // 볼 배달
    static deliverBall() {
        ball.move(me,me.com,meGauge,comGauge);  
    }
    static isGameOver(me,com) {
        if (ball.x <= 0 - me.width) {
            com.score++;
            com_score.textContent = com.score;
            return true;
        } else if(ball.x >= ctx.canvas.width + com.width) {
            me.score++;
            me_score.textContent = me.score;
            return true;
        } else
            return false;
    }
}

//export default Common;
export { Common , computer , me, ball , meGauge , comGauge };