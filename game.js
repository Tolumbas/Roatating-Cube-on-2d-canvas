var game=(function(){

	
	var canvas,context,animate;
	var camera={x:-20,y:-20,z:-20};

	var cube = [];
	var vtx = [];

	var lastmove;
	var rotateclick = false;

	var myPoints = [[50,-50,-50],[20,40,10],[0,0,10]];


	for (var x =0;x<=1;x++){
		for (var y =0;y<=1;y++){
			for (var z =0;z<=1;z++){
				vtx.push({x:x*100-50,y:y*100-50,z:z*100-50});
			}
		}
	}

	cube.push(["moveTo",vtx[0],vtx[0]]);

	cube.push(["lineTo",vtx[0],vtx[1]]);
	cube.push(["lineTo",vtx[1],vtx[3]]);
	cube.push(["lineTo",vtx[3],vtx[2]]);
	cube.push(["lineTo",vtx[2],vtx[0]]);

	cube.push(["moveTo",vtx[0],vtx[4]]);

	cube.push(["lineTo",vtx[4],vtx[5]]);
	cube.push(["lineTo",vtx[5],vtx[7]]);
	cube.push(["lineTo",vtx[7],vtx[6]]);
	cube.push(["lineTo",vtx[6],vtx[4]]);

	cube.push(["moveTo",vtx[4],vtx[0]]);
	cube.push(["lineTo",vtx[0],vtx[4]]);

	cube.push(["moveTo",vtx[4],vtx[1]]);
	cube.push(["lineTo",vtx[1],vtx[5]]);

	cube.push(["moveTo",vtx[5],vtx[2]]);
	cube.push(["lineTo",vtx[2],vtx[6]]);

	cube.push(["moveTo",vtx[6],vtx[3]]);
	cube.push(["lineTo",vtx[3],vtx[7]]);

/*	var dp1x = myPoints[0][0]-myPoints[1][0]; 
	var dp1y = myPoints[0][1]-myPoints[1][1]; 

	var dp2y = myPoints[0][1]-myPoints[2][1];
	var dp2z = myPoints[0][2]-myPoints[2][2];

	var angleXY = Math.atan2(dp1y,dp1x);
	var angleYZ = Math.atan2(dp2y,dp2z);

	vtx.forEach(function (vertex) {
		var out1 = rotate(vertex.x,vertex.y,angleXY);
		vertex.z = out1.x;
		vertex.x = out1.y;
		var out2 = rotate(vertex.z,vertex.y,angleYZ);
		vertex.z = out2.x;
		vertex.y = out2.y;
	})*/



	
	var init = function(){
		canvas = canvasControl.getCanvas();
		context = canvasControl.getContext();
		animate = canvasControl.requestAnimationFrame();

		canvas.w = canvas.width();
		canvas.h = canvas.height();

		bindEvents();
		//update();
		draw();
	}
	
	var bindEvents = function(){
		canvas.contextmenu(function(){return false;})
		canvas.on("mousedown", function(e) {	

			var parentOffset = $(this).parent().offset();
			var x =e.pageX - parentOffset.left;
			var y= e.pageY - parentOffset.top;

			if (e.button==2){
				rotateclick = true;
/*				firstClick.x = x;
				firstClick.y = y;*/
			}
		});
		canvas.mouseup(function (e) {
			if (e.button==2){
				if (!rotateclick)return;
				rotateclick =false;
				lastmove=false;
/*				rotation.x += currentRotation.x;
				rotation.y += currentRotation.y;
				currentRotation={x:0,y:0}*/
			}
		});
		canvas.mousemove(function (e) {
			var parentOffset = $(this).parent().offset();
			var x =e.pageX - parentOffset.left;
			var y= e.pageY - parentOffset.top;

			if(rotateclick){
				if (!lastmove){
					lastmove ={x:x,y:y};
				}
				var angle2 = (lastmove.y - y)/canvas.h*Math.PI;
				var angle1 = (lastmove.x - x)/canvas.w*Math.PI;

				vtx.forEach(function (vertex) {
					var out1 = rotate(vertex.z,vertex.x,angle1);
					vertex.z = out1.x;
					vertex.x = out1.y;
					var out2 = rotate(vertex.z,vertex.y,angle2);
					vertex.z = out2.x;
					vertex.y = out2.y;
				})
				myPoints.forEach(function (vertex) {
					var out1 = rotate(vertex[2],vertex[0],angle1);
					vertex[2] = out1.x;
					vertex[0] = out1.y;
					var out2 = rotate(vertex[2],vertex[1],angle2);
					vertex[2] = out2.x;
					vertex[1] = out2.y;
				})

				lastmove.x = x;
				lastmove.y = y;

			}
		})
	}
	function rotate(x,y,angle){
		var radius = Math.sqrt(x*x+y*y);
		var vertexangle = Math.atan2(y,x);
		var out = {};
		out.x = Math.cos(vertexangle + angle)*radius;
		out.y = Math.sin(vertexangle + angle)*radius;
		return out;
	}
	function calcord(vertex){

/*		var rotcoord = {
			x: 2*Math.PI*(rotation.x + currentRotation.x)/canvas.w,
			y: 2*Math.PI*(rotation.y + currentRotation.y)/canvas.h
		}
		if (currentRotation.x == 0){rotcoord.x=0;}
		if (currentRotation.y == 0){rotcoord.y=0;}

		*/
/*
		var radius1 = Math.sqrt(vertex.y*vertex.y+vertex.z*vertex.z);

		
		var angle1 = Math.atan2(vertex.z,vertex.y);
		
		var x = vertex.x;
		var y = Math.cos(angle1+rotcoord.y);
		var z = Math.sin(angle1+rotcoord.y); 

		y*=radius1;
		z*=radius1;

		var radius2 = Math.sqrt(x*x+z*z);
		var angle2 = Math.atan2(z,x);
		x = Math.cos(angle2+rotcoord.x);
		z = Math.sin(angle2+rotcoord.x);

		x*=radius2;
		z*=radius2;*/

		var fl = 100;
		var scale = fl/(fl+vertex.z);
		return {x:canvas.w/2+vertex.x*scale , y:canvas.h/2+vertex.y * scale}

	}
	function update() {

		setTimeout(update, 10);
	}

	function draw() {
		context.clearRect(0, 0, canvas.w, canvas.h);

		context.strokeStyle = "#FF0000";
	
		context.beginPath();
		context.moveTo(10,10);
		context.lineTo(0,0);
		myPoints.forEach(function (point) {
			var p = calcord({x:point[0],y:point[1],z:point[2]});
			context.moveTo(p.x,p.y);
			context.arc(p.x,p.y,100/(100+point[2])*10,0,2*Math.PI);
		});
		cube.forEach(function(e,index){
			//var v1 = calcord(e[1]);
			var v2 = calcord(e[2]);
			if (e[0] == "moveTo")context.moveTo(v2.x,v2.y);
			if (e[0] == "lineTo")context.lineTo(v2.x,v2.y);
		});
		context.stroke();
		
		animate(draw);
	}
	
	pubsub.on("canvasReady",init);
	
	
})()