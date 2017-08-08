/* 	File:			indexJSRed.js
 *  Description: 	红模板首页脚本文件
 *  Company: 		keywaysoft.com
 *  Author:			Screen
 *  Created:		2013-08-19 14:20:50
 *  Vesion:			1.0
 */
 
 var currentNewsID = 0;
 var currnetButtyID = 0;
 var currentTabID = 0;
 var NewsTime;
 var NewsTime2 = true;

function newsSlider()
{
   if(NewsTime2 == true)
   {
        $(".slide-news .slide-tabs .tab").removeClass("current");
        $(".slide-news .slide-tabs .tab")[currentNewsID].className = "tab current";        
        $(".slide-news .slide-md").addClass("hide"); 
        $(".slide-news .slide-md")[currentNewsID].className = "slide-md"; 
        currentNewsID = (currentNewsID + 1) % 3;
   }
}

function newsTimerStart()
{
    NewsTime = setInterval(newsSlider,6000);
}

$(function(){
    newsTimerStart();
    $(".slide-news .slide-tabs .tab").mouseover(function(evt){
       currentNewsID = $(this).index();       
       NewsTime2 = true; 
       newsSlider();
       NewsTime2 = false;  
       setTimeout("NewsTime2=true;",6000);  
    });
 });

