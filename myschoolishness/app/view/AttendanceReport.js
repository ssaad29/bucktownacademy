Ext.define('myschoolishness.view.AttendanceReport', {
    extend: 'Ext.Panel',
    alias: "widget.attendancereport",
    xtype: 'attendancereport',
    fullscreen: true,
	title: 'Edit Bulletin',
	config: {
		title: 'Main',
		layout: 'fit',
		fullstreen: true,
            
        items: [
        {
                		xtype: 'titlebar',
                		itemId: 'editBulletin',
                		docked: 'top',
                		items: [
                			{
		        			xtype: 'button',
		        			itemId:'reportPageBackButton',
		        			id:'reportPageBackButton',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			]
        },
        {
        						xtype: 'container',
        						itemId: 'reportContentPanel',
        						id: 'reportContentPanel',
        						html: 'test',
        						scrollable: {
                					direction: 'vertical'
            					},
		        		    },

        ],
        listeners: [
		        				{
						delegate: '#reportPageBackButton',
						event: 'tap',
						fn: 'goBack'
						},
		]
	},
   
            
    goBack: function () {
    	this.fireEvent("showManageReports", this);
    },
    
     setHtml: function (htmlContent) {
     	var reportContentPanel = Ext.getCmp("reportContentPanel");
    	reportContentPanel.setHtml(htmlContent);
    },
      
              
});