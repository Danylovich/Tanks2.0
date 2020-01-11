var tanks = new Image();
tanks.src = 'image/tanks.png';

function Tank(c,m,d,b){
    this.X = 0;
    this.Y = 0;
    this.size = 32;
    this.color = c;
    this.mode = m;
    this.direction = d; 
    this.BattleField = b;
    this.tankCadr = 0;
    this.tickCadr = 0;
    this.chDirection = -1;
    this.chD = [-1,0];
    this.speed = 1;
    this.P = 4;
    this.enT = true;
    this.isDestroyed = false;
    this.xP = 1;
    this.invisible = false;
    this.shield = false;
    this.canShot = true;
};

Tank.prototype.setXY = function (x,y){
    this.X = x;
    this.Y = y;
};

Tank.prototype.setPos = function (c,r){
    this.setXY(
        this.BattleField.getXbyC(c),
        this.BattleField.getYbyR(r)
    );
};

Tank.prototype.move = function (){
    if(tick%this.P == 0){
        if(!this.enT){
            let oldDirection = -1;
            let canMove = true;
            let ob = 0;
            if(this.chD[0] != -1){
                this.chD[1]++;
            }
            if(this.chD[1] == this.BattleField.size){
                this.chD[1] = 0;
                this.chD[0] = -1;
            }
            if(this.chDirection!=-1){
                oldDirection = this.direction;
                this.direction = this.chDirection;
                this.chDirection = -1;
            };
            let dir = this.direction;
            for(let f = 0; f<=1; f++){
                switch(this.direction){
                    case 0:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.Y-this.BattleField.size == obstacle[i].y && 
                            (this.X >= obstacle[i].x && 
                            this.X < obstacle[i].x+this.BattleField.size) ||
                            (this.X+this.BattleField.size > obstacle[i].x && 
                            this.X+this.BattleField.size < obstacle[i].x+this.BattleField.size)
                            ){
                                this.direction = 2;
                                ob++;
                                canMove = false;
                            };
                        };
                        if(canMove && f == 0){
                            this.Y-=this.speed; 
                        };
                    break;
                    case 1:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.X+this.BattleField.size == obstacle[i].x && 
                            (this.Y >= obstacle[i].y && 
                            this.Y < obstacle[i].y+this.BattleField.size) || 
                            (this.Y+this.BattleField.size > obstacle[i].y && 
                            this.Y+this.BattleField.size < obstacle[i].y+this.BattleField.size)
                            ){
                                this.direction = 3;
                                ob++;
                                canMove = false;
                            }
                        }
                        if(canMove && f == 0){
                            this.X+=this.speed; 
                        }
                    break;
                    case 2:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.Y+this.BattleField.size == obstacle[i].y && 
                            (this.X >= obstacle[i].x && 
                            this.X < obstacle[i].x+this.BattleField.size) || 
                            (this.X+this.BattleField.size > obstacle[i].x && 
                            this.X+this.BattleField.size < obstacle[i].x+this.BattleField.size)
                            ){
                                this.direction = 0;
                                ob++;
                                canMove = false;
                            }
                        }
                        if(canMove && f == 0){
                            this.Y+=this.speed; 
                        }
                    break;
                    case 3:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.X-this.BattleField.size == obstacle[i].x && 
                            (this.Y >= obstacle[i].y && 
                            this.Y < obstacle[i].y+this.BattleField.size) || 
                            (this.Y+this.BattleField.size > obstacle[i].y && 
                            this.Y+this.BattleField.size < obstacle[i].y+this.BattleField.size) 
                            ){
                                this.direction = 1;
                                ob++;
                                canMove = false;
                            }
                        }
                        if(canMove && f == 0){
                            this.X-=this.speed; 
                        }
                    break;
                };
            };
            let cM = true;
            if(this.chD[1]>0){
                switch(this.chD[0]){
                    case 0:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.Y-this.BattleField.size == obstacle[i].y && 
                            (this.X >= obstacle[i].x && 
                            this.X < obstacle[i].x+this.BattleField.size) ||
                            (this.X+this.BattleField.size > obstacle[i].x && 
                            this.X+this.BattleField.size < obstacle[i].x+this.BattleField.size)
                            ){
                                if(obstacle[i].m != 2){
                                    cM = false;
                                };
                            }
                        }
                    break;
                    case 1:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.X+this.BattleField.size == obstacle[i].x && 
                            (this.Y >= obstacle[i].y && 
                            this.Y < obstacle[i].y+this.BattleField.size) || 
                            (this.Y+this.BattleField.size > obstacle[i].y && 
                            this.Y+this.BattleField.size < obstacle[i].y+this.BattleField.size)
                            ){
                                if(obstacle[i].m != 2){
                                    cM = false;
                                };
                            }
                        }
                    break;
                    case 2:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.Y+this.BattleField.size == obstacle[i].y && 
                            (this.X >= obstacle[i].x && 
                            this.X < obstacle[i].x+this.BattleField.size) || 
                            (this.X+this.BattleField.size > obstacle[i].x && 
                            this.X+this.BattleField.size < obstacle[i].x+this.BattleField.size)
                            ){
                                if(obstacle[i].m != 2){
                                    cM = false;
                                };
                            }
                        }
                    break;
                    case 3:
                        for(let i = 0; i<obstacle.length; i++){
                            if(
                            this.X-this.BattleField.size == obstacle[i].x && 
                            (this.Y >= obstacle[i].y && 
                            this.Y < obstacle[i].y+this.BattleField.size) || 
                            (this.Y+this.BattleField.size > obstacle[i].y && 
                            this.Y+this.BattleField.size < obstacle[i].y+this.BattleField.size) 
                            ){
                                if(obstacle[i].m != 2){
                                    cM = false;
                                };
                            }
                        }
                    break;
                };
            };
            this.direction = dir;
            if(cM && this.chD[0] != -1){
                this.direction = this.chD[0];
                this.chD[0] = -1;
                this.chD[1] = 0;
            }
            if(ob>1 && oldDirection != -1){
                this.direction = oldDirection;
            };
            this.tickCadr++;
            if(this.tickCadr % 5 == 0 && this.speed!=0 && canMove){
                this.tankCadr++;
                if(this.tankCadr>1){
                    this.tankCadr = 0;
                };
            };
            canMove = true;
            ob = 0;
        }else{
            let crossing = [false,false,false,false,false,0];
            let randDir = 0;
            switch(this.direction){
                case 0:
                    this.Y-=this.speed;
                break;
                case 1:
                    this.X+=this.speed;
                break;
                case 2:
                    this.Y+=this.speed;
                break;
                case 3:
                    this.X-=this.speed;
                break;
            }
            this.tickCadr++;
            if(this.tickCadr % 5 == 0 && this.speed!=0){
                this.tankCadr++;
                if(this.tankCadr>1){
                    this.tankCadr = 0;
                };
            };
            if(this.X % this.BattleField.size == 0 && this.Y % this.BattleField.size == 0){
                for(let g = 0; g<roads.length; g++){
                    if(this.X == roads[g].x && this.Y-this.BattleField.size == roads[g].y){
                        crossing[0] = true;
                        crossing[5]++;
                    };
                    if(this.X+this.BattleField.size == roads[g].x && this.Y == roads[g].y){
                        crossing[1] = true;
                        crossing[5]++;
                    };
                    if(this.X == roads[g].x && this.Y+this.BattleField.size == roads[g].y){
                        crossing[2] = true;
                        crossing[5]++;
                    };
                    if(this.X-this.BattleField.size == roads[g].x && this.Y == roads[g].y){
                        crossing[3] = true;
                        crossing[5]++;
                    };
                };
                for(let s = 0; s<obstacle.length; s++){
                    if(
                    crossing[5]>0 || 
                    (this.direction == 0 && 
                    this.X == obstacle[s].x && 
                    this.Y-this.BattleField.size == obstacle[s]) || 
                    (this.direction == 1 &&
                    this.X+this.BattleField.size == obstacle[s].x &&
                    this.Y == obstacle[s].y) ||
                    (this.direction == 2 &&
                    this.X == obstacle[s].x &&
                    this.Y+this.BattleField.size == obstacle[s].y) ||
                    (this.direction == 3 &&
                    this.X-this.BattleField.size == obstacle[s].x &&
                    this.Y == obstacle[s].y)
                    ){
                        crossing[4] = true;
                    };
                };
                if(crossing[0] && crossing[2] && !crossing[1] && !crossing[3]){
                    crossing[4] = false;
                };
                if(crossing[1] && crossing[3] && !crossing[0] && !crossing[2]){
                    crossing[4] = false;
                };
                if(crossing[4]){
                    let randDir = Math.floor(Math.random()*crossing[5]+1);
                    let rH = 0;
                    for(let d = 0; d<crossing.length-2; d++){ //!!!!!!!
                        if(crossing[d]){
                            rH++;
                        }
                        if(randDir == rH && this.speed>0){
                            randDir = -1;
                            this.direction = d;
                        };
                    };
                };
            };
        };
    };
};

Tank.prototype.draw = function (){
    if(!this.isDestroyed){
        this.move();
        let cx = 128 * this.color + 32 * this.direction;
        let cy = 64 * this.mode + 32 * this.tankCadr;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(this.X,this.Y,this.size,this.size);
        if(!this.invisible){
            ctx.drawImage(tanks,cx,cy,32,32,this.X,this.Y,this.size,this.size);
        };
        if(this.shield){
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.X,this.Y,this.size,this.size);
            ctx.stroke();
        }
    };
};