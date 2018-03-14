var ddpowerzoomer = {
	dsetting: {
		defaultpower: 2,
		powerrange: [2, 7],
		magnifiersize: [75, 75]
	},
	mousewheelevt: /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel",
	$magnifier: {
		outer: null,
		inner: null,
		image: null
	},
	activeimage: null,
	movemagnifier: function (e, o, i) {
		if (ddpowerzoomer.activeExt && ddpowerzoomer.activeimage.info.coords) {
			var r = ddpowerzoomer.activeimage,
				t = r.info,
				n = t.coords,
				a = ddpowerzoomer.$magnifier,
				d = t.magdimensions,
				m = t.power.current,
				p = t.power.range,
				s = e.pageX - n.left,
				g = e.pageY - n.top;
			if (1 == o) e.pageX >= n.left && e.pageX <= n.right && e.pageY >= n.top && e.pageY <= n.bottom ? a.outer.css({
				left: e.pageX - d[0] / 2,
				top: e.pageY - d[1] / 2
			}) : (ddpowerzoomer.activeimage = null, a.outer.hide());
			else if (i) {
				var f = t.dimensions,
					u = "in" == i ? Math.min(m + .5, p[1]) : Math.max(m - .5, p[0]),
					l = [f[0] * u, f[1] * u];
				a.image.css({
					width: l[0],
					height: l[1]
				}), t.power.current = u
			}
			m = t.power.current;
			var w = -s * m + d[0] / 2,
				c = -g * m + d[1] / 2;
			a.inner.css({
				left: w,
				top: c
			})
		} else ddpowerzoomer.$magnifier.outer.hide()
	},
	setupimage: function (e, o, i) {
		var r = jQuery.extend({}, ddpowerzoomer.dsetting, i),
			t = e(o);
		ddpowerzoomer.activeExt = !0, o.info = {
			power: {
				current: r.defaultpower,
				range: r.powerrange
			},
			magdimensions: r.magnifiersize,
			dimensions: [t.width(), t.height()],
			coords: null
		}, t.unbind("mouseenter").mouseenter(function (e) {
			if (ddpowerzoomer.activeExt) {
				var n = ddpowerzoomer.$magnifier;
				n.outer.css({
					width: r.magnifiersize[0],
					height: r.magnifiersize[1]
				});
				var a = t.offset(),
					d = o.info.power.current;
				n.inner.html('<img src="' + i.largeimagesrc + '"/>'), n.image = n.outer.find("img:first").css({
					width: o.info.dimensions[0] * d,
					height: o.info.dimensions[1] * d
				});
				var m = {
					left: a.left,
					top: a.top,
					right: a.left + o.info.dimensions[0],
					bottom: a.top + o.info.dimensions[1]
				};
				o.info.coords = m, n.outer.show(), ddpowerzoomer.activeimage = o
			}
		})
	},
	destroy: function () {
		ddpowerzoomer.activeExt = !1, $(".fzoom-ext-m").hide()
	},
	init: function (e) {
		var o = e('<div class="fzoom-ext-m" />').append('<div style="position:relative;left:0;top:0;" />').append('<div style="position: absolute;top: 2px;left: 2px;height: 246px;width: 246px;-webkit-box-shadow: 0px 1px 5px #000, inset 0px 1px 20px rgba(255,255,255,0.5);z-index: 1;border-radius:125px;" />').appendTo(document.body);
		ddpowerzoomer.$magnifier = {
			outer: o,
			inner: o.find("div:eq(0)"),
			image: null
		}, o = ddpowerzoomer.$magnifier, e(document).unbind("mousemove.trackmagnifier").bind("mousemove.trackmagnifier", function (e) {
			ddpowerzoomer.activeimage && ddpowerzoomer.movemagnifier(e, !0)
		}), o.outer.bind(ddpowerzoomer.mousewheelevt, function (e) {
			if (ddpowerzoomer.activeimage) {
				e = e.originalEvent;
				var o = e.detail ? e.detail * -120 : e.wheelDelta;
				o <= -100 ? ddpowerzoomer.movemagnifier(e, !1, "out") : ddpowerzoomer.movemagnifier(e, !1, "in"), e.preventDefault()
			}
		})
	}
};
jQuery.fn.addpowerzoom = function (e) {
	var o = jQuery;
	return this.each(function () {
		if ("IMG" != this.tagName) return !0;
		"undefined" == typeof e && (e = {}), e.largeimage && e.largeimage.length > 0 && (e.preloadimg = new Image, e.preloadimg.src = e.largeimage);
		var i = o(this);
		e.largeimagesrc = e.preloadimg ? e.preloadimg.src : i.attr("src"), parseInt(this.style.width) > 0 && parseInt(this.style.height) > 0 ? ddpowerzoomer.setupimage(o, this, e) : this.complete ? ddpowerzoomer.setupimage(o, this, e) : i.bind("load", function () {
			ddpowerzoomer.setupimage(o, this, e)
		})
	})
}, ddpowerzoomer.init($);