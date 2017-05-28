/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Common; });
/* unused harmony export computer */
/* unused harmony export me */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ball; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return meGauge; });
/* unused harmony export comGauge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Animation__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Me__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Computer__ = __webpack_require__(4);




const me = new __WEBPACK_IMPORTED_MODULE_1__Me__["a" /* default */]();
me.com = new __WEBPACK_IMPORTED_MODULE_2__Computer__["a" /* default */]();
const ball = new __WEBPACK_IMPORTED_MODULE_0__lib_Animation__["a" /* ballAnimation */]();
const meGauge = new __WEBPACK_IMPORTED_MODULE_0__lib_Animation__["b" /* gaugeAnimation */]();
const comGauge = new __WEBPACK_IMPORTED_MODULE_0__lib_Animation__["b" /* gaugeAnimation */]();

class Common {
    constructor() {
        this.x = 0; // ball의 x값
        this.y = 0; // ball의 y값
        this.img = undefined;
    }
    static init() {
        this.drawBackground();
        this.drawCenterLine();
        this.img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

        ///////////////////////////////////////////////////////////////////////////////////////
        me.init(); // player 초기화
        me.com.init(); // computer 초기화
        this.createBar.call(me); // bar 생성
        this.createBar.call(me.com); // bar 생성

        meGauge.init(me);
        comGauge.init(me.com);
    }
    // 전체(기본적인)그리기
    static drawBasicDisplay() {
        ctx.putImageData(this.img, 0, 0);
    }
    // 배경화면
    static drawBackground() {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    // 중앙 선
    static drawCenterLine() {
        const interval = 5;
        let y = 0;

        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';

        for (let i = 0; i < 2 / (interval / ctx.canvas.height); i++) {
            ctx[i % 2 == 0 ? 'moveTo' : 'lineTo'](ctx.canvas.width / 2 - ctx.lineWidth, y += interval);
        }

        ctx.stroke();
        ctx.restore();
    }
    // bar 생성
    static createBar() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    }
    // 볼 생성
    static createBall() {
        ball_ctx.save();
        ball_ctx.beginPath();
        ball_ctx.fillStyle = '#68a8c4';
        ball_ctx.rect(this.x, this.y, this.width, this.height);
        ball_ctx.fill();
        ball_ctx.restore();
    }
    static clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    // 볼 배달
    static deliverBall() {
        ball.move(me, me.com, meGauge, comGauge);
    }
    static isGameOver(me, com) {
        if (ball.x <= 0 - me.width) {
            com.score++;
            com_score.textContent = com.score;
            return true;
        } else if (ball.x >= ctx.canvas.width + com.width) {
            me.score++;
            me_score.textContent = me.score;
            return true;
        } else return false;
    }
}

//export default Common;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Math_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_Animation_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_LinkedList_js__ = __webpack_require__(3);






let id;

