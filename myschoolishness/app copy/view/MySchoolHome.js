Ext.define('myschoolishness.view.MySchoolHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.school-home',
    xtype: 'school-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	tabBar: {
            docked: 'bottom',
            itemId: 'absenceTabBar',
            layout: {
            	animation: {
        			duration:0
    			},
                pack: 'center'
            }

        },
    	items:[ 
    	       	{
    	       	xtype: 'absence-rollcall',
    	       	itemId: 'rollcall',
    	       	id: 'rollcall'
    	       	},
    	       	{
    	       	xtype: 'absence-allstaff',
    	       	itemId: 'test',
    	       	},
    	       	
    	       	
    	      ],
		        listeners: [
		        				{
								delegate: '#backButtonAbsence',
								event: 'tap',
								fn: 'onBackButtonTap'
								},
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								}
							]

    },
    
    onTabSelect: function (sender, newActiveItem, oldActiveItem, eOpts ) {
    	 
    },
    
   loadData: function () {	
   		
   },
	
    onBackButtonTap: function () {
    	this.fireEvent("goHome", this);
	},
	
})