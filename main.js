document.getElementById('start').style.display = 'none';
document.getElementById('level').style.display = 'none';

var cnv = document.getElementById('cnv');
var ctx = cnv.getContext('2d');
var cnv2 = document.getElementById('cnv2');
var ctx2 = cnv2.getContext('2d');

var burst = new Image();
burst.src = 'image/burst.png';

var Tanks = [];
var Bullets = [];
var Bursts = [];
var Spells = [];
var obstacle = [];
var roads = [];

var tick = 0;
function drawAnimation(){
    tick++;
    BF.ObstacleAndRoads();
    BF.cnvWidthHeight();
    ctx.clearRect(0,0,cnv.width,cnv.height);
    BF.drawxPTank();
    BF.draw();
    let randomNS = Math.floor(Math.random()*3000);
    if(randomNS == 0){
        let randomRoad = Math.floor(Math.random()*roads.length);
        newSpell(randomRoad);
    };
    usedSpells();
    for(let i = 0; i<Spells.length; i++){
        if(!Spells[i].used){
            BF.drawSpell(Spells[i].roadX,Spells[i].roadY,Spells[i].randM);
        }
        if(Spells[i].used && Spells[i].stage[1]){
            Spells.splice(i,1);
        }
    };
    for(let i = 0; i<Bullets.length; i++){
        Bullets[i].draw();
        Bullets[i].check();
    };
    for(let i = 0; i<Tanks.length; i++){
        if(Tanks[i].xP == 0){
            Tanks[i].xP = -1;
            Tanks[i].isDestroyed = true;
            Bursts.push({
                x : Tanks[i].X,
                y : Tanks[i].Y,
                size : Tanks[i].size,
                cntB : 0,
                stage : 1
            });
        };
    };
    drawBurst();
    for(let i = 0; i<Bursts.length; i++){
        if(Bursts[i].stage > 3){
            Bursts.splice(i,1);
        };
    };
    for(let i = 0; i<Bullets.length; i++){
        if(Bullets[i].disappear>3){
            Bullets.splice(i,1);
        };
    };
    for(let i = 0; i<Bullets.length; i++){
        if(Bullets[i].X<0 || Bullets[i].X>cnv.width || Bullets[i].Y<0 || Bullets[i].Y>cnv.height){
            Bullets.splice(i,1);
        };
    };
    for(let e = 0; e<Bullets.length; e++){
        for(let n = 0; n<Bullets.length; n++){
            if(Bullets[e].enB != Bullets[n].enB && !Bullets[e].disappear && !Bullets[n].disappear){
                if(Bullets[e].X-Bullets[n].X>=-4 && Bullets[e].X-Bullets[n].X<=4 && Bullets[e].Y-Bullets[n].Y>=-4 && Bullets[e].Y-Bullets[n].Y<=4){
                    Bullets[e].disappear = true;
                    Bullets[n].disappear = true;
                    Bullets[e].stage = 4;
                    Bullets[n].stage = 4;
                };
            };
        };
    };
    for(let i = Tanks.length-1; i>=0; i--){
        Tanks[i].draw();
    };
    if(lvl == 1){
        cn = 20;
    }else if(lvl == 2){
        cn = 30;
    }else if(lvl == 3){
        cn = 40;
    }else if(lvl == 4){
        cn = 50;
    }else if(lvl == 5){
        cn = 60;
    }
    if(tick % 500 == 0 && a){
        createEnemyTank();
    };
    enemyBullets();
    if(cntBullets > 0){
        cntBullets--;
    };
    for(let i = 0; i<Tanks.length; i++){
        Tanks[i].BattleField = BF;
    };
    for(let i = 0; i<Bullets.length; i++){
        Bullets[i].BattleField = BF;
    };
    checkVictoryandDefeat();
    obstacle = [];
    roads = [];
};

