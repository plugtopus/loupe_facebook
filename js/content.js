var mainDiv;

function active_zoomer() {
	zoom_active = false;
	mood = 0;
	var fb_zoom_ex = $('#fb-zoom-ex');
	if (fb_zoom_ex.length != 0) {
		fb_zoom_ex.remove();
	}
	if ($('#fbPhotoPageButtons').length != 0) {
		mood = 0;
		$('#fbPhotoPageButtons').prepend('<a class="_42ft _4jy0 likeButton _4jy3 _517h" href="#" role="button" id="fb-zoom-ex" style="float: right;margin-right: 8px;margin-top: 6px;">Увеличить</a>');
	} else {
		mood = 1;
		$('.fbPhotosPhotoActions').prepend('<a id="fb-zoom-ex" class="fbPhotosPhotoActionsTag tagButton" role="button">Увеличить</a>');
	}
	fb_zoom_ex = $('#fb-zoom-ex');
	fb_zoom_ex.click(function () {
		if (mood == 0) {
			var fphotoEl = $('.fbPhotoImage');
		} else {
			var fphotoEl = $('img.spotlight');
		}
		if (zoom_active) {
			if (mood == 0) {
				$(this).text("Zoom");
			} else {
				$(this).attr("style", "")
			}
			ddpowerzoomer.destroy();
		} else {
			if (!background_storage["showRate"]) {
				background_storage["rateCount"] = background_storage["rateCount"] || 0;
				background_storage["rateCount"]++;
				chrome.extension.sendMessage({
					action: "STbackground_storage",
					name: "rateCount",
					value: background_storage["rateCount"]
				});
				if (background_storage["rateCount"] >= 6) {
					makeMsg("Photo Zoomer For facebook", "Thanks for using Photo Zoomer For facebook.<br>If you like it please rate & share it.", [{
							type: 1,
							name: "Share",
							href: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/addibmjelefaholbfacfnekmojekodaf",
							click: function () {
								mainDiv.remove();
								fb_zoom_ex.click();
							}

						},
						{
							type: 1,
							name: "Rate",
							href: "https://chrome.google.com/webstore/detail/addibmjelefaholbfacfnekmojekodaf/reviews",
							click: function () {
								mainDiv.remove();
								fb_zoom_ex.click();
							}

						},
						{
							name: "Close",
							click: function () {
								mainDiv.remove();
								fb_zoom_ex.click();
							}
						}
					]);

					chrome.extension.sendMessage({
						action: "STbackground_storage",
						name: "showRate",
						value: "true"
					});
					background_storage["showRate"] = true;
					return false;
				}
			}
			if (mood == 0) {
				$(this).text("Unzoom");
			} else {
				$(this).attr("style", "background-color: rgba(255, 255, 255, .2);border-color: rgba(0, 0, 0, 0);-webkit-border-radius: 2px;opacity: 1;text-decoration: none;");
			}
			fphotoEl.addpowerzoom({
				magnifiersize: [250, 250],
				powerrange: [1.5, 10],
				defaultpower: 1.5
			});
		}
		zoom_active = !zoom_active;
		return false;
	});
	if (localStorage["first_0"]) {
		chrome.extension.sendMessage({
			action: "STbackground_storage",
			name: "first_0",
			value: "true"
		});
		background_storage["first_0"] = "true";
		delete localStorage["first_0"];
	}
	if (localStorage["first_1"]) {
		chrome.extension.sendMessage({
			action: "STbackground_storage",
			name: "first_1",
			value: "true"
		});
		background_storage["first_1"] = "true";
		delete localStorage["first_1"];
	}
	if (!background_storage["first_" + mood]) {
		chrome.extension.sendMessage({
			action: "STbackground_storage",
			name: "first_" + mood,
			value: "true"
		});
		var zoom_offset = fb_zoom_ex.offset();
		var imgurl = chrome.extension.getURL("../img/try.png");
		if (mood == 1) {
			imgurl = chrome.extension.getURL("../img/try2.png");
			$("#photos_snowlift").addClass("pagingActivated");
		}

		$("body").prepend("<img id='ext-zoom-try' src='" + imgurl + "' style='position: absolute; z-index:999999999; top:" + (zoom_offset.top - 154) + "px;left:" + (zoom_offset.left - 154) + "px' >");
		$("#ext-zoom-try").click(function () {
			$(this).fadeOut();
			fb_zoom_ex.click();
		});
		setTimeout('$("#ext-zoom-try").fadeOut();', 2500);
	}
}
$(".fzoom-ext-m").click(function () {
	$('#fb-zoom-ex').click();
	return false;
});

