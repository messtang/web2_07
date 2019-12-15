function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var notice = document.getElementById('notice');
var slider = document.getElementById('slider');
var slide = document.getElementById('slide');
var onNavlist = document.getElementById('nav').children;
var left = document.getElementById('left');
var right = document.getElementById('right');
var timer;
var index = 1;
/*通知滚动效果*/
lii.style.left = "950px";
function rolling(){
	if(lii.style.left=="-500px"){
		lii.style.left = "950px";
	}else{
		lii.style.left = parseInt(lii.style.left)- 5 +"px";
	}
}
var roll = setInterval(rolling, 50);

/*图片轮播函数*/
/*下一张图片*/
function next(){
	changeNav();
	animate(slider,{left:-1200*index},function(){
		if(index==6){
			slider.style.left = '-1200px';
			index=1;
		}
		index++;
	});
}
/*上一张图片*/
function pre(){
	changeNav();
	animate(slider,{left:-1200*index},function(){
		if(index==0){
			slider.style.left = '-6000px';
			index = 5;
		}
		index--;
	});
}
timer=setInterval(next(),3000);

/*鼠标相关函数*/
/*鼠标划入清除定时器并且出现左右箭头*/
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
/*鼠标划出重新计时并且左右箭头消失*/
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
left.onclick = pre;
right.onclick = next;

/*选择对应图片播放*/
function changeNav(){
	for(var i =0;i<onNavlist.length;++i){
		onNavlist[i].className = '';
		if(index!=0&&index!=6){
			onNavlist[index-1].className = "active";
		}else if(index==0){
			onNavlist[4].className = "active";
		}else if(index==6){
			onNavlist[0].className = "active";
		}
	}
	for(var i = 0;i<onNavlist.length;++i){
		onNavlist[i].index = i;
		onNavlist[i].onclick =  function(){
			index = this.index+1;
			for(var i =0;i<onNavlist.length;++i){
				onNavlist[i].className = '';
				if(index!=0&&index!=6){
					onNavlist[index-1].className = "active";
				}else if(index==0){
					onNavlist[4].className = "active";
				}else if(index==6){
					onNavlist[0].className = "active";
				}
			}
			animate(slider,{left:-1200*index});
		};
	}
}