class Me {
    constructor() {
        this.name = 'person';
        this.x = 20;
        this.y = ctx.canvas.height / 2;
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
            if (this.y <= 0) {
                if (this.keyFlag === 'up') {
                    this.keyFlag = undefined;
                    new __WEBPACK_IMPORTED_MODULE_3__lib_LinkedList_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_2__lib_Animation_js__["c" /* Animation */]()).animation.hit(this);
                }
            } else if (this.y >= ctx.canvas.height - this.height) {
                if (this.keyFlag === 'down') {
                    this.keyFlag = undefined;
                    new __WEBPACK_IMPORTED_MODULE_3__lib_LinkedList_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_2__lib_Animation_js__["c" /* Animation */]()).animation.hit(this);
                }
            }

            if (this.keyFlag === 'up') this.y -= this.velocity;else if (this.keyFlag === 'down') this.y += this.velocity;

            if (!this.spaceBarCtrl) {
                this.spaceBar = false;
            }

            if (!this.spaceBar) {
                __WEBPACK_IMPORTED_MODULE_0__Common__["c" /* meGauge */].terminate();
                if (!this.spaceBarCtrl) this.spaceBarCtrl = !this.spaceBarCtrl;
            }

            this.com.animate();

            __WEBPACK_IMPORTED_MODULE_0__Common__["a" /* Common */].clear.call(this);
            this.ctx.fillStyle = this.barColor;
            __WEBPACK_IMPORTED_MODULE_0__Common__["a" /* Common */].createBar.call(this);
            __WEBPACK_IMPORTED_MODULE_0__Common__["a" /* Common */].createBar.call(this.com);
        };
        this.keydownListener = e => {
            switch (e.keyCode) {
                // up
                case 38:
                    {
                        this.keyFlag = 'up';
                    }
                    break;
                // down
                case 40:
                    {
                        this.keyFlag = 'down';
                    }
                    break;
                // space
                case 32:
                    {
                        if (this.spaceBarCtrl) {
                            if (!this.spaceBar) __WEBPACK_IMPORTED_MODULE_0__Common__["c" /* meGauge */].start();
                            this.spaceBar = true;
                        } else {
                            this.spaceBar = false;;
                        }
                    }
                    break;
            }
        };
        this.keyupListener = e => {
            switch (e.keyCode) {
                // up
                case 38:
                    {
                        if (this.keyFlag === 'up') this.keyFlag = undefined;
                    }
                    break;
                // down
                case 40:
                    {
                        if (this.keyFlag === 'down') this.keyFlag = undefined;
                    }
                    break;
                // space
                case 32:
                    {
                        if (this.spaceBar) this.spaceBar = false;
                    }
                    break;
            }
        };
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
        this.animate = this.animate.bind(this);
        window.addEventListener('keydown', this.keydownListener);
        window.addEventListener('keyup', this.keyupListener);

        id = window.setInterval(this.animate, 10); // 무한루프
        //window.requestAnimationFrame(this.animate); 이거 쓰면안됨.
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Me);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ballAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gaugeAnimation; });
/* unused harmony export utilityDrawing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LinkedList__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Math__ = __webpack_require__(5);




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

        for (let i = 0; i < BALL_NUNBER; i++) {
            randomR = Math.floor(Math.random() * 10) + 1; // 1 ~ 9

            switch (player.name) {
                case 'person':
                    {
                        if (player.y <= 0) {
                            options.push({
                                x: player.x + player.width,
                                y: 0,
                                randomR: randomR,
                                degree: Math.floor(Math.random() * degreeScope) + 1, //  1~90
                                capacity: 1
                            });
                        } else if (player.y >= ctx.canvas.height - player.height) {
                            options.push({
                                x: player.x + player.width,
                                y: back_ctx.canvas.height,
                                randomR: randomR,
                                degree: Math.floor(Math.random() * degreeScope) + 271, // 271~360
                                capacity: 1
                            });
                        }
                    }
                    break;
                case 'computer':
                    {
                        //console.log(player.y)  698 , 2
                        if (player.y === 698) {
                            options.push({
                                x: player.x,
                                y: back_ctx.canvas.height,
                                randomR: randomR,
                                degree: Math.floor(Math.random() * degreeScope) + 181, // 181~270
                                capacity: 1
                            });
                        } else if (player.y === 2) {
                            options.push({
                                x: player.x,
                                y: 0,
                                randomR: randomR,
                                degree: Math.floor(Math.random() * degreeScope) + 91, // 91~180
                                capacity: 1
                            });
                        }
                    }
                    break;
            }
        }
        return options;
    }
    // 생성된 미니볼을 애니메이션처리.
    static processing(options, prop) {
        let cnt = 0;
        let capacity;

        for (let i = 0; i < options.length; i++) {
            if (cnt === 0) {
                // 처음에만지움.
                if (prop[cnt] && prop[cnt].state) {
                    // short curcit
                    back_ctx.clearRect(0, 0, back_ctx.canvas.width, back_ctx.canvas.height);
                    cnt++;
                }
            }
            // 4,9,14 ... -> 9,14 ... --> 14, ...
            for (let p = 0; p < prop.length; p++) {
                if (prop[p].section === i + 4) {
                    capacity = prop[p].capacity;
                    break;
                }
            }
            back_ctx.beginPath();
            back_ctx.arc(options[i].x + Math.cos(Math.PI / 180 * options[i].degree) * options[i].randomR, options[i].y + Math.sin(Math.PI / 180 * options[i].degree) * options[i].randomR, 2, 0, Math.PI * 2, false);
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
        this.animate = player => {
            if (!this.first) {
                if (id) {
                    window.cancelAnimationFrame(id);
                }
                this.options = bodies.createMiniBall(player);
                this.first = !this.first;
                prevOptions = prevOptions.concat(this.options);

                prevProp.push({
                    capacity: 1,
                    measureTime: +new Date(),
                    state: this.state,
                    section: prevOptions.length - 1
                });
            }

            for (let opt of prevOptions) opt.randomR += 0.3;

            for (let i = 0; i < prevProp.length; i++) {
                //console.log(prevProp[i].section);
                let t = +new Date() - prevProp[i].measureTime;
                if (t > 1000 && t < 1100) {
                    prevProp[i].capacity = 0.9;
                } else if (t > 2000 && t < 2100) {
                    prevProp[i].capacity = 0.8;
                } else if (t > 3000 && t < 3100) {
                    prevProp[i].capacity = 0.7;
                } else if (t > 4000 && t < 4100) {
                    // 4초~4.1초 일때
                    prevProp[i].capacity = 0.6;
                } else if (t > 5000 && t < 5100) {
                    // 5초~5.1초떄떄
                    prevProp[i].capacity = 0.5;
                } else if (t > 6000 && t < 6100) {
                    // 6초~6.1초떄
                    prevProp[i].capacity = 0.4;
                } else if (t > 7000 && t < 7100) {
                    // 7초~7.1초떄
                    prevProp[i].capacity = 0.3;
                } else if (t > 8000 && t < 8100) {
                    // 8초~8.1초떄
                    prevProp[i].capacity = 0.2;
                } else if (t > 9000 && t < 9100) {
                    // 9초~9.1초떄
                    prevProp[i].capacity = 0.1;
                } else if (t > 10000) {
                    // 10초 이상일때
                    //prevProp[i].capacity = 0;
                    back_ctx.clearRect(0, 0, back_ctx.canvas.width, back_ctx.canvas.height);
                    if (__WEBPACK_IMPORTED_MODULE_1__LinkedList__["a" /* default */].transfer() === true) {
                        prevOptions = prevProp = undefined;
                        prevOptions = prevProp = [];
                        return;
                    } else {
                        // 4,9,14 ... -> 4,9 ... --> 4, ...
                        prevOptions = prevOptions.slice(prevProp[i].section + 1);
                        for (let i = 0; i < prevProp.length; i++) {
                            prevProp[i].capacity = prevProp[i + 1] ? prevProp[i + 1].capacity : undefined;
                            prevProp[i].measureTime = prevProp[i + 1] ? prevProp[i + 1].measureTime : undefined;
                        }
                        prevProp = prevProp.slice(0, prevProp.length - 1); // prevProp.pop();
                        prevProp[0].state = true;
                    }
                }
            }
            bodies.processing(prevOptions, prevProp);
            id = window.requestAnimationFrame(this.animate);
        };
    }
    hit(player) {
        this.animate = this.animate.bind(this, player);
        window.requestAnimationFrame(this.animate);
    }
};