function makeMsg(title, msg, buttons) {
	if (mainDiv) {
		mainDiv.remove();
	}
	mainDiv = document.createElement("div");
	mainDiv.setAttribute("style", "margin: 0 auto 40px;z-index: 10000;position: fixed;left: -webkit-calc(50% - 200px);top: -webkit-calc(50% - 59px);width: 400px;");
	mainDiv.innerHTML = '<div style="border: 10px solid rgba(82, 82, 82, .7);-webkit-border-radius: 8px;">\
		<div style="background-color: #fff;">\
			<div>\
				<div style="padding:5px 10px;background-color: #6d84b4;border: 1px solid #3b5998;border-bottom: 0;color: #fff;font-size: 14px;font-weight: bold;">' + title + '</div>\
				<div style="padding:10px;border-color: #555;border-style: solid;border-width: 0 1px;">' + msg + '</div>\
				<div style="border-color: #555;border-style: solid;border-width: 0 1px;border-bottom-width: 1px;">\
					<style type="text/css">\
					._42gy {font-size: 13px;height: 23px;line-height: 23px;}._42fu, ._42gx:focus, ._42gx:hover {text-decoration: none !important;background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yG/r/5x8ZAH1D-Ql.png);background-repeat: no-repeat;background-size: auto;background-position: -352px -446px;background-color: #eee;border: 1px solid #999;border-bottom-color: #888;-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .1);}._42fu {-webkit-box-sizing: content-box;color: #333;font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif;font-size: 13px;font-weight: bold;height: 20px;line-height: 20px;padding: 0 6px;text-align: center;vertical-align: middle;}._42ft {cursor: pointer;display: inline-block;text-decoration: none;white-space: nowrap;}._42fu:active, ._42fu._42fs {background: #ddd;border-bottom-color: #999;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .2);}._42g- {background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yG/r/5x8ZAH1D-Ql.png);background-repeat: no-repeat;background-size: auto;background-position: -352px -495px;background-color: #5b74a8;border-color: #29447e #29447e #1a356e;color: #fff;}._42g-:active, ._42g-._42fs {background: #4f6aa3;border-bottom-color: #29447e;}._42gy {font-size: 13px;height: 23px;line-height: 23px;}\
					</style>\
					<div style="text-align: right;padding: 10px;background-color: #f2f2f2;border: 1px solid #ccc;border-bottom: none;border-left: none;border-right: none;" id="FBIAB"></div>\
				</div>\
			</div>\
		</div>\
	</div>';

	document.body.appendChild(mainDiv);
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var buttonEl = document.createElement("a");
		buttonEl.setAttribute("class", "_42ft _42fu _42gy");
		buttonEl.setAttribute("href", button.href || "#");
		buttonEl.setAttribute("target", "_blank");
		buttonEl.innerHTML = button.name;

		if (button.type == 1) {
			buttonEl.setAttribute("class", "_42ft _42fu _42gy _42g-");
		}
		if (button.click) {
			buttonEl.addEventListener("click", button.click, false);
		}
		document.getElementById("FBIAB").appendChild(buttonEl);
	}

}
chrome.extension.onMessage.addListener(function (req) {
	background_storage = req.background_storage;
	ddpowerzoomer.destroy();
	if (req.action = "activezoom") {
		setTimeout(active_zoomer, 300);
	}

});