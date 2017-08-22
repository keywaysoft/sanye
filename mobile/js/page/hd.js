mui.init();
(function() {
	//滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	//选项卡-1
	var htmlArr = [],
		itemArr = [];
	htmlArr[0] = '<ul class="mui-table-view"><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州区花荄镇、桑枣镇将成为南开大学基层实践基地</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">廖雪梅率队督导安州区环境保护突出问题</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州召开集贸市场创文工作现场推进会</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">四川日报：安州“创文”小举动折射大文明</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州城西将建连江公园造价3.5亿元绿地率82.5%</p><span class="time">2017-08-15</span></a></li><li class="mui-table-view-cell"><a href="javascript:;"><p class="mui-ellipsis">安州区发放首批四川省工会会员服务卡</p><span class="time">2017-08-15</span></a></li></ul>';
	itemArr[0] = document.getElementById('item1');
	itemArr[1] = document.getElementById('item2')
	base.slideFun(htmlArr,itemArr,'slider');
	
})(mui);