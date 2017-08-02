var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/300;
function background(){
    ctx.save();
   ctx.translate(r,r);
    ctx.beginPath();
    ctx.lineWidth=10*rem;
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI);
    ctx.stroke();
    var hournum=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font=23*rem+"px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    hournum.forEach(function(num,i){
       var rad=2*Math.PI/12*i;
        var x=Math.cos(rad)*(r-40*rem);
        var y=Math.sin(rad)*(r-40*rem);
        ctx.fillText(num,x,y);
    });
    for(var i= 0;i<60;i++){
        var rad=2*Math.PI/60*i;
        var x=Math.cos(rad)*(r-20*rem);
        var y=Math.sin(rad)*(r-20*rem);
        ctx.beginPath();
        if(i%5===0){
            ctx.fillStyle="#000";
            ctx.arc(x,y,2,0,2*Math.PI);
        }else{
            ctx.fillStyle="#ccc";
            ctx.arc(x,y,2,0,2*Math.PI);
        }
        ctx.fill();
    }
}
function drawhour(hour,minute){
    ctx.save();
    ctx.beginPath();
    var rad=2 * Math.PI / 12 * hour;
    var mrad=2*Math.PI/12/60*minute;
    ctx.rotate(rad+mrad);
    ctx.lineCap="round";
    ctx.lineWidth=6*rem;
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2+10*rem);
    ctx.stroke();
    ctx.restore();
}
function drawminute(minute,second){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*minute;
    var srad=2*Math.PI/60/60*second;
    ctx.rotate(rad+srad);
    ctx.lineCap="round";
    ctx.lineWidth=4*rem;
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2-20*rem);
    ctx.stroke();
    ctx.restore();
}
function drawsecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle="red";
    var rad=2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.moveTo(-5,20*rem);
    ctx.lineTo(2,20*rem);
    ctx.lineTo(1,-r+18*rem);
    ctx.lineTo(-1,-r+18*rem);
    ctx.fill();
    ctx.restore();
}
function drawdot(){
    ctx.beginPath();
    ctx.fillStyle="#fff";
    ctx.arc(0,0,3,0,2*Math.PI);
    ctx.fill();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    var now=new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    background();
    drawdot();
    drawhour(hour,minute);
    drawminute(minute,second);
    drawsecond(second);
    ctx.restore();
}
draw();
setInterval(draw,1000)