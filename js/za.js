 (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);






//author:caibaojian
//website:http://caibaojian.com
//weibo:http:weibo.com/kujian
//兼容UC竖屏转横屏出现的BUG
//自定义设计稿的宽度：designWidth
//最大宽度:maxWidth
(function(designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var tid;
	var rootItem,rootStyle;
	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		if (!maxWidth) {
			maxWidth = 540;
		}
		if (width > maxWidth) {
			width = maxWidth;
		}
		var rem = width * 100 / designWidth;
		rootStyle="html{font-size:"+rem+'px !important}';
		rootItem = document.getElementById('rootsize') || document.createElement("style");
		if(!document.getElementById('rootsize')){
		document.getElementsByTagName("head")[0].appendChild(rootItem);
		rootItem.id='rootsize';
		}
		if(rootItem.styleSheet){
		rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
		}else{
		try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
		}
		docEl.style.fontSize = rem + "px";
	}
	refreshRem();
	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);
	if (doc.readyState == "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(750, 750);



URL: {
		//获取url中的参数,
		getRequest: function() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object();
			url = decodeURI(url);
			if(url.indexOf("?") != -1) {
				var str = url.substr(1);
				var strs = str.split("&");
				for(var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}
			return theRequest;
		},
		//获取url lang值，
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {return unescape(r[2]);}
			return null;
		}
	}


//检查一个对象是否为空的函数
function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }
function isNullObj(obj){ for(var i in obj){ if(obj.hasOwnProperty(i)){ return false; } } return true; }
