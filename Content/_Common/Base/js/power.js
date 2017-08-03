(function () {
    $(function () {
        //视频播放功能JS。
        $("video.edui-upload-video")
            .each(function () {
                var $this = $(this),
                    width = $this.attr('width'),
                    height = $this.attr('height'),
                    src = $this.prop('src'),
                    swfPath = "/Content/_Common/Base/swf/PowerPlayback.swf",
                    video = '<object type="application/x-shockwave-flash" name="powerPlayback" data="' +
                        swfPath +
                        '" width="' +
                        width +
                        '" height="' +
                        height +
                        '" id="powerPlayback" style="visibility: visible;">' +
                        '<param name="allowFullScreen" value="true">' +
                        '<param name="wmode" value="opaque">' +
                        '<param name="flashvars" value="src=' +
                        src +
                        '&amp;autoPlay=true&amp;title=2013&amp;breakPoint=46.4&amp;preroll=&amp;prerollSite=&amp;bannerImageUrl=&amp;bannerUrl=&amp;scaleMode=letterBox&amp;controlBarAutoHide=false&amp;streamType=liveOrRecorded&amp;javascriptCallbackFunction=onJavaScriptBridgeCreated">' +
                        '</object>';
                $this.replaceWith($(video));
            });
    });

    $(function () {
        var powerplaybacks = $("div[data-power-ui='powerplayback']");
        if (powerplaybacks.length > 0) {
            $.getScript('/Content/_Common/Assets/Scripts/swfobject.js')
                .done(function () {
                    powerplaybacks.each(function () {
                        var src = $(this).attr('data-url');
                        var title = $(this).attr('data-title');
                        var height = $(this).attr('data-height');
                        var width = $(this).attr('data-width');
                        var autoPlay = $(this).attr('data-autoPlay');
                        var random = parseInt(Math.random() * (99999 - 10000 + 1) + 10000);
                        var id = 'PowerPlay' + random;
                        $(this).attr('id', id);
                        var parameters =
                        {
                            src: src,
                            autoPlay: autoPlay,
                            title: title,
                            controlBarAutoHide: "false",
                            scaleMode: "liveOrRecorded"
                        };
                        swfobject.embedSWF("/Content/_Common/Base/swf/PowerPlayback.swf",
                            id,
                            width,
                            height,
                            "10.1.0",
                            {},
                            parameters,
                            { allowFullScreen: "true", wmode: "opaque" },
                            { name: "powerPlayback" }
                        );
                    });
                });
        }
    });

    $(function () {
        audiojs.events.ready(function () {
            var as = audiojs.createAll();
        });
    });

    //广告。
    $(function () {
        /**
         * 广告漂浮版位。
         */
        function advertisementFloat(floatPositions) {
            //var floatPositions = $("div[data-power-ui='advertisement_float']");
            floatPositions.each(function () {
                var width = $(this).data().width; //版位宽度
                var height = $(this).data().height; //版位高度

                //计算关闭按钮的位置
                var close = $(this).children(".close");
                switch ($(this).data().closeButtonPosition) {
                    case "UpperRight":
                        close.css("left", width - 20);
                        break;
                    case "LowerRight":
                        close.css("left", width - 20).css("top", height - 20);
                        break;
                    case "NoShow":
                        close.hide();
                        break;
                }

                //定时关闭版位
                var time = $(this).data().stopTime;
                if (time > 0) {
                    setTimeout(function () {
                            $(this).hide();
                        },
                        time * 1000);
                }
            });

            return floatPositions;
        }

        var floatPositionsInfo = $("div[data-power-ui='advertisement_float']");
        var floatPositions = advertisementFloat(floatPositionsInfo);
        floatPositions.each(function () {
            var floatPosition = $(this);
            //计算版位的坐标
            var ypos = positionCoordinate($(this));
            //广告随滚动条滚动
            if (floatPosition.data().enableScroll.toLowerCase() === "true") {
                floatPosition.css("top", $(this).scrollTop() + ypos);
                $(window)
                    .scroll(function () {
                        floatPosition.css("top", $(this).scrollTop() + ypos);
                    });
            }
        });

        //浏览器窗口大小改变时
        window.onresize = function () {
            var floatPositionsInfo = $("div[data-power-ui='advertisement_float']");
            var floatPositions = advertisementFloat(floatPositionsInfo);
            floatPositions.each(function () {
                var floatPosition = $(this);
                //计算版位的坐标
                var ypos = positionCoordinate($(this));
                //广告随滚动条滚动
                if (floatPosition.data().enableScroll.toLowerCase() === "true") {
                    $(window)
                        .scroll(function () {
                            floatPosition.css("top", $(this).scrollTop() + ypos);
                        });
                }
            });
        };

        //计算版位的坐标
        function positionCoordinate(floatPosition) {
            var xpos = 0;
            var ypos = 0;
            var width = floatPosition.data().width; //版位宽度
            var height = floatPosition.data().height; //版位高度
            var availWidth = document.documentElement.clientWidth; //浏览器窗口可见宽度
            var availHeight = document.documentElement.clientHeight; //浏览器窗口可见高度
            var verticalMargin = floatPosition.data().verticalMargin / 100;
            var horizontalMargin = floatPosition.data().horizontalMargin / 100;
            switch (floatPosition.data().datumMark) {
                case "UpperLeft":
                    xpos = availWidth * verticalMargin;
                    xpos = xpos === availWidth ? xpos - width : xpos;
                    ypos = availHeight * horizontalMargin;
                    ypos = ypos === availHeight ? ypos - height : ypos;
                    break;
                case "LowerRight":
                    xpos = (availWidth - width) - (availWidth * verticalMargin);
                    xpos = xpos < 0 ? 0 : xpos;
                    ypos = (availHeight - height) - (availHeight * horizontalMargin);
                    ypos = ypos < 0 ? 0 : ypos;
                    break;
                case "Middle":
                    var halfWidth = availWidth / 2;
                    var halfheight = availHeight / 2;
                    xpos = halfWidth + (halfWidth * verticalMargin);
                    xpos = xpos === availWidth ? xpos - width : xpos;
                    ypos = halfheight + (halfheight * horizontalMargin);
                    ypos = ypos === height ? ypos - height : ypos;
                    break;
            }
            floatPosition.css("z-index", 99).css("left", xpos);
            return ypos;
        }

        /**
         * 广告固定板块。
         */
        var fixedCount = 0,
            fixedLength = $("div[data-power-ui='advertisement_fixed']").find(".fixedPosition a").length;
        $("div[data-power-ui='advertisement_fixed']")
            .find(".fixedCount a")
            .click(function () {
                $(this).addClass("seld").siblings().removeClass("seld");
                var index = $(this).index();
                $("div[data-power-ui='advertisement_fixed']")
                    .find(".fixedPosition > a")
                    .eq(index)
                    .fadeIn(300)
                    .siblings()
                    .fadeOut(300);
            });

        function showAuto() {
            fixedCount = fixedCount >= (fixedLength - 1) ? 0 : ++fixedCount;
            $("div[data-power-ui='advertisement_fixed']").find(".fixedCount a").eq(fixedCount).trigger('click');
        }

        var fixedCountTime = setInterval(showAuto, 2000);
        $("div[data-power-ui='advertisement_fixed']")
            .hover(function () { clearInterval(fixedCountTime) },
                function () { fixedCountTime = setInterval(showAuto, 2000); });
    });

    // Ajax调用分部视图。
    $(function () {
        function getFunction(code, argNames) {
            var fn = window,
                parts = (code || "").split(".");

            while (fn && parts.length) {
                fn = fn[parts.shift()];
            }

            if (typeof (fn) === "function") {
                return fn;
            }

            argNames.push(code);
            return Function.constructor.apply(null, argNames);
        }

        function loadData($data, pageid) {
            var url = $data.ajaxUrl;
            if (pageid) {
                url = url + '?pageid=' + pageid;
            }
            $.ajax({
                url: url,
                type: $data.ajaxMethod,
                cache: !!$data.ajaxCache,
                data: {
                    partialViewName: $data.ajaxPartialViewName,
                    parameters: JSON.stringify($data.ajaxParameter)
                },
                beforeSend: function (xhr) {
                    getFunction($data.ajaxBegin, ["xhr"]).apply(null, arguments);
                },
                complete: function () {
                    getFunction($data.ajaxComplete, ["xhr", "status"]).apply(null, arguments);
                },
                success: function (response, status, xhr) {
                    var fn = window,
                        parts = ($data.ajaxSuccess || "").split(".");
                    while (fn && parts.length) {
                        fn = fn[parts.shift()];
                    }
                    if (typeof (fn) === "function") {
                        getFunction($data.ajaxSuccess, ["response", "status", "xhr"]).apply(null, arguments);
                    } else {
                        if (response.page) {
                            $data.ajaxDataCount = response.page.DataCount;
                            $data.ajaxPageIndex = response.page.PageIndex;
                            $data.ajaxPageSize = response.page.PageSize;
                            $data.ajaxPagingUrl = response.page.PagingUrl;
                        }

                        $('[data-ajax-data="' + $data.ajaxId + '"]')
                            .each(function () {
                                $(this).trigger('ajaxControlHandler', [response, $data]);
                            });

                        var mode = ($data.ajaxMode || "").toUpperCase();
                        $($data.ajaxUpdate)
                            .each(function (i, update) {
                                var top;
                                switch (mode) {
                                    case "BEFORE":
                                        top = update.firstChild;
                                        $("<div />")
                                            .html(response.html)
                                            .contents()
                                            .each(function () {
                                                update.insertBefore(this, top);
                                            });
                                        break;
                                    case "AFTER":
                                        $("<div />")
                                            .html(response.html)
                                            .contents()
                                            .each(function () {
                                                update.appendChild(this);
                                            });
                                        break;
                                    case "REPLACE-WITH":
                                        $(update).replaceWith(response.html);
                                        break;
                                    default:
                                        $(update).html(response.html);
                                        break;
                                }
                            });
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    getFunction($data.ajaxFailure, ["xhr", "status", "error"]).apply(null, arguments);
                }
            });
        }

        // ajaxpartial 初始化
        $('[data-ui-type="ajaxpartial"]')
            .each(function () {
                var $data = $(this).data();
                $data.ajaxLoadData = loadData;
                loadData($data);
            });

        // ajaxbutton 初始化
        function ajaxButtonControlHandler(response, $data) {
            $('[data-ajax-data="' + $data.ajaxId + '"]')
                .each(function () {
                    if (response.page.PageIndex >= response.page.PageCount) {
                        $(this).hide();
                    }
                });
        }

        $('[data-ui-type="ajaxbutton"]')
            .each(function () {
                var $this = $(this);

                function getData(element) {
                    var id = $(element).data().ajaxData;
                    var input = $('#' + id);
                    var $data = input.data();
                    var pageid = 1;
                    if ($data.ajaxPageIndex) {
                        pageid = $data.ajaxPageIndex + 1;
                    }
                    $data.ajaxLoadData($data, pageid);
                }

                $this.on('ajaxControlHandler',
                    function (event, response, $data) {
                        ajaxButtonControlHandler(response, $data);
                    });

                $this.on('click',
                    function () {
                        getData(this);
                    });
            });
    });
}());