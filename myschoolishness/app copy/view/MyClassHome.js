Ext.define('myschoolishness.view.MyClassHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.class-home',
    xtype: 'class-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	tabBar: {
            docked: 'bottom',
            itemId: 'directoryTabBar',
            layout: {
                pack: 'center'
            },

        },
    	items:[ 
    	       	{
    	       	xtype: 'bulletin-board',
    	       	itemId: 'bulletinsClass',
    	       	id: 'bulletinsClass',
    	       	title:'Updates'
    	       	},
    	       	{
    	       	xtype: 'absence-rollcall',
    	       	itemId: 'classrollcall',
    	       	id: 'classrollcall',
    	       	title:'Roll Call'
    	       	},
    	      ],
		        listeners: [
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								},
							]

    },
	
	
	show: function ( ) {
	},
	
	loadData: function ( ) {
		var bulletins = Ext.getCmp('bulletinsClass');
		console.log("bulletins" + bulletins);
		bulletins.loadData();
		
	},
	

})