$(function() {
	var page = 0,
		pageCount = $("section").length,
		height = $(window).height();

	var action = {
		init: function() {
			//初始化
			this.initPage();
			this.initEvent();
		},
		initEvent: function() {
			var that = this;
			$("body").on("swipeUp", that.up)
			$("body").on("swipeDown", that.down)
		},
		up: function() {
			if(page < pageCount - 1) {
				page++;
			} else {
				page = pageCount - 1;
			}
			$(".content").css("top", -page * height);
		},
		down: function() {
			if(page != 0) {
				page--;
			}
			$(".content").css("top", -page * height);
		},
		initPage: function() {
			var that = this;
			$("section").height(height);
			var footer = $("<div class='section-footer'></div>");
			footer.live("click",that.up);
			$("section").append(footer);
		}
	}

	action.init();

})