Ext.define('myschoolishness.view.EditBulletin', {
    extend: 'Ext.Panel',
	alias: "widget.editbulletinview",
    xtype: 'editbulletinview',
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
		        			itemId:'editBulletinsBackButton',
		        			id:'editBulletinsBackButton',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			{
		        			xtype: 'button',
		        			align: 'right',
		        			itemId:'editBulletinDeleteButton',
		        			id:'editBulletinDeleteButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			text: 'Delete'
                			},
                			]
        },
        {
        	xtype: 'list',
			fullscreen: true,
			itemId:'editBulletinList',
		    id:'editBulletinList',
    		itemTpl: '{Edit_Bulletin}',        		
        	listeners: {
                itemtap: function (list, idx, target, record, evt) {
						sessionStorage.setItem("edit_bulletin.index",idx);
						this.parent.fireEvent("showBulletinCrudCard", this);
        		}
			}
        }
        ],
        listeners: [
		        				{
						delegate: '#editBulletinsBackButton',
						event: 'tap',
						fn: 'goBack'
						},
						{
						delegate: '#editBulletinDeleteButton',
						event: 'tap',
						fn: 'onDeleteButtonTap'
						}
		]
	},
	
	
			
	onDeleteButtonTap: function () {
		var bulletinId = sessionStorage.getItem("edit_bulletin.bulletin_id")
		var me = this;
		
		Ext.Msg.confirm("Confirmation", "Are you sure that you want to delete this Bulletin?",  function(choice)
 		{
   			if(choice == 'yes')
     		{	
     				var editBulletinList = Ext.getCmp("editBulletinList");
					var deleteBulletinStore = Ext.create('myschoolishness.store.DeleteBulletinStore', {
					model: "myschoolishness.model.DeleteBulletinModel"
					});
		    
        			deleteBulletinStore.load({
    				//define the parameters of the store:
    		    		params: {
        				bulletinId: bulletinId,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
    							Ext.Msg.alert('Success', 'Bulletin has been deleted', Ext.emptyFn);
								//this.fireEvent("showBulletinList", this);
								me.fireEvent("showBulletinList", me);
							}
    					}
					})
     		}
 		})
	},
		
	configureList: function() {
		var editBulletinList = Ext.getCmp("editBulletinList");
		if (editBulletinList.getData() === null || editBulletinList.getData() === undefined) {
			var dataForList = [
    				{Edit_Bulletin:"Details"},
    				{Edit_Bulletin:"Recipients"},
    				];

			editBulletinList.setData(dataForList);
			editBulletinList.refresh();
			}
	},
	
	goBack: function () {
		console.log("SHOULD CALL BACK BUTTON TAP");
		this.fireEvent("showBulletinList", this);
	}
})