class ballAnimation {
    constructor() {
        this.x = ctx.canvas.width / 2 - 10;
        this.y = 0; //ctx.canvas.height/2-10,20;
        this.width = 20;
        this.height = 20;
        this.range = 0;
        this.incX = 3;
        this.incY = -3;
        this.id = undefined;
        this.animate = undefined;
    }
    clear() {
        ball_ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    calculate() {
        this.x -= this.incX;
        this.y -= this.incY;
    }
    setup(me, com, meGauge, comGauge) {
        this.animate = () => {

            this.clear();
            this.calculate();
            if (this.x === me.x + me.width || com.x + com.width) {
                // 좌,우
                if (this.x > 0 && this.x <= me.x + me.width && this.y >= me.y && this.y <= me.y + me.height) {
                    this.incX = -Math.abs(this.incX + meGauge.velocity);
                    if (this.incY > 0) this.incY = Math.abs(Math.abs(this.incY) + meGauge.velocity);else this.incY = -Math.abs(Math.abs(this.incY) + meGauge.velocity);

                    if (meGauge.inc > 0) {
                        utilityDrawing.drawStarInit(effect_ctx, 10, meGauge);
                        utilityDrawing.drawStarStart();
                    }

                    meGauge.inc = 0;
                } else if (this.x < ctx.canvas.width && this.x + this.width >= com.x && this.y >= com.y && this.y <= com.y + com.height) {
                    this.incX = Math.abs(this.incX + comGauge.velocity);
                    //this.incY = Math.abs(this.incY + comGauge.velocity);
                }
            }
            // 꼭대기,맨밑
            if (this.y <= 0) {
                this.incY = -Math.abs(this.incY);
            } else if (this.y >= ctx.canvas.height - this.height) {
                this.incY = Math.abs(this.incY);
            }

            __WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* Common */].createBall.call(this);

            if (__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* Common */].isGameOver(me, com)) {
                __WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* Common */].clear.call(me);
                me.x = 20;
                me.y = ctx.canvas.height / 2;;
                com.x = ctx.canvas.width - 40;
                com.y = ctx.canvas.height / 2;
                com.velocity = 3;
                this.x = ctx.canvas.width / 2 - 10;
                this.y = 0;
                this.incX = 3;
                this.incY = -3;
                me.spaceBarCtrl = false;
            }

