
$(function(){

  $.fn.hhDrop = function(options){
    var options = jQuery.extend({
        preLoadSrc:"images/loading.gif"
    }, options || {}); 


    var defaults = {};

    return this.each(function(){

      //榛樿
      var options = $.extend(defaults,options);
      var $this = $(this);

      var $boxSearch = $this.find('.boxSearch');
      var $lineSearchbg = $this.nextAll().find('.lineSearchbg');

      

      //鍑哄彂鍩庡競  鍒拌揪鍩庡競
      $boxSearch.click(function(){
        var _this = $(this);
        //鐐瑰嚮鏈韩鏄剧ず闅愯棌
        if(_this.hasClass('boxSearchHover') ){
          _this.removeClass('boxSearchHover');
          _this.children('.btn_search').removeClass('btn_search_current');
          _this.parent().find('.search_form_suggest').hide();

        }else{
          _this.addClass('boxSearchHover');
          _this.children('.btn_search').addClass('btn_search_current');
          _this.parent().find('.search_form_suggest').show();
        }

        _this.next().find('.clr_after a').click(function(){
          
          _this.find('span.key_word b').text($(this).text());

        });


        _this.next().find('.search_city_result a').click(function(){
          
          _this.find('span.key_word b').text($(this).text());

        });

        //闃绘鍐掓场
        $(document).bind('click',function(event){
          if(!$(event.target).parent().hasClass('boxSearch' )  && !$(event.target).hasClass('boxSearch') && !$(event.target).parent().parent().hasClass('boxSearch') && !$(event.target).hasClass('input_city') ){
            _this.children('.btn_search').removeClass('btn_search_current');
            _this.removeClass('boxSearchHover');
            _this.parent().find('.search_form_suggest').hide();
          }
        });
        
      });
      

  });
    
} 

});