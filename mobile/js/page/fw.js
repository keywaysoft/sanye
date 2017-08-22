mui.init();
(function() {
	//滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	//选项卡
	mui(".h-title-tab").on("tap","span:not(.active)",function(){
		$(this).addClass("active").siblings().removeClass("active");
		//切换
		$($(this).data("target")).addClass("active").siblings().removeClass("active");
	})
	//更多
	mui(".tab-con").on("tap",".more",function(){
		$(this).hide().siblings().show();
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
			$(".tab-con .nav-bm").eq(items[0].value).addClass("active").siblings().removeClass("active");
			
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	
})();