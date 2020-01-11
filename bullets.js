function Bullet(x,y,d,b){
    this.radius = 2;
    this.X = x;
    this.Y = y;
    this.BattleField = b;
    this.direction = d;
    this.enB = true;
    this.stage = 0;
    this.disappear = false;
    this.XBurst = 0;
    this.YBurst = 0;
    this.sizeBurst = 0;
    this.cntB = 0;
};

Bullet.prototype.check = function (){
    if(!this.enB){
        for(let i = 1; i<Tanks.length; i++){
            if(
            !this.disappear &&
            !Tanks[i].isDestroyed &&
            this.X > Tanks[i].X &&
            this.X < Tanks[i].X+Tanks[i].size && 
            this.Y > Tanks[i].Y &&
            this.Y < Tanks[i].Y+Tanks[i].size
            ){
                if(Tanks[i].xP>0){
                    Tanks[i].xP--;
                };
                this.disappear = true;
            };
        };
    }else{
        if(
        !this.disappear &&
        !Tanks[0].isDestroyed &&
        this.X > Tanks[0].X &&
        this.X < Tanks[0].X+Tanks[0].size && 
        this.Y > Tanks[0].Y &&
        this.Y < Tanks[0].Y+Tanks[0].size
        ){
            if(Tanks[0].xP>0 && !Tanks[0].shield && !Tanks[0].invisible){
                Tanks[0].xP--;
            };
            if(Tanks[0].shield){
                for(let i = 0; i<Spells.length; i++){
                    if(Spells[i].randM == 4){
                        if(Spells[i].stage[0] < 700){
                            Spells[i].stage[0]++;
                        }else if(Spells[i].stage[0] < 1000){
                            Spells[i].stage[0] = 999; 
                        };
                    };
                };
            };
            if(!Tanks[0].invisible || Tanks[0].shield){
                this.disappear = true;
            };
        };
    };
    for(let i = 0; i<obstacle.length; i++){
        if(obstacle[i].m == 1 || obstacle[i].m == 2){
            if(
            !this.disappear &&
            this.X > obstacle[i].x &&
            this.X < obstacle[i].x+this.BattleField.size && 
            this.Y > obstacle[i].y &&
            this.Y < obstacle[i].y+this.BattleField.size
            ){
                this.disappear = true;
                Bursts.push({
                    x : obstacle[i].x,
                    y : obstacle[i].y,
                    size : this.BattleField.size,
                    cntB : 0,
                    stage : 1
                });
                if(obstacle[i].m == 2){
                    BF.level[this.BattleField.getRbyY(obstacle[i].y)][this.BattleField.getCbyX(obstacle[i].x)] = 0; 
                }
            };
        };
    };
};

Bullet.prototype.move = function (){
    switch(this.direction){
        case 0: this.Y--; break;
        case 1: this.X++; break;
        case 2: this.Y++; break;
        case 3: this.X--; break;
    };
};

Bullet.prototype.draw = function (){
    if(!this.disappear){
        this.move();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.X,this.Y,this.radius,0,Math.PI*2,false);
        ctx.fill();
    }
};
