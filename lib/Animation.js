import { Common , meGauge , comGauge } from '../js/Common';
import Node from './LinkedList';
import PingPongMath from './Math';

let prevOptions = [];
let prevProp = [];
let id = undefined;

class bodies {
    static createMiniBall(player) {
        // velocity에 따라서 미니볼개수가 틀려짐
        const degreeScope = 90;
        const BALL_NUNBER = 5;
        let options = [];
        let randomR;

        for(let i=0; i<BALL_NUNBER; i++) {
            randomR = Math.floor(Math.random() * 10) +1;  // 1 ~ 9

            switch(player.name) {
                case 'person' : {
                    if(player.y <= 0) {
                        options.push({
                            x : player.x+player.width,
                            y : 0,
                            randomR : randomR,
                            degree : Math.floor(Math.random() * degreeScope)+1,  //  1~90
                            capacity : 1
                        })
                    } else if(player.y >= ctx.canvas.height - player.height) {
                        options.push({
                            x : player.x+player.width,
                            y : back_ctx.canvas.height,
                            randomR : randomR,
                            degree : Math.floor(Math.random() * degreeScope) +271, // 271~360
                            capacity : 1
                        })
                    }
                }
                break;
                case 'computer' : {
                    //console.log(player.y)  698 , 2
                    if(player.y === 698) {
                        options.push({
                            x : player.x,
                            y : back_ctx.canvas.height,
                            randomR : randomR,
                            degree : Math.floor(Math.random() * degreeScope) +181, // 181~270
                            capacity : 1
                        })
                    } else if(player.y === 2) {
                        options.push({
                            x : player.x,
                            y : 0,
                            randomR : randomR,
                            degree : Math.floor(Math.random() * degreeScope) +91,   // 91~180
                            capacity : 1
                        })
                    }
                }
                break;
            }
        }
        return options;
    }
    // 생성된 미니볼을 애니메이션처리.
    static processing(options,prop) {
        let cnt = 0;
        let capacity;

        for(let i=0; i<options.length; i++) {
            if(cnt === 0 ) { // 처음에만지움.
                if(prop[cnt] && prop[cnt].state) { // short curcit
                    back_ctx.clearRect(0,0,back_ctx.canvas.width,back_ctx.canvas.height);
                    cnt++;
                }
            }
            // 4,9,14 ... -> 9,14 ... --> 14, ...
            for(let p=0; p<prop.length; p++) {
                if(prop[p].section === i+4 ) {
                    capacity = prop[p].capacity;
                    break;
                }
            } 
            back_ctx.beginPath();
            back_ctx.arc(options[i].x+Math.cos(Math.PI/180*options[i].degree)*options[i].randomR,options[i].y+Math.sin(Math.PI/180*options[i].degree)*options[i].randomR,2,0,Math.PI*2,false);  
            back_ctx.fillStyle = `rgba(255,128,128,${capacity}`; 
            back_ctx.fill();   

        }
    }
}

