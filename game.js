/*var tankA =new Image();
tankA.src='tankA.png';
var tankB =new Image();
tankB.src='tankB.png';*/
var radius=15;
var start = true;
var first =1;
var c=0;
var totalChance=20;
var bulletr= [5,10];
var velocity= [20,10];
var acc = 2;
var now; 
var bx,by,ff;
var firing = 0;
var points = [];
var i = 0 ;
var myVar;
var weapon = ['Normal','Heavy'];
var chanceA =document.getElementById('points1');
var chanceB =document.getElementById('points2');
var w ;
var wA = document.getElementById('btype1');
var wB = document.getElementById('btype2');
var paused = false;
ctx.font = '48px serif';
ctx.fillText('Click Any Button To Start', 500, 300);


//back.onload = function(){
function draw() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext("2d");
		ctx.globalCompositeOperation="source-over";
		//ctx.globalCompositeOperation="source-out";
		width = canvas.width;
		height = canvas.height;
		ctx.font = '48px serif';
		ctx.fillText('Click Any Button To Start', 250, 300);
		ctx.font = '24px serif';
		ctx.fillText('Click Restart to start the game with a new Terrain', 265, 360);
		ctx.fillText('Click Pause to pause the game and have a look at the controls', 220, 400);
	

		function terrain(width, height, displace, roughness) {
		    var power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));
		    points[0] = height / 4 + (Math.random() * displace * 2) - displace;
		   	points[power] = height / 4 + (Math.random() * displace * 2) - displace;
		    //displace *= roughness;
		    points[power/2]=((points[0]-points[power])/2)+((Math.random()*displace*2.5)-displace);

		    //Checking segments
		    for (var i = 2; i < power; i *= 2) {
		        for (var j = (power / i) / 2; j < power; j += power / i) {
		           	points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
		            points[j] += (Math.random() * displace * 2) - displace;
		        }
				displace *= roughness;
		    }
		    return points;
		}

			var terPoints = terrain(width, height, height / 4, 0.4);
			var grd=ctx.createLinearGradient(0,height,0,0);
			grd.addColorStop(0,"#000");
			grd.addColorStop(0.7,"#2F4F4F");
			grd.addColorStop(0.8,"#202020");
			ctx.fillStyle = grd;
			ctx.font = '48px serif';
			

		function drawterrain(){
			var back = new Image();
			back.onload = function() {
				
				//ctx.drawImage(back, 0, 0,1024,600);
				ctx.beginPath();
				ctx.moveTo(0, terPoints[0]);
				for (var t = 1; t < terPoints.length; t++) {
					//console.log(terPoints[t]);
					//if(terPoints[t]<canvas.height/3){
					//	ctx.lineTo(t,terPoints[t]+200);
					//}
					//else
					ctx.lineTo(t,terPoints[t]+250);
					    	
					}
			    ctx.lineTo(canvas.width, canvas.height);
				ctx.lineTo(0, canvas.height);
				ctx.fill();
				ctx.fillText('Player '+(c+1)+'\'s turn', 375, 40);
				
				ctx.font = '20px serif';
	     		ctx.fillStyle='#000';
	     		ctx.fillText('Moves Left :'+ current[c].steps, 450, 75);
	     		ctx.font = '48px serif';
	     		ctx.fillStyle = grd;

				
			};
				
			back.src='background.jpg';
		
		}
		/*var pscreen = document.getElementById('pause');
		pscreen.addEventListener("click",function(){
			    if(paused==false){
			        paused = true;
			        pscreen.innerHTML="RESUME";
			        }
			    else{
			        paused = false;
			        pscreen.innerHTML="PAUSE";
			        }
			});*/


		

		function tankprop(which){
		
			if(which==1){
				this.x=250;
				this.y=terPoints[250]+250;
				this.angle=Math.PI/4;
				}
			else {
				this.x=900;
				this.y=terPoints[900]+250;
				this.angle=3*Math.PI/4;
				}
				this.life = 6;
				this.chance =10;
				this.steps=50;
				this.w=0;

   			}
    		var tank1 = new tankprop(1);
			var tank2 = new tankprop(2);
			current=[tank1, tank2];

    	function healthbar(){

    	if(current[0].life!=0){
	    	for (var i = 0; i < current[0].life; i++) {
	      		ctx.fillStyle = 'rgb(' + Math.floor(255-30*i) + ', ' + Math.floor(255 - 42.5 *(5-i)) + ', 0)';
	            //ctx.translate((c+1)*400+50, 50);
	     		ctx.fillRect(150+i * 25, 25, 25, 25);
	     		ctx.strokeRect(150+i * 25, 25, 25, 25);
	     		ctx.font = '20px serif';
	     		ctx.fillStyle='#000';
	     		ctx.fillText('Player 1\'s health:', 4, 43);
	     		//ctx.fillText('Player 1\'s Chances left:'+tank1.chance, 4, 50);

	     	}
	     }
	     else{
	     	alert('Player 2 WINS !!!!');
	     	window.location.reload();

	     }
	     
     	if(current[1].life!=0){
     		for (var i = 0; i < current[1].life; i++) {
	      		ctx.fillStyle = 'rgb(' + Math.floor(255-30*i) + ', ' + Math.floor(255 - 42.5 * (5-i)) + ', 0)';
	            //ctx.translate((c+1)*400+50, 50);
	     		ctx.fillRect(850+i * 25, 25, 25, 25);
	     		ctx.strokeRect(850+i * 25, 25, 25, 25);
	     		ctx.font = '20px serif';
	     		ctx.fillStyle='#000';
	     		ctx.fillText('Player 2\'s health:', 705, 43);
	     		//ctx.fillText('Player 2\'s Chances left:'+tank2.chance, 705,50);
	     		ctx.font = '48px serif';
	     	}
	     }
	     else{
	     	alert('Player 1 WINS !!!!');
	     	window.location.reload();
	     }
     		

     		ctx.fillStyle = grd;
     		chanceA.innerHTML=tank1.chance;
     		chanceB.innerHTML=tank2.chance;
     		wA.innerHTML = weapon[tank1.w];
     		wB.innerHTML = weapon[tank2.w];

   		}


		
		function drawTanks(){
			ctx.beginPath();
			ctx.fillStyle='red';
			ctx.arc(tank1.x, tank1.y-radius, radius, 0, 2*Math.PI, true);
			ctx.fill();
			ctx.strokeStyle='white';
			ctx.lineWidth = 5;
		    ctx.lineCap = 'round';
		    ctx.beginPath();
		    ctx.moveTo(tank1.x, tank1.y-radius);
		    ctx.lineTo(tank1.x+(20*Math.cos(tank1.angle)), tank1.y-radius-(20*Math.sin(tank1.angle)));
		    ctx.stroke();
			
			ctx.beginPath();
			ctx.fillStyle='blue';
			ctx.arc(tank2.x, tank2.y-radius, radius, 0, 2*Math.PI, true);
			ctx.fill();
			ctx.strokeStyle='white';
			ctx.lineWidth = 5;
		    ctx.lineCap = 'round';
		    ctx.beginPath();
		    ctx.moveTo(tank2.x, tank2.y-radius);
		    ctx.lineTo(tank2.x+(20*Math.cos(tank2.angle)), tank2.y-radius-(20*Math.sin(tank2.angle)));
		    ctx.stroke();

			/*function pauseGame() {

				var but= document.getElementById('pause');
				if(pau){but.innerHTML ='RESUME';
					ctx.save();
					pau=0;
					ctx.fillStyle='rgba(255,255,255,0.5)';
					ctx.fillRect(0,0,width,height);
					ctx.fillStyle='black'
					ctx.fillText("GAME PAUSED!!!", 300, 250);
					ctx.restore();
					}
				else{
					but.innerHTML='PAUSE';
					pau=1;
					}
			
				}
			var pscreen = document.getElementById('pause');
			pscreen.addEventListener("click",function{
				if (!pau) {
					    //game = clearTimeout(game);
					    this.innerHTML='RESUME';
					    pau = 1;
					  } else if (pau) {
					    //game = setTimeout(gameLoop, 1000 / 30);
					    this.innerHTML='PAUSE';
					    pau = 0;
					  }

			}*/


		    ctx.fillStyle = grd;
		}
	
		
	
		document.addEventListener('keydown', function(event) {
			if(totalChance == 0){
				if(tank1.life>tank2.life){
					alert("Player 1 is the WINNER !!!");
				}
				else if(tank2.life>tank1.life){
					alert("Player 2 is the WINNER !!!");
				}
				else{
					alert("The Game is a DRAW");
				}
				window.location.reload();

			}
    		if(start == true && firing != 1 && !paused){
		        ctx.restore();
		        ctx.clearRect(0, 0, width, height);
		        drawterrain();
		        drawTanks();
		        healthbar();

		        if (event.keyCode == 87 ){
		        	if(c==0){
		             	current[c].angle+=Math.PI/90;
		        	}
		        	else{
		        		current[c].angle-=Math.PI/90;
		        	}
		        }
		        
		        else if(event.keyCode == 83 ){
		        	if(c==0){
						current[c].angle-=Math.PI/90; 
						}
					else{
						current[c].angle+=Math.PI/90; 
					}    
		        }
		       
		        else if(event.keyCode == 68 ){
		        	current[c].steps--;
		            current[c].x+=4;
		            if(current[c].x>canvas.width){
		            	alert('You can\'t move outside');
		            	current[c].x-=4;
		            	current[c].steps++;
		            	//current[c].life--;
		            }
		            current[c].y=terPoints[current[c].x]+250;
		            //console.log(current[c].x+','+terPoints[current[c].x]+','+current[c].y);
		            
		            if(current[c].steps==0){
		            	current[c].steps=50;
		            	c++;
		            	c%=2;
		            	totalChance-=1;
		            	current[c].chance--;
		            	//current[c].steps=10;
		                //ctx.fillText('Player '+(c+1)+'\'s turn', 350, 100);
		            }
		        }
		        else if(event.keyCode == 65){
		        	current[c].steps--;
		            current[c].x-=4;  
		            if(current[c].x<0){
		            	alert('You can\'t move outside');
		            	current[c].x+=4;
		            	current[c].steps++;
		            	//current[c].life--;
		            }
		            current[c].y=terPoints[current[c].x]+250;

		            if(current[c].steps==0){
		            	current[c].steps=50;
		            	c++ ;
		            	c%=2;
		            	totalChance-=1;
		            	current[c].chance--;
		            	//current[c].steps=10;
		            	//ctx.fillText('Player '+(c+1)+'\'s turn', 350, 100);
		            }
		        }
		        else if (event.keyCode == 32 ){
		        	if(current[c].w==0){
			        	if(velocity[0]<40){
			        		velocity[0]+=1;
			        	}
			        	/*ctx.globalCompositeOperation="destination-over";
			        	ctx.font = '20px serif';
		     			ctx.fillStyle='#ffffff';
		     			ctx.fillText('Power:'+velocity, 200, 400);
		     			ctx.fillStyle = grd;*/
			        	//console.log(velocity);
			        	var g = (velocity[0] - 20)/20;
			        	var radgrad = ctx.createRadialGradient(510, 125, 0, 510, 125, 25);
						 radgrad.addColorStop(0, '#FF0000');
						 radgrad.addColorStop(g, '#00cc00');
						 radgrad.addColorStop(1, 'rgba(255,255,255,0)');
						 ctx.fillStyle = radgrad;
						 ctx.fillRect(0,0,width,height);
						}
					else if(current[c].w==1){
						if(velocity[1]<20){
							velocity[1]+=1;
							}
						var g = (velocity[1] - 10)/10;
			        	var radgrad = ctx.createRadialGradient(510, 125, 0, 510, 125, 25);
						 radgrad.addColorStop(0, '#FF0000');
						 radgrad.addColorStop(g, '#00cc00');
						 radgrad.addColorStop(1, 'rgba(255,255,255,0)');
						 ctx.fillStyle = radgrad;
						 ctx.fillRect(0,0,width,height);
					}
  					 
  					 ctx.fillStyle = grd;
		        }
		        //else if(event.keyCode == 13){
		        //	startGame();
		        //}
		        else if(event.keyCode == 67){
		        	current[c].w=(current[c].w+1)%2;
		        }
     		}
		});
		document.addEventListener('keyup', function(event){
			 if (event.keyCode == 32 && firing != 1){
			 	//bulletr = bulletr[w];
			 	fire();
			 	totalChance--;
			 	current[c].chance--;
			 	firing = 1;
			 	now = new Date();
			 	ff=1;
			 	i=0;
			 	//c++;
	            //c=c%2;
	            //velocity= 10;
	        }
		
		});

		function drawBullet(){

			ctx.beginPath();
			ctx.arc(bx, by, bulletr[current[c].w], 0, Math.PI*2);
			ctx.fillStyle = "#000";
			ctx.fill();
			ctx.closePath();
			//bulletr+=0.002;
			ctx.fillStyle = grd;
		}
		function next(){
			c++;
		    c%=2;
		    i=1;
			ctx.clearRect(0, 0, width, height);
		    drawterrain();
		    drawTanks();
		    healthbar();
		    if(current[c].w==1){
		    	velocity[1]=10;
		    }
		    else{
		    	velocity[0]=20;
		    }
		    firing = 0;
		    clearInterval(myVar);

		}
	
		function fire() {
			if(!i){

			var rx=current[c].x+(20*Math.cos(current[c].angle));
			var ry=current[c].y-radius-(20*Math.sin(current[c].angle));
		    ctx.clearRect(0, 0, width, height);
		    drawterrain();
		    drawTanks();
		    healthbar();

			if(ff==1){
				ff=0;
				bx=rx;
				by=ry;
			}
			drawBullet();
			//console.log('fired at:'+ velocity);
			
			var time = (new Date() - now)/100;
			bx =rx + velocity[current[c].w]*Math.cos(current[c].angle)*time;
			by =ry - velocity[current[c].w]*Math.sin(current[c].angle)*time +0.5*acc*time*time;
			//collision detection
			bx=Math.floor(bx);
			by=Math.floor(by);
			//console.log(by+','+terPoints[bx]);
			if(by >= terPoints[bx]+250 && !i){
				 	
				firing = 0 ;
				 	//c++;
				 	//c=c%2;
				 	//console.log(c+1);
				 	if(bx >= current[(c+1)%2].x-50 && bx <= current[(c+1)%2].x+50){
				 		if(by <= current[(c+1)%2].y+50 && by >= current[(c+1)%2].y-50){
				 			current[(c+1)%2].life--;
				 			if(current[c].w==1){
				 				current[(c+1)%2].life--;
				 			}
				 			healthbar();
				 			next();
				 			//return 0;
				 			//clearInterval(myVar);
				 		}
				 	}
				 	else{
				 		if(current[c].w==0){
					 		for(var j=17,k=3;j>=0;j--,k+=1){
					 			terPoints[bx-j]=terPoints[bx-j]+k;
					 		}
					 		for(var j=17,k=3;j>0;j--,k+=1){
					 			terPoints[bx+j]=terPoints[bx+j]+k;
					 		}
					 	}
					 	else if(current[c].w==1){
					 		for(var j=25,k=5;j>=0;j--,k+=1.5){
					 			terPoints[bx-j]=terPoints[bx-j]+k;
					 		}
					 		for(var j=25,k=5;j>0;j--,k+=1.5){
					 			terPoints[bx+j]=terPoints[bx+j]+k;
					 		}


					 	}
				 		//terPoints[bx] = terPoints[bx]+10;
				 		next();
				 		//clearInterval(myVar);
				 		return 0;
				 	}
				}
				 
			else if(bx >= width || bx<=0 || by>= height || by<=0){
				next();
				//c++;
				//c%=2;
				}
				
			myVar = setInterval(fire, 10);

			}
		}
		//function startGame(){
		//	start = true;

		//}
}


	
	

