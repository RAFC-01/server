class Tile{
    constructor(x, y, size, imageName, type = 0){
        // type 0 = image
        // type 1 = color
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        if (type == 0) this.image = loadedImgs[imageName];
        else this.color = imageName;
        if (this.color == 'rgba(0, 0, 0, 0)'){
            console.log(this);
            let data = {
                type: 'triggerBox',
                x: x,
                y: y,
                width: this.size.x,
                height: this.size.y,
                name: 'collisionBox'
            }
            COLLISIONBOXES.push(data);
        }else{
            blocks.push(this);
        }
    }
    draw(){
        let pos = {
            x: this.x - CAMERA.offset.x,
            y: this.y - CAMERA.offset.y
        }
        if (this.type == 0){
            ctx.beginPath();
            ctx.drawImage(this.image, pos.x, pos.y, 50, 50);
            ctx.closePath();
        }else{
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.rect(pos.x, pos.y, this.size.x, this.size.y);
            ctx.fill();
            ctx.closePath();    
        }
    }
}
class Block extends Tile{
    constructor(x, y, size, color){
        super(x, y, size, color, 1);
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        console.log(this.color);
        if (this.color == 'rgba(0, 0, 0, 0)'){
            console.log('here')
        }
        blocks.push(this);
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x+CAMERA.offset.x, this.y+CAMERA.offset.y, this.size.x, this.size.y);
        ctx.fill();
        ctx.closePath();
    }
}
class killerBox{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.size = {
            x: width,
            y: height
        }
    }
    update(){
        let playerRect = getSolidRect(player);
        let stRect = getSolidRect(this);

        let collision = rectCollision(playerRect, stRect);

        if (collision){
            player.dealDmg(100);
        }
    }
    draw(){
        if (!editorMode) return;
        
    }
}