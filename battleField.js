var grass = new Image();
grass.src = 'image/grass.png';
var wall = new Image();
wall.src = 'image/wall.png';
var water = new Image();
water.src = 'image/water.jpg';
var brick = new Image();
brick.src = 'image/brick.png';
var burstTanks = new Image();
burstTanks.src = 'image/burstTanks.png';
var heart = new Image();
heart.src = 'image/heart.png';
var invisibleTank = new Image();
invisibleTank.src = 'image/invisibleTank.png';
var shield = new Image();
shield.src = 'image/shield.png';
var timeStop = new Image();
timeStop.src = 'image/timeStop.png';

function BattleField(L){
    this.size = 32;
    this.level = L;
};

BattleField.prototype.getXbyC = function (c){
    return c*this.size;
};

BattleField.prototype.getYbyR = function (r){
    return r*this.size;
};
BattleField.prototype.getCbyX = function (x){
    return Math.floor(x/this.size);
};

BattleField.prototype.getRbyY = function (y){ 
    return Math.floor(y/this.size);
};

BattleField.prototype.drawWater = function (x,y){
    ctx.drawImage(water,x,y,this.size,this.size);
}

BattleField.prototype.drawGrass = function (x,y){
    ctx.drawImage(grass,x,y,this.size,this.size);
};

BattleField.prototype.drawWall = function (x,y){
    ctx.drawImage(wall,x,y,this.size,this.size);
};

BattleField.prototype.drawBrick = function (x,y){
    ctx.drawImage(brick,x,y,this.size,this.size);
};

BattleField.prototype.drawRoad = function (x,y){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    for(let r = 0; r<roads.length; r++){
        if(y-this.size == roads[r].y && x == roads[r].x){
            ctx.moveTo(x+this.size/2,y+this.size/2);
            ctx.lineTo(x+this.size/2,y);
        }
        if(y == roads[r].y && x+this.size == roads[r].x){
            ctx.moveTo(x+this.size/2,y+this.size/2);
            ctx.lineTo(x+this.size,y+this.size/2);
        }
        if(y+this.size == roads[r].y && x == roads[r].x){
            ctx.moveTo(x+this.size/2,y+this.size/2);
            ctx.lineTo(x+this.size/2,y+this.size);
        }
        if(y == roads[r].y && x-this.size == roads[r].x){
            ctx.moveTo(x+this.size/2,y+this.size/2);
            ctx.lineTo(x,y+this.size/2);
        }
    }
    ctx.fillStyle = 'grey';
    ctx.fillRect(x,y,this.size,this.size);
    ctx.stroke();
};

BattleField.prototype.draw = function (){
    for(let r = 0; r<this.level.length; r++){
        for(let c = 0; c<this.level[r].length; c++){
            let cx = c*this.size;          
            let cy = r*this.size;
            this.drawRoad(cx,cy);
            switch(this.level[r][c]){
                case 1: this.drawWall(cx,cy); break;
                case 2: this.drawBrick(cx,cy); break;
                case 3: this.drawGrass(cx,cy); break;
                case 4: this.drawWater(cx,cy); break;
            };
        };
    };    
};

BattleField.prototype.drawSpell = function (x,y,m)  {
    if(m == 1){
        ctx.drawImage(burstTanks,x,y,this.size,this.size);
    }else if(m == 2){
        ctx.drawImage(heart,x,y,this.size,this.size);
    }else if(m == 3){
        ctx.drawImage(invisibleTank,x,y,this.size,this.size);
    }else if(m == 4){
        ctx.drawImage(shield,x,y,this.size,this.size);
    }else if(m == 5){
        ctx.drawImage(timeStop,x,y,this.size,this.size);
    }
}

BattleField.prototype.ObstacleAndRoads = function (){
    for(let r = 0; r<this.level.length; r++){
        for(let c = 0; c<this.level[r].length; c++){
            if(this.level[r][c] > 0){
                obstacle.push({
                    x : this.size*c,
                    y : this.size*r,
                    m : this.level[r][c]
                });
            }else{
                roads.push({
                    x : this.size*c,
                    y : this.size*r
                });
            };
        };
    };
};

BattleField.prototype.cnvWidthHeight = function (){
    cnv.height = this.level.length*this.size;
    cnv.width = this.level[0].length*this.size;
    cnv2.width = this.level[0].length*this.size;
    cnv2.height = 32;
};

BattleField.prototype.drawxPTank = function (){
    ctx2.beginPath();
    ctx2.fillStyle = 'black';
    ctx2.font = this.size+"px Tahoma";
    ctx2.textAlign = "left";
    ctx2.textBaseline = "middle";
    ctx2.fillText("xP",0,cnv2.height/2);
    ctx2.fill();
    let dH = Tanks[0].xP;
    let s = 0;
    while(dH>0){
        ctx2.drawImage(heart,this.size+s*this.size,0,this.size,this.size);
        s++;
        dH--;
    };
};