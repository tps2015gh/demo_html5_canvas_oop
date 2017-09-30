
var cv = null ; 
var cvprop = null;
var ctx = null ; 
var aPeople = [] ;
var timerun_count =  0;
function draw1(){
	ctx.fillRect(10,10,100,10); 	
}

function People(id){
	this.id = id ; 
	var hi = 24 , wi = 100 ; 
	this.gdi  = { x : 200 , y : 100 + (id * hi) ,  hi: hi ,wi:wi, fillcolor :"yellow"};
	aPeople.push(this) ;
}
People.prototype.draw1 = function(){
	
	var gdi = this.gdi ; 

	// background 
	ctx.fillStyle=this.gdi.fillcolor;
	ctx.fillRect( gdi.x, gdi.y , gdi.wi, gdi.hi ); 
	
	var fonthi = 14 ; 
	var posfont_y = gdi.y + fonthi ; 
	ctx.font=  fonthi + "px Tahoma";
	ctx.fillStyle="blue";
	ctx.fillText( "user_id=" + this.id  + " ", gdi.x ,posfont_y , gdi.wi );

	// stroke 
	ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokeStyle="red";
		ctx.rect( gdi.x,  gdi.y,gdi.wi,gdi.hi);
		ctx.stroke();
}
People.prototype.center = function(){
	var gdi = this.gdi ; 
	return {x : gdi.x + (gdi.wi/ 2) , y : gdi.y+ ( gdi.hi /2)  };
}
People.prototype.check_inrect= function(pos){
	if (this.gdi.x <= pos.x &&  pos.x <= this.gdi.x+ this.gdi.wi 
			&&  this.gdi.y <= pos.y &&  pos.y <= this.gdi.y+ this.gdi.hi  ){
		this.gdi.fillcolor = "lightgreen";
		return true ;
	} else{
		this.gdi.fillcolor = "yellow";
		return false ;
	}
}
People.draw1all = function(){
	ctx.clearRect(0, 0, cvprop.wi, cvprop.hi);	
	
		 for (i = 0 ; i <  aPeople.length -1 ; i ++){
		 	var pc1 = aPeople[i].center(); 
		 	var pc2 = aPeople[i+1].center();
		 	ctx.beginPath();
			ctx.lineWidth="5";
			ctx.strokeStyle="green"; // Green path
			//console.log(pc1.x + "," + pc1.y);
		 	ctx.moveTo(pc1.x,pc1.y);
		 	ctx.lineTo(pc2.x,pc2.y);	
		 	ctx.stroke();
		 }	
 	

	for (i = 0 ; i <  aPeople.length ; i ++){
		aPeople[i].draw1();
	}
}
People.randomItem = function(){
	var idx1 = Math.floor((Math.random() * aPeople.length) + 1);
	var idx0 = idx1 -1 ; 
	//console.log("randomitem index = " + idx0);
	return aPeople[idx0];
}
People.getRandomDiff = function(){
	var minnum = 1 ;
	var maxnum = 10;
	var ret  = Math.floor((Math.random() * maxnum) + 1);	
	return ret  ; 
}
People.getRandomDiff_Bidirection = function(){
	var num1toN  = People.getRandomDiff();
	var num1to2  = Math.floor((Math.random() * 2) + 1);	
	var sign =  (num1to2 == 1 ? -1 : 1 );
	return sign * num1toN;
}
People.loop = function(){

	//console.log(" clear wi,hi  = " + cvprop.wi + " , " + cvprop.hi );
	//ctx.clear(false);
	//aPeople[4].gdi.x +=10 ;
	var p = People.randomItem();
	p.gdi.x += People.getRandomDiff_Bidirection();
	p.gdi.y += People.getRandomDiff_Bidirection();

	//aPeople[4].draw1();
	People.draw1all(); 
}

function timerun (){
	timerun_count +=1 ;
	People.loop();
	
	ctx.fillText( "TimeRun="+ timerun_count ,400,400 );
	setTimeout(timerun, 20);
}


var register_listener = function(cv){
	cv.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(cv, evt);
        //console.log("mousePos="+ mousePos.x + "," + mousePos.y);
        var inpos = "idx: ";
        for(var i = 0 ; i< aPeople.length ; i++){
        	var is_inrect = aPeople[i].check_inrect(mousePos);
        	if(is_inrect) { inpos += " " + i ; }  
        }
        console.log( inpos );
      }, false);	
}
function getMousePos(cv, evt) {
var rect = cv.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

function onload(){

	cv =  document.getElementById("canvas1");
	register_listener(cv);
	cvprop  =  { wi : cv.width , hi : cv.height } ; 
	ctx = cv.getContext("2d");
	//ctx.save();
	for (i = 0 ; i <10 ; i ++){
		new People(i);
	}
	setTimeout(timerun, 1000);
}
