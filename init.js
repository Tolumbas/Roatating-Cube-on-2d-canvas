$(document).ready( function(){
	window.canvasControl=(function(){
	
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
		var c=$('#canvas-id');
		var context= c.get(0).getContext('2d');
		var container= $(c).parent();
		var respondCanvas=function(e){ 
			c.attr('width', $(container).width() );
			c.attr('height', $(container).height() ); 

		}
		var init=function(){
			bindEvents();
			respondCanvas();
		}
		
		var bindEvents=function(){
			$(window).on("resize", respondCanvas);
			pubsub.on("canvasDestroy",destroy);
		}
		var destroy=function(){
			$(window).off("resize", respondCanvas);
			pubsub.off("canvasDestroy",destroy)
		}
		var getContext=function(){
			return context;
		}
		var getAnimationFrame=function(){
			return requestAnimationFrame;
		}
		var getCanvas=function(){
			return c;
		}
		init();
		
		return{
			getContext:getContext,
			requestAnimationFrame:getAnimationFrame,
			getCanvas:getCanvas,
			destroy:destroy
		}
	})()
	pubsub.emit("canvasReady");
}); 