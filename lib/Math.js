// clojure (time,duration)
const PingPongMath = ( () => {
    let time = 0;

    return class {
        static EaseInOut() {
            let t = +new Date;
            t = (time - t)/10000; // 밀리세컨드 단위 
            return t - (Math.sin(2*Math.PI*t )/2*Math.PI); // EaseInOut
        }
        static EaseIn() {
            let t = +new Date;
            t = (time - t)/1000; // 초 단위 
            return Math.pow(t,2); // EaseIn
        }
        static EaseOut() {
            let t = +new Date;
            t = (time - t)/1000; // 초 단위 
            return 1 - Math.pow( (1-t),2 );  // EaseOut
        }
        static startTime(t) {
            time = t ? t : +new Date;
        } 
        static getStartTime() {
            return time;
        }
        
        //////////////////////////////////////////////////////////////////////////////

        static isColiision(x1,x2,y1,y2,x3,x4,y3,y4) { 
            // AABB Alogorithm
            // x,x,y,y   , x,x,y,y
            // 좌,우,상,하   좌,우,상,하
            return (
                x2 > x3 &&
                x1 < x4 &&
                y2 > y3 &&
                y1 < y4 
            );
            /*
            return ballRight > ledge.left &&
                   ballLeft < ledge.right &&
                   ballBottom > ledge.top &&
                   ballTop < ledge.bottom
            */ 
        }

        static randomDegree() {
            return Math.floor(Math.random() * 90)+1; // 1~90
        }

        static decideDirection(degree) {
            return {
                x : Math.cos(Math.PI/180*degree),
                y : Math.sin(Math.PI/180*degree)
            }
        }
    }
})();


export default PingPongMath;

