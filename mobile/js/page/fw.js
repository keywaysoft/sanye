mui.init();
(function($) {
	//滚动
	$('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	//选项卡
	$(".h-title-tab").on("tap","span:not(.active)",function(){
		base.removeClass(this.parentNode.querySelector(".active"),"active");
		base.addClass(this,"active");
		//切换
		base.removeClass(document.querySelector(this.getAttribute("data-target")).parentNode.querySelector(".active"),"active");
		base.addClass(document.querySelector(this.getAttribute("data-target")),"active");
	})
	//更多
	$(".tab-con").on("tap",".more",function(){
		$(".tab-con .active li").each(function(i,e){
			e.style.display = "block";
		})
		this.style.display = "none";
	})
	
})(mui);