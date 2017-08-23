mui.init();
(function() {
	//滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	/*轮播点击前后切换*/
	var _ind = 0,
		slider1 = mui('.mui-slider-1'),
		_len = mui('.mui-slider-1 .mui-slider-item').length,
		mb = document.querySelector('.mui-icon-back'),
		mf = document.querySelector('.mui-icon-forward');
	mb.addEventListener('tap', function(event) {
		if(_ind==0)return;
		if(_ind==_len-1){
			base.removeClass(mf,"disabled");
		}
		_ind = --_ind<0?0:_ind;
	  	slider1.slider().gotoItem(_ind);
	  	if(_ind==0){
	  		base.addClass(this,"disabled");
	  	}
	});
	mf.addEventListener('tap', function(event) {
		if(_ind==_len-1)return;
		if(_ind==0){
			base.removeClass(mb,"disabled");
		}
		_ind = ++_ind>_len-1?_len-1:_ind;
	  	slider1.slider().gotoItem(_ind);
	  	if(_ind==_len-1){
	  		base.addClass(this,"disabled");
	  	}
	});
	document.querySelector('.mui-slider-1').addEventListener('slide', function(event) {
		var _ind2 = event.detail.slideNumber;
		
		if(_ind2 == 0){
			base.addClass(mb,"disabled");
		}
		if(_ind2 > 0 && base.hasClass(mb,"disabled")){
			base.removeClass(mb,"disabled");
		}
		if(_ind2 < _len-1 && base.hasClass(mf,"disabled")){
			base.removeClass(mf,"disabled");
		}
		if(_ind2 == _len-1){
			base.addClass(mf,"disabled");
		}
		
		
		_ind = _ind2;
	});
	
	//自动轮播
    mui('.mui-slider-2').slider({
  	    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-slider-3').slider({
  	    interval:4500//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-slider-4').slider({
  	    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
	
})(mui);