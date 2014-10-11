Ext.define('myschoolishness.view.RotatingCarousel', {	
extend: 'Ext.carousel.Carousel',
alternateClassName: 'Ext.RotatingCarousel',
alias: "widget.rotating-carousel",
xtype: 'rotating-carousel',
	config: {
		delay: 6000,
		start: true,
		items: [
												{
												    xtype: 'image',
												    src: 'images/sponsor_msg_new.png',
												    bodyPadding:'40',
												    mode:'image',
													itemId:'staff',
													style:'background-repeat:no-repeat;background:url(images/sponsor_back_fall.jpg)',
												},
												{
												    xtype: 'image',
												    src: 'images/sponsor_msg_new.png',
												    bodyPadding:'40',
												    mode:'image',
													itemId:'staff',
													style:'background:url(images/sponsor_back_tom.jpg)',
												},
												{
												    xtype: 'image',
												    src: 'images/sponsor_msg_new.png',
												    bodyPadding:'40',
												    mode:'image',
													itemId:'staff',
													style:'background:url(images/sponsor_back_window.jpg)',
												},
										        ],
		listeners: {
			tap: {
				fn: function() {
					this.pause();
				},
				element: 'element'
			},
			swipe: {
				fn: function() {
					this.start();
				},
				element: 'innerElement'
			}
		}
	},
	initialize: function() {
		if (this.config.start) {
			this.start();
		}
	},
	rotate: function() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		if (this.getActiveIndex() === this.getMaxItemIndex()) {
			this.setActiveItem(0, 'slide');
		}
		else {
			this.next();
		}
		this.timeout = Ext.defer(this.rotate, this.config.delay, this);
	},
	start: function(delayStart) {
		this.timeout = Ext.defer(this.rotate, delayStart || this.config.delay, this);
	},
	pause: function(delayStart) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		if (delayStart) {
			this.start(delayStart);
		}
		return this;
	},
	stop: function(delayStart) {
		this.pause(delayStart);
		this.setActiveItem(0, 'slide');
		return this;
	}
});