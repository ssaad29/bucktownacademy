Ext.define('myschoolishness.view.BulletinCrudCard', {
    extend: 'Ext.Panel',
	alias: "widget.bulletincrudcard",
    xtype: 'bulletincrudcard',
	fullscreen: true,
	title: 'Bulletin crud card',
	config: {
		title: 'Bulletin crud',
		layout: 'fit',
		fullstreen: true,
        items: [
        {
                		xtype: 'titlebar',
                		itemId: 'editBulletinTitlebar',
                		docked: 'top',
                		items: [
                			{
		        			xtype: 'button',
		        			itemId:'backButtonEditBulletin',
		        			id:'backButtonEditBulletin',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                				{
		        				xtype: 'button',
		        				itemId:'saveButtonEditBulletin',
		        				id:'saveButtonEditBulletin',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Save'
                				},
                			]
       	 					},
        					{
        						xtype: 'panel',
        						layout: 'card',
        						itemId:'bulletinCardPanel',
		        				id:'bulletinCardPanel',
        						items: [
		        		        	{
                					xtype: 'bulletindetails',
                					itemId: 'bulletinDetailsPanel',
                					id: 'bulletinDetailsPanel'
		        		        	}, 
		        		        	{
                					xtype: 'bulletins-classrooms-panel',
                					itemId: 'bulletinClassroomPanel',
                					id: 'bulletinClassroomPanel'
		        		        	}
		        		        ]
		        		    }
        ],
        listeners: [
		        				{
						delegate: '#backButtonEditBulletin',
						event: 'tap',
						fn: 'onBackButtonTap'
						},
						{
						delegate: '#saveButtonEditBulletin',
						event: 'tap',
						fn: 'save'
						}
		]
	},
	
	activateItem: function () {
		var saveButton = Ext.getCmp("saveButtonEditBulletin");	
		sessionStorage.setItem("newbulletin.index","-1");
		var card = this.getComponent("bulletinCardPanel");
		var idx = sessionStorage.getItem("edit_bulletin.index");
		if (idx === null || idx === undefined) {
			idx = 0;
		} else {
			idx = parseInt(idx);
		}

		if (idx === 0) {
			card.setActiveItem(0);
			sessionStorage.setItem("newbulletin.index","-1");
			saveButton.setHidden(false);
		} else if (idx === 1) {
			card.setActiveItem(1);
			saveButton.setHidden(true);
			var bulletinClassroomsPanel = Ext.getCmp("bulletinClassroomPanel");
			bulletinClassroomsPanel.loadData();
			saveButton.setHidden(true);
		}
	},
	
	doneCalled: function () {
		this.fireEvent("showEditBulletin", this);
	},
	
	validateBulletin: function (title,message) { 		
		var bulletinValidation = Ext.create('myschoolishness.model.validations.BulletinValidation',{
     		title: title,
     		message: message
		});
 
		var errs = bulletinValidation.validate();
		var msg = '';
 		
 		var returnVal = true;
 		
		if (!errs.isValid()) {
  			 errs.each(function (err) {
  			  		msg += err.getField() + ' : ' + err.getMessage() + '<br/>';
  			  		returnVal = false;
   			});
   		if (!returnVal) {
   			Ext.Msg.alert('ERROR', msg);
   		}
		} 
		
		return returnVal;
	},
	
	doNext: function () {
		var saveButton = Ext.getCmp("saveButtonEditBulletin");	
		var card = this.getComponent("bulletinCardPanel");
		
		var idx = sessionStorage.getItem("newbulletin.index");
		if (idx === null || idx === undefined) {
			idx = 0;
		} else {
			idx = parseInt(idx);
		}
		
		if (idx === 0) {
			sessionStorage.setItem("newbulletin.index","1");
			sessionStorage.removeItem("edit_bulletin.bulletin_id");
			var detailsPanel = Ext.getCmp("bulletinDetailsPanel");
			detailsPanel.setTitle("");
			detailsPanel.setMessage("");
			saveButton.setHidden(false);
			card.setActiveItem(idx);
		} 
	},		
	
	save: function () {
		console.log("SAVE called");
		var detailsPanel = Ext.getCmp("bulletinDetailsPanel");
		var isValid = this.validateBulletin(detailsPanel.getTitle(),detailsPanel.getMessage());
		var type = detailsPanel.getType();
		if (!isValid) {
				return;
			} else {
				var saveBulletinStore = Ext.create('myschoolishness.store.SaveBulletinStore', {
				model: 'myschoolishness.model.SaveBulletinModel'
				});
				saveBulletinStore.load({
    			//define the parameters of the store:

    			params: {
        			token: sessionStorage.getItem("token"),
        			bulletinId: sessionStorage.getItem("edit_bulletin.bulletin_id"),
        			type: '1',
        			title: detailsPanel.getTitle(),
        			message: detailsPanel.getMessage(),
        			school_id: sessionStorage.getItem("school_id"),
        			user_id: sessionStorage.getItem("user_id")
    		    	},
    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								sessionStorage.setItem("edit_bulletin.bulletin_id",records[0].get("insertId"));
								var index = sessionStorage.getItem("newbulletin.index");
								console.log("index IS" + index);
								if (index==="1") {
									Ext.Msg.alert('Success', 'New bulletin added. Please add classrooms as recipients', Ext.emptyFn);
								}
								this.fireEvent("showBulletinList", this);
							}
    					}
				})
			}
	},	
	
	loadData: function () {
			var bulletinDetailsPanel = Ext.getCmp("bulletinDetailsPanel");
			
		 	var bulletinsStore = Ext.create('myschoolishness.store.BulletinByIdStore', {
			model: 'myschoolishness.model.BulletinByIdModel'
			});
			bulletinsStore.addListener('load',this. onStoreLoad,this);
			bulletinsStore.load({
    		//define the parameters of the store:
    		params: {
        		token: sessionStorage.getItem("token"),
        		bulletinId: sessionStorage.getItem("edit_bulletin.bulletin_id")
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success && records.length > 0) {
								var detailsPanel = Ext.getCmp("bulletinDetailsPanel");
								detailsPanel.setTitle(records[0].get('title'));
								detailsPanel.setMessage(records[0].get('message'));
								detailsPanel.setType(records[0].get('type'));
							}
    					}
					})
			var bulletinClassroomsPanel = Ext.getCmp("bulletinClassroomPanel");
			bulletinClassroomsPanel.loadData();
	},	
	
	
	onBackButtonTap: function () {
		this.fireEvent("showEditBulletin", this);
	}
})