            window.requestAnimationFrame(this.animate);
        };
        this.animate = this.animate.bind(this, me, com, meGauge.comGauge);
    }
    move(me, com, meGauge, comGauge) {
        this.setup(me, com, meGauge, comGauge);
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
        this.animate = player => {
            let arr = ['#ffe6e6', '#ffcccc', '#ffb3b3', '#ff9999', '#ff8080', '#e6eeff', '#ccdcff', '#b3cbff', '#99b9ff', '#80a8ff'];
            let inc = 0;
            this.gradient = this.ctx.createLinearGradient(player.x, player.y + player.height, player.x, player.y);

            arr = player.name === 'person' ? arr.slice(0, 5) : arr.slice(5, arr.length);
            for (let i = 0; i < arr.length; i++) {
                this.gradient.addColorStop(inc, arr[i]);
                inc += 0.1;
            }
            this.ctx.fillStyle = this.gradient;

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.x = player.x;
            this.y = player.y + player.height - this.inc;
            this.height = this.inc;
            this.inc += this.inc === player.height ? 0 : 0.5;
            this.velocity = this.inc / 50;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.id = window.requestAnimationFrame(this.animate);
        };
    }
    init(player) {
        this.animate = this.animate.bind(this, player);
    }
    start() {
        this.id = window.requestAnimationFrame(this.animate);
    }
    terminate() {
        window.cancelAnimationFrame(this.id);
        this.ctx.clearRect(this.x, this.y - 0.5, this.width, this.height);
        this.x = this.y = this.inc = this.velocty = 0;
    }
}

