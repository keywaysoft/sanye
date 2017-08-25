/*功能封装库*/
var base = {
	//拖动选项卡
	slideFun:function(htmlArr,itemArr,slider){
		var itemHeight = itemArr[0].offsetHeight,
			len = itemArr.length;
		for(var i=1;i<len;i++){
			itemArr[i].style.height = itemHeight + "px";	
		}
		document.getElementById(slider).addEventListener('slide', function(e) {
			for(var i=1;i<len;i++){
				if (e.detail.slideNumber === i) {
					if (itemArr[i].querySelector('.mui-spinner')) {
						itemArr[i].innerHTML = htmlArr[i-1];
					}
				}
			}
		});
	},
	//点击选项卡
	muiSlideFun: function(target){
		mui(target).on("tap","span:not(.active)",function(){
			var _that = document.querySelector(this.getAttribute("data-target"));
			//本身
			base.tabFun(this);
			//切换
			base.tabFun(_that);
		});
	},
	tabFun: function(target){
		var _children = target.parentNode.children,
			_len = _children.length;
		for(var i=0;i<_len;i++){
			if(base.hasClass(_children[i],"active")){
				base.removeClass(_children[i],"active");
				continue;
			}
		}
		base.addClass(target,"active");
	},
	addClass: function(obj, cls){  
		var obj_class = obj.className;//获取 class 内容.  
		var blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.  
		var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.  
		obj.className = added;//替换原来的 class.  
	},
	hasClass: function(obj, cls){  
		var obj_class = obj.className;//获取 class 内容.  
		var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.  
		var x = 0;  
		for(x in obj_class_lst) {  
			if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls  
				return true;  
			}  
		}  
		return false;
	},
	removeClass: function(obj, cls){  
		var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc bcd' -> ' abc bcd '  
		obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc bcd ' -> ' abc bcd '  
		var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '  
		removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'  
		obj.className = removed;//替换原来的 class.  
	},
	toggleClass: function(obj,cls){  
	    if(base.hasClass(obj,cls)){  
	        base.removeClass(obj, cls);  
	    }else{  
	        base.addClass(obj, cls);  
	    }  
	},
	//图片在容器中实现background-size:cover的背景效果
	muiImgCenter: function(){
		var imgs = mui(".img img"),
			_len = imgs.length;
		for(var i=0;i<_len;i++){
			//如果图片还未加载完成
			if(imgs[i].offsetWidth == 1){
				imgs[i].onload=function(){
					calFun(this);
				}
			}else{
				calFun(imgs[i]);
			}
		}
		//计算函数封装
		function calFun(target){
			var _w = target.offsetWidth,
				_h = target.offsetHeight,
				_wp = target.parentNode.offsetWidth,
				_hp = target.parentNode.offsetHeight;
			//计算比例
			if(_wp/_hp > _w/_h){//如果容器的宽高比较大，则设置图片宽度为容器宽度
				target.style.width = _wp + "px";
				//调整图片位置
				target.style.marginTop = (_hp-_wp/_w*_h)/2 + "px";
			}else{//否则，则设置图片高度为容器高度
				target.style.height = _hp + "px";
				target.style.marginLeft = (_wp - _hp/_h*_w)/2 + "px";
			}
		}
	}
}

//通用事件处理
//页面跳转
mui('body').on('tap', 'a', function() {
	var _url = this.getAttribute("href");
	if(!_url || _url.indexOf('#')!='-1')return;
  	//打开关于页面
  	mui.openWindow({
    	url: _url
  	});
});

//图片懒加载
Echo.init({
	offset: 0,
	throttle: 0
});	

window.onload = function(){
	//图片居中
	if(mui(".img").length>0){
		base.muiImgCenter();
	}
}



