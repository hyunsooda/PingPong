const Node = ( () => {
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
            if(head === undefined) {
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
            if(stateCur === undefined) 
                stateCur = head;
            // 가비지컬렉터로 회수한다. ES6의 Weak를 쓰면 더 깔끔해질수있다.
            if(this.getNodeNum() === 0) {
                head = cur = stateCur = undefined;
                num = 0;
                return true;
            }
            if(stateCur.num === this.getNodeNum()-1) { // 노드가 맨 마지막이라면
                let before;
                cur = before = head;

                while(cur.next) {
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
    }
})();

export default Node;


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