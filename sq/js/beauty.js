(function(win,$){
    // 配置fullpage
    $('#dowebok').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5','page6'],
        menu: '#side-nav',
        sectionSelector:'.section',
        easingcss3: "cubic-bezier(0.618, -0.384, 0.618, 1.384)",
        scrollingSpeed: 618,
        afterRender: function(){
            $(".section.active").addClass("on");
        },
        onLeave: function(index,nextindex,direction){
            $(".section").eq(index-1).removeClass("on");
        },
        afterLoad: function (anchorLink ,index) {
            $(".section").eq(index-1).addClass("on");
        }
    });
}(this,jQuery));

(function(win, $) {
    //楼层导航
    // $('#side-nav').onePageNav();

    // TAB切换,依赖于tabview.js组件
    $(".tab-view").each(function(index, el) {
        new TabView2({
            dom: el,
            activeCls: 'current',
            triggerEvent: 'mouseover'
        });
    });
}(this, jQuery));

(function(win, $) {
    jQuery(".wb-loop").slide({ mainCell: ".wb-loop-items", effect: "leftLoop", autoPlay: true, vis: 5 ,scroll:1});
    
}(this, jQuery));

(function(win, $) {
    // 鼠标移进区域
    $('area').mouseenter(function(event) { //鼠标在元素内移动事件mousemove
        var regionName = $(this).attr('data-region'); //获取当前悬停的地名
        $('.ewb-region-name').removeClass('hover').filter("#" + regionName).addClass('hover'); //改变文字颜色和圆点颜色
        $(".ewb-map-p").addClass('hidden').filter('[data-id="' + regionName + '"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover').filter('[data-role="' + regionName + '"]').addClass('ewb-hover');
    });
	
	// 鼠标移出区域
    $('area').mouseout(function(event) {
        $('.ewb-region-name').removeClass('hover');
        $(".ewb-map-p").addClass('hidden').filter('[data-id="center-city"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover');
    });

    // 鼠标移出地图上的文字
    $('.ewb-region-name').mouseout(function (event) {
        var myid = $(this).attr('id');
        $('.ewb-region-name').removeClass('hover');
        $(".ewb-map-p").addClass('hidden').filter('[data-id="center-city"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover');
    });

    // 鼠标移进地图上的文字

    $('.ewb-region-name').mouseenter(function(event) {
        var myid = $(this).attr('id');
        $('.ewb-region-name').removeClass('hover').filter("#" + myid).addClass('hover'); //改变文字颜色和圆点颜色
        $(".ewb-map-p").addClass('hidden').filter('[data-id="' + myid + '"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover').filter('[data-role="' + myid + '"]').addClass('ewb-hover');
    });
    // 鼠标移进文字
    $('.ewb-intro-item a').mouseenter(function(event) {
        /* Act on the event */
        var rolename = $(this).attr('data-role');
        $(".ewb-region-name").removeClass('hover').filter('#' + rolename).addClass('hover'); //改变文字颜色和圆点颜色
        $(".ewb-map-p").addClass('hidden').filter('[data-id="' + rolename + '"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover').filter('[data-role="' + rolename + '"]').addClass('ewb-hover');
    });

	// 鼠标移出文字
    $('.ewb-intro-item a').mouseout(function(event) {
        /* Act on the event */
        $('.ewb-region-name').removeClass('hover');
        $(".ewb-map-p").addClass('hidden').filter('[data-id="center-city"]').removeClass('hidden');
        $(".ewb-intro-item a").removeClass('ewb-hover');
    });


    // 全城旅游
    // 中间图片的marginLeft值让其居中
    var $mid2 = $('.ewb-tour-mod.ewb-spc'); //中间元素
    var midwidth2 = $mid2.width();
    $('.ewb-tour-mod.ewb-spc').css({
        marginLeft: -midwidth2 / 2
    });
    // 当窗口宽度变化一直让中间图片居中
    $(window).resize(function(event) {
        var $mid2 = $('.ewb-tour-mod.ewb-spc'); //中间元素
        var midwidth2 = $mid2.width();
        $('.ewb-tour-mod.ewb-spc').css({
            marginLeft: -midwidth2 / 2
        });
    });

    $('.ewb-tour-mod').click(function(event) {
        var flag3 = $(this).hasClass('ewb-success');
        if (flag3) {
            var $mid = $('.ewb-tour-mod.ewb-spc'); //中间元素
            var flag = $(this).hasClass('ewb-spc');
            var midleft = $mid.css('left');
            var midtop = $mid.css('top');
            var midwidth = $mid.width();
            var midheight = $mid.height();
            var midmarginleft = $mid.css('marginLeft');
            var midzindex = $mid.css('z-index');
            var myleft, //当前点击元素的left值
                mytop, //当前点击元素的top值
                myzindex, //当前点击元素的zindex值
                mywidth,
                myheight;
            if (!flag) {
                $('.ewb-tour-mod').removeClass('ewb-success');
                myleft = $(this).css('left');
                mytop = $(this).css('top');
                mywidth = $(this).width();
                myheight = $(this).height();
                mymarginleft = $(this).css('marginLeft');
                myzindex = $(this).css('z-index');
                $mid.css({
                    "z-index": myzindex
                });
                $(this).css({
                    "z-index": midzindex
                });
                $mid.animate({ left: myleft, top: mytop, width: mywidth, height: myheight, marginLeft: mymarginleft }, 1000);
                $(this).animate({ left: midleft, top: midtop, width: midwidth, height: midheight, marginLeft: midmarginleft }, 1000, function() {
                    $('.ewb-tour-mod').removeClass('ewb-spc').filter(this).addClass('ewb-spc');
                    $('.ewb-tour-mod').addClass('ewb-success');
                });
            };
        };
    });
}(this, jQuery));


