mui.init();
(function() {
	//滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
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
	
	//选项卡-1
	var htmlArr = [],
		itemArr = [];
	htmlArr[0] = '<ul class="mui-table-view"><li class="mui-table-view-cell"><a href="javascript:;"><div class="mui-media-object mui-pull-left"><em>16</em><br><small>2017-08</small></div><div class="mui-media-body"><h3 class="mui-ellipsis">民政部就有序参与四川九寨沟地区抗震救灾工作作出了安排</h3><p class="mui-ellipsis-2 c-gray">根据《中华人民共和国土地管理法》、《中华人民共和国城市房地产管理条例》的规定，我们必须要</p><span class="detail">[详细]</span></div></a></li><li class="mui-table-view-cell"><a href="javascript:;"><div class="mui-media-object mui-pull-left"><em>16</em><br><small>2017-08</small></div><div class="mui-media-body"><h3 class="mui-ellipsis">民政部就有序参与四川九寨沟地区抗震救灾工作作出了安排</h3><p class="mui-ellipsis-2 c-gray">根据《中华人民共和国土地管理法》、《中华人民共和国城市房地产管理条例》的规定，我们必须要</p><span class="detail">[详细]</span></div></a></li><li class="mui-table-view-cell"><a href="javascript:;"><div class="mui-media-object mui-pull-left"><em>16</em><br><small>2017-08</small></div><div class="mui-media-body"><h3 class="mui-ellipsis">民政部就有序参与四川九寨沟地区抗震救灾工作作出了安排</h3><p class="mui-ellipsis-2 c-gray">根据《中华人民共和国土地管理法》、《中华人民共和国城市房地产管理条例》的规定，我们必须要</p><span class="detail">[详细]</span></div></a></li></ul>';
	itemArr[0] = document.getElementById('item1');
	itemArr[1] = document.getElementById('item2');
	base.slideFun(htmlArr,itemArr,'slider');
	
	//选项卡-2
	var htmlArr = [],
		itemArr = [];
	htmlArr[0] = '<ul class="mui-table-view"><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州区花荄镇、桑枣镇将成为南开大学基层实践基地</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">廖雪梅率队督导安州区环境保护突出问题</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州召开集贸市场创文工作现场推进会</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">四川日报：安州“创文”小举动折射大文明</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州城西将建连江公园造价3.5亿元绿地率82.5%</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州区发放首批四川省工会会员服务卡</p><span class="time">2017-08-15</span></a></li></ul>';
	itemArr[0] = document.getElementById('item2-1');
	itemArr[1] = document.getElementById('item2-2');
	base.slideFun(htmlArr,itemArr,'slider2');
	
})();