function checkVictoryandDefeat(){
    if(Tanks[0].isDestroyed && Bursts.length == 0){
        victoryAndDefeat(false);
        return;
    };
    let dstr = true;
    for(let i = 1; i<Tanks.length; i++){
        if(!Tanks[i].isDestroyed){
            dstr = false;
        };
    };
    if(dstr && cn == cntEnTank && Bursts.length == 0){
        victoryAndDefeat(true);
    };
};

var cntEnTank = 0;
var cn = 0;
function createEnemyTank(){
    if(cntEnTank < cn){
        cntEnTank++;
        let randomPos = 0;
        let t = null;
        let randomDir = 0;
        let randomColor = Math.floor(Math.random()*6)+1;
        if(lvl == 1){
            randomPos = Math.floor(Math.random()*4);
            if(randomPos == 0){
                t = new Tank(randomColor,0,1,BF);
                t.setPos(1,1);
            }else if(randomPos == 1){
                t = new Tank(randomColor,0,3,BF);
                t.setPos(12,1);
            }else if(randomPos == 2){
                randomDir = Math.floor(Math.random()*2)+1;
                t = new Tank(randomColor,0,randomDir,BF);
                t.setPos(1,3);
            }else if(randomPos == 3){
                randomDir = Math.floor(Math.random()*2)+2;
                t = new Tank(randomColor,0,randomDir,BF);
                t.setPos(12,3);
            };
        }else if(lvl == 2){
            randomPos = Math.floor(Math.random()*4);
            if(randomPos == 0){
                t = new Tank(randomColor,1,2,BF);
                t.setPos(1,1);
            }else if(randomPos == 1){
                t = new Tank(randomColor,1,2,BF);
                t.setPos(12,1);
            }else if(randomPos == 2){
                randomDir = Math.floor(Math.random()*2);
                t = new Tank(randomColor,1,randomDir,BF);
                t.setPos(1,4);
            }else if(randomPos == 3){
                randomDir = Math.floor(Math.random()*2)*3;
                t = new Tank(randomColor,1,randomDir,BF);
                t.setPos(12,4);
            };
        }
        t.P = 4;
        Tanks.push( t );
    };
};

function enemyBullets(){
    for(let i = 1; i<Tanks.length; i++){
        if(!Tanks[i].isDestroyed && Tanks[i].canShot){
            let n = 2000;
            let xEnTanks = BF.getCbyX(Tanks[i].X);
            let yEnTanks = BF.getRbyY(Tanks[i].Y);
            let xTank = BF.getCbyX(Tanks[0].X);
            let yTank = BF.getRbyY(Tanks[0].Y);
            let ch = false;
            if(Tanks[i].direction == 0){
                if(xEnTanks == xTank){
                    ch = true;
                    if(yEnTanks >= yTank){
                        for(let r = yTank; r<=yEnTanks; r++){
                            if(BF.level[r][xTank] > 0){
                                ch = false;
                            };
                        };
                    };
                };
            }else if(Tanks[i].direction == 1){
                if(yEnTanks == yTank){
                    ch = true;
                    if(xEnTanks <= xTank){
                        for(let c = xEnTanks; c<=xTank; c++){
                            if(BF.level[yTank][c] > 0){
                                ch = false;
                            };
                        };
                    };
                };
            }else if(Tanks[i].direction == 2){
                if(xEnTanks == xTank){
                    ch = true;
                    if(yEnTanks <= yTank){
                        for(let r = yEnTanks; r<=yTank; r++){
                            if(BF.level[r][xTank] > 0){
                                ch = false;
                            };
                        };
                    };
                };
            }else if(Tanks[i].direction == 3){
                if(yEnTanks == yTank){
                    ch = true;
                    if(xEnTanks >= xTank){
                        for(let c = xTank; c<=xEnTanks; c++){
                            if(BF.level[yTank][c] > 0){
                                ch = false;
                            };
                        };
                    };
                };
            };
            if(ch && !Tanks[0].isDestroyed && !Tanks[0].invisible){
                n = 250;
            };
            let randomBullets = Math.floor(Math.random()*n);
            if(randomBullets == 0){
                let bullet = new Bullet(Tanks[i].X+Tanks[i].size/2,Tanks[i].Y+Tanks[i].size/2,Tanks[i].direction,BF);
                Bullets.push( bullet );
            };
        };
    };
};