class Animation {
    constructor() {
        this.startTime = undefined;
        this.measureTime = undefined;
        this.image = undefined;
        this.first = false;
        this.options = undefined;
        this.state = false;
        this.animate = (player) => {
            if(!this.first) {
                if(id) {
                    window.cancelAnimationFrame(id);
                }
                this.options = bodies.createMiniBall(player);             
                this.first = !this.first;  
                prevOptions = prevOptions.concat(this.options);

                prevProp.push({
                    capacity : 1,
                    measureTime : +new Date,
                    state : this.state,
                    section : prevOptions.length-1
                });
            }             

            
            for(let opt of prevOptions)
                opt.randomR += 0.3;

            for(let i=0; i<prevProp.length; i++) {
                //console.log(prevProp[i].section);
                let t = +new Date - prevProp[i].measureTime;
                 if(t > 1000 && t  < 1100) {
                        prevProp[i].capacity = 0.9;
                    } else if(t  > 2000 && t < 2100) {
                        prevProp[i].capacity = 0.8;
                    } else if(t  > 3000 && t < 3100) {
                        prevProp[i].capacity = 0.7;
                    } else if(t  > 4000 && t < 4100) { // 4초~4.1초 일때
                        prevProp[i].capacity = 0.6;
                    } else if(t  > 5000 && t < 5100) { // 5초~5.1초떄떄
                        prevProp[i].capacity = 0.5;
                    } else if(t  > 6000 && t < 6100) { // 6초~6.1초떄
                        prevProp[i].capacity = 0.4;
                    } else if(t  > 7000 && t < 7100) { // 7초~7.1초떄
                        prevProp[i].capacity = 0.3;
                    } else if(t > 8000 && t  < 8100) { // 8초~8.1초떄
                        prevProp[i].capacity = 0.2;
                    } else if(t > 9000 &&  t < 9100) { // 9초~9.1초떄
                        prevProp[i].capacity = 0.1;
                    } else if(t > 10000 ) { // 10초 이상일때
                        //prevProp[i].capacity = 0;
                        back_ctx.clearRect(0,0,back_ctx.canvas.width,back_ctx.canvas.height);
                        if (Node.transfer() === true) {
                            prevOptions = prevProp = undefined;
                            prevOptions = prevProp = [];
                            return;
                        } else {
                            // 4,9,14 ... -> 4,9 ... --> 4, ...
                            prevOptions = prevOptions.slice(prevProp[i].section+1);
                            for(let i=0; i<prevProp.length; i++) {
                                prevProp[i].capacity = prevProp[i+1] ? prevProp[i+1].capacity : undefined;
                                prevProp[i].measureTime = prevProp[i+1] ? prevProp[i+1].measureTime : undefined;    
                            }
                            prevProp = prevProp.slice(0,prevProp.length-1); // prevProp.pop();
                            prevProp[0].state = true; 
                            
                        }
                    }
            }
            bodies.processing(prevOptions,prevProp);            
            id = window.requestAnimationFrame(this.animate);
        }
    }
    hit(player) {
        this.animate = this.animate.bind(this,player);
        window.requestAnimationFrame(this.animate);
    }
};

class ballAnimation {
    constructor() {
        this.x = ctx.canvas.width/2-10;
        this.y = 0;//ctx.canvas.height/2-10,20;
        this.width = 20;
        this.height = 20;
        this.range = 0;
        this.incX = 3;
        this.incY = -3;
        this.id = undefined;
        this.animate = undefined;
    }
    clear() {
        ball_ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
    calculate() {
        this.x -= this.incX;
        this.y -= this.incY;
    }
    setup(me,com,meGauge,comGauge) {
        this.animate = () => {
            

            this.clear();
            this.calculate();
            if( (this.x === me.x+me.width) || (com.x+com.width) ) {
                // 좌,우
                if( this.x > 0 && (this.x <= me.x+me.width) && (this.y >= me.y && this.y <= me.y+me.height) ) {
                    this.incX = -Math.abs(this.incX + meGauge.velocity);
                    if(this.incY > 0) this.incY = Math.abs( Math.abs(this.incY) + meGauge.velocity);
                    else              this.incY = -Math.abs( Math.abs(this.incY) + meGauge.velocity);

                    if(meGauge.inc > 0) {
                        utilityDrawing.drawStarInit(effect_ctx,10,meGauge);
                        utilityDrawing.drawStarStart();
                    }

                    meGauge.inc = 0;

                } else if( this.x < ctx.canvas.width && (this.x+this.width >= com.x) && (this.y >= com.y && this.y <= com.y+com.height) ) {
                    this.incX = Math.abs(this.incX + comGauge.velocity);
                    //this.incY = Math.abs(this.incY + comGauge.velocity);
                }
            }
            // 꼭대기,맨밑
            if(this.y <= 0) {
                this.incY = -Math.abs(this.incY);
            }
            else if(this.y >= ctx.canvas.height-this.height) {
                this.incY = Math.abs(this.incY);
            }

            Common.createBall.call(this);

            if(Common.isGameOver(me,com)) {
                Common.clear.call(me);
                me.x = 20;
                me.y = ctx.canvas.height/2;;
                com.x = ctx.canvas.width - 40;
                com.y = ctx.canvas.height/2;
                com.velocity = 3;
                this.x = ctx.canvas.width/2 - 10;
                this.y = 0;
                this.incX = 3;
                this.incY = -3;
                me.spaceBarCtrl = false;
            }

            window.requestAnimationFrame(this.animate);
        }
        this.animate = this.animate.bind(this,me,com,meGauge.comGauge);
    }
    move(me,com,meGauge,comGauge) {
        this.setup(me,com,meGauge,comGauge);
        this.id = window.requestAnimationFrame(this.animate);
    }
}

class gaugeAnimation {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 20;
        this.height = 0;
        this.inc = 0;
        this.ctx = gauge_ctx;
        this.gradient = undefined;
        this.velocity = 0;
        this.id = undefined;
        this.animate = (player) => {
            let arr = ['#ffe6e6','#ffcccc','#ffb3b3','#ff9999','#ff8080',
                    '#e6eeff','#ccdcff','#b3cbff','#99b9ff','#80a8ff'];
            let inc = 0;
            this.gradient = this.ctx.createLinearGradient(player.x,player.y+player.height,player.x,player.y);

            arr = player.name === 'person' ? arr.slice(0,5) : arr.slice(5,arr.length);
            for(let i=0; i<arr.length; i++) {
                this.gradient.addColorStop(inc,arr[i]);
                inc += 0.1;
            }
            this.ctx.fillStyle = this.gradient;
            
            this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.x = player.x;
            this.y = player.y + player.height - this.inc;
            this.height = this.inc;
            this.inc += this.inc === player.height ? 0 : 0.5;
            this.velocity = this.inc / 50;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.id = window.requestAnimationFrame(this.animate);
        }
    }
    init(player) {
        this.animate = this.animate.bind(this,player);
    }
    start() {
        this.id = window.requestAnimationFrame(this.animate);
    }
    terminate() {
        window.cancelAnimationFrame(this.id);
        this.ctx.clearRect(this.x,this.y - 0.5,this.width,this.height);
        this.x = this.y = this.inc = this.velocty = 0;
    }
}


