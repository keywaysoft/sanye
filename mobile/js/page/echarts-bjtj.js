(function(){
	/////走势图
	var myChart = echarts.init(document.getElementById("echarts_bjtj")),
		dataArr;
	//图表绘制之前动画
	myChart.showLoading();
	
	//模拟数据
	var _data = {
	    "code": 0,
	    "success": true,
	    "message": "成功",
	    "responsedata": [
	    	{
	    		"name":"本月",
	    		"value1":"202",
	    		"value2":"156",
	    		"value3":"144"
	    	},
	    	{
	    		"name":"全年",
	    		"value3":"1893"
	    	}
	    ]
	};
	//调用
	chartFun(_data);

	
	
	function chartFun(data) {
		//清空数据
		dataArr = {
			legendData: ['办件申请','办件受理','办件办结'],
			colorData: ['#97cd28','#fccd43','#fd6b0f'],
			yData:['本月', '全年'],
			seriesData: []
		};
	
		//注销图表
		echarts.dispose();
		//重新制定
		myChart = echarts.init(document.getElementById("echarts_bjtj"));
	
		//整理数据
		loadData(data);
		
		//图表插件
		var option = optionFun();
	
		//隐藏动画
		myChart.hideLoading();
		if(option && typeof option === "object") {
			myChart.setOption(option, true);
		}
		window.onresize = myChart.resize;
	}
	//数据加载
	function optionFun(){
		return {
			tooltip : {
		        show:false
		    },
		    grid: {
		        left: '3%',
		        right: '8%',
		        bottom: '3%',
		        containLabel: true
		    },
		    legend: {
		    	data: dataArr.legendData,
		    	top:20
		    },
		    yAxis : {
	            type : 'value'
	       	},
		    xAxis : {
	            type : 'category',
	            data : dataArr.yData
	       	},
	       	color: dataArr.colorData,
		    series : dataArr.seriesData
		};
	}
	function loadData(data) {
		//定义数组存放每个商品的信息
		var _d=[];
		_d[0]=[];
		_d[1]=[];
		_d[2]=[];
		for(var i = 0, len = data.responsedata.length; i<len; i++) {
			_d[0].push(data.responsedata[i].value1);
			_d[1].push(data.responsedata[i].value2);
			_d[2].push(data.responsedata[i].value3);
		}
		//存储值
		for(var i=0;i<3;i++){
			dataArr.seriesData.push({
				name:dataArr.legendData[i],
	            type:'bar',
	            barWidth: '25px',
	            itemStyle: {
	                normal: {
	                    label: {
	                        show: true,
	                        position: 'top',
	                        formatter: '{a}:{c}件'
	                    },
	                    shadowBlur: 80,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            data:_d[i]
			})
		}
	}
}())