const utilityDrawing = (() => {
    let drawStar = function (ctx, size, set, player) {
        // 사용할떄 translate로 자표변환시키고 써야한다 당연히 save,restore 안에서.
        let x, y;

        style = flag ? '#80ff00' : '#000';
        flag = !flag;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let j = 0; j < set.length; j++) {
            x = Math.cos(set[j].degree * Math.PI / 180) * set[j].radius;
            y = Math.sin(set[j].degree * Math.PI / 180) * set[j].radius;

            ctx.save();
            ctx.translate(posX + x, posY + y);
            ctx.fillStyle = style;
            ctx.beginPath();
            ctx.moveTo(size, 0);
            for (var i = 0; i < 9; i++) {
                ctx.rotate(Math.PI / 5);
                if (i % 2 == 0) {
                    ctx.lineTo(size / 0.525731 * 0.200811, 0);
                } else {
                    ctx.lineTo(size, 0);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            set[j].radius += Math.floor(Math.random() * 3) + 1; // Math.random();
        }
        if (+new Date() - this.getTime() < 1000) {
            //window.requestAnimationFrame(this.drawStar);
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.setClear();
            window.clearInterval(id);
        }
    };
    let t = 0;
    let posX = 0;
    let posY = 0;
    let copy;
    let flag = true;
    let style;
    let id;

    return class {
        static drawStarInit(ctx, size, player) {
            let set = [];

            for (let i = 0; i < 10; i++) {
                set.push({
                    degree: Math.floor(Math.random() * 360) + 1, // 1~360
                    radius: Math.floor(Math.random() * 3) + 1 //Math.random()   // 1~3 
                });
            }
            posX = player.x + player.width;
            posY = player.y + player.height / 2;
            copy = drawStar.bind(this, ctx, size, set, player);
        }
        static drawStarStart() {
            t = +new Date();
            id = window.setInterval(copy, 10); //window.requestAnimationFrame(copy);
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
    };
})();



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Node = (() => {
    let num = 0,
        head = undefined,
        cur = undefined,
        stateCur = undefined;

    return class {
        constructor(data) {
            this.num = num++;
            this.animation = data;
            this.prev = undefined;
            this.next = undefined;
            this.connect();
        }
        connect() {
            if (head === undefined) {
                head = this;
                cur = head;
                head.animation.state = true;
                //  console.log('head created');
            } else {
                this.prev = cur;
                cur.next = this;
                cur = this;
                //console.log(`${num} created`);
            }
        }
        static transfer() {
            if (stateCur === undefined) stateCur = head;
            // 가비지컬렉터로 회수한다. ES6의 Weak를 쓰면 더 깔끔해질수있다.
            if (this.getNodeNum() === 0) {
                head = cur = stateCur = undefined;
                num = 0;
                return true;
            }
            if (stateCur.num === this.getNodeNum() - 1) {
                // 노드가 맨 마지막이라면
                let before;
                cur = before = head;

                while (cur.next) {
                    cur = cur.next;
                    before = undefined;
                }
                head = cur = stateCur = undefined;
                num = 0;
                console.log('last');
                return true;
            }
            stateCur = stateCur.next;
            return false;
        }
        static getNodeNum() {
            return num;
        }
    };
})();

/* harmony default export */ __webpack_exports__["a"] = (Node);

/*
const Node = ( () => {
    let num = 0,
        head = undefined,
        cur = undefined;
    
    return class {
        constructor(data) {
            this.num = num++; 
            this.data = data;
            this.prev = undefined;
            this.next = undefined;
            this.connect();
        }
        connect() {
            if(head === undefined) {
                head = this;
                cur = head;
                console.log('head created');
                return;
            } else {
                this.prev = cur;
                cur.next = this;
                cur = this;
                console.log('node created');
            }
        }
        remove() {
            this.prev = this.next;
            this.next.prev = this.prev;
            this.next.num = this.num;
        }
    }
})();

*/

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Me__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_Animation_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_LinkedList_js__ = __webpack_require__(3);






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
        this.y = ctx.canvas.height / 2;
    }
    init() {
        this.animate = ball => {
            if (Math.abs(ball.incX) > 3 && Math.abs(ball.incX) < 7) this.velocity = Math.abs(ball.incX);

            if (ball.y + ball.height / 2 < this.y + this.height / 2) {
                if (ball.y + ball.height / 2 - this.y + this.height / 2 - this.height < this.velocity * 10) this.keyFlag = undefined;
                this.keyFlag = 'up';
            } else if (ball.y + ball.height / 2 > this.y + this.height / 2) {
                //console.log(ball.y + ball.height/2  - this.y + this.height/2 - this.height)
                if (ball.y + ball.height / 2 - this.y + this.height / 2 - this.height < this.velocity * 10) this.keyFlag = undefined;
                this.keyFlag = 'down';
            }
            this.move();
        };
        this.move = () => {
            if (this.keyFlag === 'up') {
                this.y -= this.velocity;
            } else if (this.keyFlag === 'down') {
                this.y += this.velocity;
            }

            if (this.y < 0) {
                this.y += this.velocity;
            } else if (this.y > ctx.canvas.height - this.height) {
                this.y -= this.velocity;
            }
        };
        this.animate = this.animate.bind(this, __WEBPACK_IMPORTED_MODULE_1__Common__["b" /* ball */]);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Computer);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// clojure (time,duration)
const PingPongMath = (() => {
    let time = 0;

    return class {
        static EaseInOut() {
            let t = +new Date();
            t = (time - t) / 10000; // 밀리세컨드 단위 
            return t - Math.sin(2 * Math.PI * t) / 2 * Math.PI; // EaseInOut
        }
        static EaseIn() {
            let t = +new Date();
            t = (time - t) / 1000; // 초 단위 
            return Math.pow(t, 2); // EaseIn
        }
        static EaseOut() {
            let t = +new Date();
            t = (time - t) / 1000; // 초 단위 
            return 1 - Math.pow(1 - t, 2); // EaseOut
        }
        static startTime(t) {
            time = t ? t : +new Date();
        }
        static getStartTime() {
            return time;
        }

        //////////////////////////////////////////////////////////////////////////////

        static isColiision(x1, x2, y1, y2, x3, x4, y3, y4) {
            // AABB Alogorithm
            // x,x,y,y   , x,x,y,y
            // 좌,우,상,하   좌,우,상,하
            return x2 > x3 && x1 < x4 && y2 > y3 && y1 < y4;
            /*
            return ballRight > ledge.left &&
                   ballLeft < ledge.right &&
                   ballBottom > ledge.top &&
                   ballTop < ledge.bottom
            */
        }

        static randomDegree() {
            return Math.floor(Math.random() * 90) + 1; // 1~90
        }

        static decideDirection(degree) {
            return {
                x: Math.cos(Math.PI / 180 * degree),
                y: Math.sin(Math.PI / 180 * degree)
            };
        }
    };
})();

/* unused harmony default export */ var _unused_webpack_default_export = (PingPongMath);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Me__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Computer__ = __webpack_require__(4);




__WEBPACK_IMPORTED_MODULE_0__Common__["a" /* Common */].init();
__WEBPACK_IMPORTED_MODULE_0__Common__["a" /* Common */].deliverBall();

/***/ })
/******/ ]);