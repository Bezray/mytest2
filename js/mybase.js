$(document).ready(function() {

    ! function() {

        if (IsPC()) {

        } else {
            if ($("html").width() / $("html").height() < 1) {
                if ($("html").width() < 415 && $("html").height() < 737) {
                    $(".sdw-pc").remove();
                }
            } else {
                if ($("html").width() < 737 && $("html").height() < 415) {
                    $(".sdw-pc").remove();
                }
            }
        }
		
		
		fontResize();
		setHeight();
        $(window).resize(function() {
            fontResize();
			setHeight();
        });
		
        var fullFirst = true;
        myDetect();
        fullFirst = false;
        $(window).bind("scroll", myDetect);
		
			
        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "BlackBerry", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
		
		
        var old_w = 0;
        function fontResize() {

            var sdw_width = $("html").width();
            if (old_w == sdw_width) {
                return;
            }
            var w = sdw_width / 1920;
            var fs = sdw_width / 1920;
            var title = 60;
            var title3 = 39;
            var title30 = 30;
            var ctx = 20;
            var ps = 18;
            if (fs < 0.4 && sdw_width > 768) {
                fs = 0.4;
            }

            if (sdw_width < 769) {
                fs = sdw_width / 750;
                title = 40;
                title3 = 35;
                title30 = 30;
                ctx = 20;
                ps = 14;
                ctx = ctx * fs;
                title = title * fs;
                title3 = title3 * fs;
                title30 = title30 * fs;
            } else {
                ctx = ((ctx * fs) < 14 ? 14 : (ctx * fs));
                title = ((title * fs) < 25 ? 25 : (title * fs));
                title3 = ((title3 * fs) < 25 ? 25 : (title3 * fs));
                title30 = ((title30 * fs) < 18 ? 18 : (title30 * fs));
            }

            $(".sdw-container").css({
                "font-size": 30 * (sdw_width < 769 ? (sdw_width / 750) : w) + "px"
            });
            //    公共样式

            //    if (sdw_width > 1200) {
            //        fs = 1;
            //    }
            $(".title").css({
                "font-size": title + "px",
                "margin-bottom": 35 * w,
                "line-height": title * 1.3 + "px"
            });
            $(".title2").css({
                "font-size": title + "px",
                "margin-bottom": 30 * w,
                "line-height": title * 1.3 + "px"
            });
            $(".title3").css({
                "font-size": title3 + "px",
                "margin-bottom": 30 * w,
                "line-height": title3 * 1.3 + "px"
            });
            $(".title30").css({
                "font-size": title30 + "px"
            });
            $(".ps").css({
                "font-size": ps * fs + "px",
                "line-height": ps * 1.3 + "px"
            });
            $(".sup").css({
                "font-size": 14 * fs + "px"
            });
            $(".sup2").css({
                "font-size": 16 * fs + "px"
            });
            $(".ctx").css({
                "font-size": ctx + "px",
                "margin-bottom": 50 * w,
                "line-height": ctx * 1.4 + "px"
            });
            $(".btn").css({
                "font-size": 18 * fs + "px"
            });
            $(".line").css({
                "margin-bottom": 5 * w,
                "margin-top": 5 * w,
                "font-size": 45 * fs + "px"
            });
            //    $(".icons").css({"margin-bottom": 55 * w});

            //    $(".spec-css").each(function () {
            //        var _this = $(this);
            //        $(this).css("margin-bottom", _this.data("mb") * w + "px");
            //    });
        }


        function setHeight() {

            var i = 0;
            var width = $("#sdw-wrap").width();
            var arrCont = $(".sdw-container");

            for (i = 0; i < arrCont.length; i++) {
                if ($(arrCont[i]).width() === width) {
                    continue;
                }
                $(arrCont[i]).width(width);

            }
            $(".sdw-container").each(function() {
                var sf = $(this);
                sf.height(width * parseFloat(sf.data("ratio")));

            });

        }
		
		
        function myDetect() {
            $("div.sdw-container").each(function() {
                var thisDiv = $(this);
                // var thisDiv = $("div.sdw-container3");
                checkActive(thisDiv);
            });
            // fullFirst = false;
        }

        function boxanimate(aniObj, opaVal, topVal, spdVal, dlyVal) {
            setTimeout(function() {
                aniObj.stop().animate({
                    opacity: opaVal,
                    top: topVal
                }, {
                    speed: spdVal,
                    easing: "swing"
                });
            }, dlyVal);

        }

        function checkActive(thisDiv) {
            //var thisDiv = $("div.sdw-container3");
            var viewH = $(window).height();
            var topScroll = $(document).scrollTop();
            var thisTop = thisDiv.offset().top;
            var thisH = thisDiv.height();
            var disRate = 0.4;

            if ((thisTop + thisH) > (topScroll + viewH)) {
                if (thisTop < topScroll + viewH - disRate * thisH) {
                    if (!thisDiv.hasClass("active")) {
                        thisDiv.find(".sdw-animate.box").each(function() {
                            aniObj = $(this);

                            arrProp0 = aniObj.data("end").replace(",", ":").split(":");
                            arrProp = {};
                            for (var i = 0; i < arrProp0.length - 1; i = i + 2) {
                                arrProp[arrProp0[i]] = arrProp0[i + 1];
                            }
                            topVal = arrProp.top || "0px";
                            opaVal = arrProp.opacity || 1;
                            dlyVal = aniObj.data("delay").replace("s", "") * 1000 * 0.7;
                            spdVal = parseInt(aniObj.data("speed"));

                            boxanimate(aniObj, opaVal, topVal, spdVal, dlyVal);
                        });

                    }
                    thisDiv.addClass("active");

                } else {
                    if (fullFirst || thisDiv.hasClass("active")) {

                        thisDiv.find(".sdw-animate.box").each(function() {
                            aniObj = $(this);
                            arrProp0 = aniObj.data("start").replace(",", ":").split(":");
                            arrProp = {};
                            for (var i = 0; i < arrProp0.length - 1; i = i + 2) {
                                arrProp[arrProp0[i]] = arrProp0[i + 1];
                            }
                            topVal = arrProp.top || "0px";
                            opaVal = arrProp.opacity || 0.6;

                            boxanimate(aniObj, opaVal, topVal, 500, 0);
                        });
                    }
                    thisDiv.removeClass("active");

                }
            } else if (thisTop < topScroll) {
                if ((thisTop + thisH) > (topScroll + disRate * thisH)) {
                    if (!thisDiv.hasClass("active")) {
                        thisDiv.find(".sdw-animate.box").each(function() {
                            aniObj = $(this);

                            arrProp0 = aniObj.data("end").replace(",", ":").split(":");
                            arrProp = {};
                            for (var i = 0; i < arrProp0.length - 1; i = i + 2) {
                                arrProp[arrProp0[i]] = arrProp0[i + 1];
                            }
                            topVal = arrProp.top || "0px";
                            opaVal = arrProp.opacity || 1;
                            dlyVal = aniObj.data("delay").replace("s", "") * 1000 * 0.7;
                            spdVal = parseInt(aniObj.data("speed"));

                            boxanimate(aniObj, opaVal, topVal, spdVal, dlyVal);
                        });

                    }
                    thisDiv.addClass("active");
                } else {
                    if (fullFirst || thisDiv.hasClass("active")) {
                        thisDiv.find(".sdw-animate.box").each(function() {
                            aniObj = $(this);
                            arrProp0 = aniObj.data("start").replace(",", ":").split(":");
                            arrProp = {};
                            for (var i = 0; i < arrProp0.length - 1; i = i + 2) {
                                arrProp[arrProp0[i]] = arrProp0[i + 1];
                            }
                            topVal = arrProp.top || "0px";
                            opaVal = arrProp.opacity || 0.6;
                            boxanimate(aniObj, opaVal, topVal, 500, 0);
                        });
                    }
                    thisDiv.removeClass("active");

                }
            }
            // 双边均在可视化窗口内 略写

        }

    }();

});