const utilityDrawing = (() => {
    let drawStar = function (ctx,size,set,player){ // 사용할떄 translate로 자표변환시키고 써야한다 당연히 save,restore 안에서.
            let x,y;

            style = flag ? '#80ff00' :  '#000' ;
            flag = !flag;
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
            
            for(let j=0; j<set.length; j++) {
                x = Math.cos(set[j].degree * Math.PI/180) * set[j].radius;
                y = Math.sin(set[j].degree * Math.PI/180) * set[j].radius;
                
                ctx.save();
                ctx.translate(posX+x , posY+y);
                ctx.fillStyle = style;
                ctx.beginPath()
                ctx.moveTo(size,0);
                for (var i=0;i<9;i++){
                    ctx.rotate(Math.PI/5);
                    if(i%2 == 0) {
                    ctx.lineTo((size/0.525731)*0.200811,0);
                    } else {
                    ctx.lineTo(size,0);
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                set[j].radius += Math.floor(Math.random() * 3)+1 // Math.random();
            }
            if(+new Date - this.getTime() < 1000) {
                //window.requestAnimationFrame(this.drawStar);
            }
            else {
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                this.setClear();
                window.clearInterval(id);
            }
    }
    let t = 0;
    let posX = 0;
    let posY = 0;
    let copy;
    let flag = true;
    let style;
    let id;

    return class {
        static drawStarInit(ctx,size,player) {
            let set = [];

            for(let i=0; i<10; i++) {
                set.push({
                    degree : Math.floor(Math.random() * 360)+1,  // 1~360
                    radius : Math.floor(Math.random() * 3)+1//Math.random()   // 1~3 
                }); 
            }
            posX = player.x + player.width;
            posY = player.y + player.height/2;
            copy = drawStar.bind(this,ctx,size,set,player);
        }
        static drawStarStart() {
            t = +new Date;
            id = window.setInterval(copy,10); //window.requestAnimationFrame(copy);
        }
        static setClear() {
            posX = posY = t = 0;
        }
        static getTime() {
            return t;
        }
        static drawStar() {
            copy();
        }
    }        
})();

    





export { Animation, ballAnimation ,gaugeAnimation , utilityDrawing };

