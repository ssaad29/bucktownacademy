Ext.define('myschoolishness.view.DirectoryHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.directory-home',
    xtype: 'directory-home',
    fullscreen: true,
    requires: ['Ext.TabPanel','Ext.field.Search'],

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
                		xtype: 'titlebar',
                		itemId: 'dirTitlebar',
                		docked: 'top',
                		items: [
                			{
                             xtype: 'searchfield',
                             id:'searchfieldDirectory',
                             placeHolder: 'Search...',
                             itemId: 'searchfieldDirectory',
                             align:'right',
                         	}
                			]
           		},
    	       	{
    	       	xtype: 'directory-students',
    	       	itemId: 'students',
    	       	title:'students'
    	       	},
    	       {
    	       	xtype: 'directory-staff',
    	       	itemId: 'staff',
    	       	title:'staff'
    	       	}
    	       	
    	       	
    	      ],
		        listeners: [
		        				{
								delegate: '#backButtonDir',
								event: 'tap',
								fn: 'onBackButtonTap'
								},
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								},
								{
								delegate: '#searchfieldDirectory',
								event: 'keyup',
								fn: 'onSearch'
								},
								{
								delegate: '#searchfieldDirectory',
								event: 'clearicontap',
								fn: 'onClearSearch'
								}
							]

    },
	
	onSearch: function (searchField) {
	 this.getActiveItem().onSearchKeyUp(searchField.getValue());
	},
	
	onClearSearch: function () {
	 this.getActiveItem().onClearSearch();
	},	
	
    onBackButtonTap: function () {
		 history.back();
	},
	
	onTabSelect: function (sender, newActiveItem, oldActiveItem, eOpts ) {
		newActiveItem.loadData();
	}

})