var cntBullets = 0;
function boom(){
    if(!Tanks[0].isDestroyed){
        if(cntBullets == 0){
            let bullet = new Bullet(Tanks[0].X+Tanks[0].size/2,Tanks[0].Y+Tanks[0].size/2,Tanks[0].direction,BF);
            bullet.enB = false;
            Bullets.push( bullet );
            cntBullets = 100;
        };
    };
};

function newSpell(rR){
    Spells.push({
        roadX : roads[rR].x,
        roadY : roads[rR].y,
        randM : Math.floor(Math.random()*5)+1,
        used : false,
        stage : [0,false]
    });
};

function usedSpells(){
    for(let i = 0; i<Spells.length; i++){
        if(!Spells[i].used){
            if(Tanks[0].Y == Spells[i].roadY){
                if((Tanks[0].X > Spells[i].roadX && Tanks[0].X <Spells[i].roadX+BF.size) || (Tanks[0].X+Tanks[0].size > Spells[i].roadX && Tanks[0].X+Tanks[0].size < Spells[i].roadX+BF.size)){
                    Spells[i].used = true;
                };
            }else if(Tanks[0].X == Spells[i].roadX){
                if((Tanks[0].Y > Spells[i].roadY && Tanks[0].Y < Spells[i].roadY+BF.size) || (Tanks[0].Y+Tanks[0].size > Spells[i].roadY && Tanks[0].Y+Tanks[0].size < Spells[i].roadY+BF.size)){
                    Spells[i].used = true;
                };
            };
        };
        if(Spells[i].used){
            if(Spells[i].randM == 1){
                for(let e = 1; e < Tanks.length; e++){
                    if(!Tanks[e].isDestroyed){
                        if(Tanks[e].xP>0){
                            Tanks[e].xP--;
                        };
                    };
                };
                Spells[i].stage[1] = true;
            }else if(Spells[i].randM == 2){
                if(Tanks[0].xP < 7){
                    Tanks[0].xP++;
                };
                Spells[i].stage[1] = true;
            }else if(Spells[i].randM == 3){
                Spells[i].stage[0]++;
                Tanks[0].invisible = true;
                if(Spells[i].stage[0] == 1000){
                    Tanks[0].invisible = false;
                    Spells[i].stage[1] = true;
                };
            }else if(Spells[i].randM == 4){
                Spells[i].stage[0]++;
                Tanks[0].shield = true;
                if(Spells[i].stage[0] == 1000){
                    Tanks[0].shield = false;
                    Spells[i].stage[1] = true;
                };
            }else if(Spells[i].randM == 5){
                Spells[i].stage[0]++;
                for(let e = 1; e<Tanks.length; e++){
                    Tanks[e].speed = 0;
                    Tanks[e].canShot = false;
                };
                ctx.beginPath();
                ctx.fillStyle = 'rgba(0,0,255,0.1)';
                ctx.fillRect(0,0,cnv.width,cnv.height);
                if(Spells[i].stage[0] == 1000){
                    for(let e = 1; e<Tanks.length; e++){
                        Tanks[e].speed = 1;
                        Tanks[e].canShot = true;
                    };
                    Spells[i].stage[1] = true;
                }
            };
        };
    };
};

function drawBurst(){
    for(let i = 0; i<Bursts.length; i++){
        if(Bursts[i].stage>0){
            Bursts[i].cntB++;
            if(Bursts[i].cntB % 8 == 0){
                Bursts[i].stage++;
            };
        };
        if(Bursts[i].stage==1){
            ctx.drawImage(burst,0,0,32,32,Bursts[i].x,Bursts[i].y,Bursts[i].size,Bursts[i].size);
        }else if(Bursts[i].stage==2){
            ctx.drawImage(burst,32,0,32,32,Bursts[i].x,Bursts[i].y,Bursts[i].size,Bursts[i].size);
        }else if(Bursts[i].stage==3){
            ctx.drawImage(burst,64,0,32,32,Bursts[i].x,Bursts[i].y,Bursts[i].size,Bursts[i].size);
        };
    }
};
var interval = null;
var lvl = 0;
var keyMode = false;
var BF = null;

