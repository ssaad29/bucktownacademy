Ext.define('myschoolishness.view.BulletinHome', {
    extend: 'Ext.Panel',
    alias: 'widget.bulletin-home',
    xtype: 'bulletin-home',
    fullscreen: true,
	title: 'blah',
	config: {
		title: 'blah',
		layout: 'fit',
		fullstreen: true,
    	
    	items:[ 
    			{
                		xtype: 'titlebar',
                		itemId: 'bulletinTitleBar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'bulletinHomeBack',
		        			id:'bulletinHomeBack',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Home'
                			},
                			
                			{
    	       				xtype: 'button',
    	       				iconCls: 'add',
    	       	    		iconMask: true,
    	       				align: 'right',
    	       				itemId: 'bulletinHomeNew',
    	       				id:'bulletinHomeNew',
    	       				}
                			]
           		},
           		{
    	       	xtype: 'manage-bulletins',
    	       	itemId: 'bulletinsDataList',
    	       	id: 'bulletinsDataList',
    	       	},
    	      ],
		        listeners: []

    },
	
	onNewButtonTap: function () {
		sessionStorage.setItem("newbulletin.index","0");
		this.fireEvent("newBulletin", this);
	},
	
    onBackButtonTap: function () {
		this.fireEvent("goHome", this);
	},
	
	loadData: function () {
		var bulletins = Ext.getCmp('bulletinsDataList');
		bulletins.loadData();
	},
	
	

})