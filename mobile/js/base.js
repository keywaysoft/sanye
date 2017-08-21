/*功能封装库*/
var base = {
	//选项卡
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
	hasClass: function( elements,cName ){ 
		return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );  
	},
	addClass: function( elements,cName ){ 
		if( !base.hasClass( elements,cName ) ){ 
			elements.className += " " + cName; 
		}; 
	},
	removeClass: function( elements,cName ){ 
		if( base.hasClass( elements,cName ) ){ 
			elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );  
		}; 
	}
}