function victoryAndDefeat(v){
    if(v){
        if(lvl == 1){
            $('#b').removeClass('inaccessible').addClass('available');
        }else if(lvl == 2){
            $('#c').removeClass('inaccessible').addClass('available');
        }else if(lvl == 3){
            $('#d').removeClass('inaccessible').addClass('available');
        }else if(lvl == 4){
            $('#e').removeClass('inaccessible').addClass('available');
        }else if(lvl == 5){
        };
    };
    clearInterval(interval);
    Tanks = [];
    Bullets = [];
    Bursts = [];
    Spells = [];
    obstacle = [];
    roads = [];
    tick = 0;
    cntEnTank = 0;
    cn = 0;
    cntBullets = 0;
    interval = null;
    keyMode = false;
    BF = null;
    cnv.width = 0;
    cnv.height = 0;
    cnv2.width = 0;
    cnv2.height = 0;
    document.getElementById('level').style.display = 'inline-block';
};

function onclLvl(l){
    let chck = false;
    let T = null;
    let randP = 0;
    if(l == 1 && lvl >= 0){
        lvl = 1;
        BF = new BattleField(level1);
        T = new Tank(0,0,0,BF);
        randP = Math.floor(Math.random()*2);
        T.setPos(6+randP,6);
        T.xP = 5;
        chck = true;
    }else if(l == 2  && lvl >= 1){
        lvl = 2;
        BF = new BattleField(level2);
        randP = Math.floor(Math.random()*2);
        if(randP == 0){
            T = new Tank(0,1,1,BF);
            T.setPos(1,8);
        }else{
            T = new Tank(0,1,3,BF);
            T.setPos(12,8);
        };
        T.xP = 4;
        chck = true;
    }else if(l == 3  && lvl >= 2){
        lvl = 3;
        // BF = new BattleField(level3);
        // T = new Tank(0,2,d,BF);
        // T.setPos(c,r);
        // T.xP = 4;
        chck = true;
    }else if(l == 4  && lvl >= 3){
        lvl = 4;
        // BF = new BattleField(level4);
        // T = new Tank(0,3,d,BF);
        // T.setPos(c,r);
        // T.xP = 3;
        chck = true;
    }else if(l == 5  && lvl >= 4){
        lvl = 5;
        // BF = new BattleField(level5);
        // T = new Tank(0,3,d,BF);
        // T.setPos(c,r);
        // T.xP = 2;
        chck = true;
    };
    if(chck){
        T.P = 3;
        T.enT = false;
        Tanks.push( T );
        document.getElementById('level').style.display = 'none';
        document.getElementById('start').style.display = 'inline-block';
    };
};

function start(){
    document.getElementById('start').style.display = 'none';
    interval = setInterval(drawAnimation,1);
    keyMode = true;
};

window.onload = () =>{
    document.getElementById('level').style.display = 'inline-block';
};

function keyDown(){
    if(keyMode){
        switch(event.keyCode){
            case 87: Tanks[0].chDirection = 0; Tanks[0].chD[0] = 0; break;
            case 68: Tanks[0].chDirection = 1; Tanks[0].chD[0] = 1; break;
            case 83: Tanks[0].chDirection = 2; Tanks[0].chD[0] = 2; break;
            case 65: Tanks[0].chDirection = 3; Tanks[0].chD[0] = 3; break;
            case 32: boom(); break;
            case 90: Tanks[0].speed = 0;
        };
    };
};

function keyUp(){
    if(keyMode){
        switch(event.keyCode){
            case 90: Tanks[0].speed = 1; break;
        };
    };
};