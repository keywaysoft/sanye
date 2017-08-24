mui.init();
(function() {
	//滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	//选项卡
	//选项卡
	base.muiSlideFun(".h-title-tab");
	
	
	//更多
	mui(".tab-con").on("tap",".more",function(){
		var _children = this.parentNode.children,
			_len = _children.length;
		for(var i=0;i<_len;i++){
			_children[i].style.display = "block";
		}
		this.style.display = "none";
	})
	
	//下拉
	var userPicker = new mui.PopPicker();
	userPicker.setData([{
		value: '0',
		text: '区政府工作部门'
	}, {
		value: '1',
		text: '市管单位及其他'
	}, {
		value: '2',
		text: '区政府（管委会）'
	}]);
	var showUserPickerButton = document.getElementById('bmfw');
	var userResult = document.getElementById('result-bmfw');
	showUserPickerButton.addEventListener('tap', function(event) {
		userPicker.show(function(items) {
			userResult.innerText = items[0].text;
			base.tabFun(mui(".tab-con .nav-bm")[items[0].value]);
			
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	
})();