Ext.define('myschoolishness.view.BulletinsClassroomsPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.bulletins-classrooms-panel',
	xtype: 'bulletins-classrooms-panel',
requires: ['Ext.List'],
	config: {
		title: 'Classrooms',
		layout: 'fit',
		
		fullstreen: true,
        items: [
        {
        	xtype: 'list',
			itemId:'bulletinsClassroomsList',
    		itemTpl: '{name}',    
    		listeners: {
            itemtap: function (list, idx, target, record, evt) {
				sessionStorage.setItem("classroom_id", record.get("id"));
        	}
		}    		
        },
      {
                		xtype: 'titlebar',
                		itemId: 'classroomsBulletinTitlebar',
                		docked: 'bottom',
                		items: [{
		        			xtype: 'button',
		        			itemId:'addClassroomToBulletinButton',
		        			ui: 'action',
		        			align:'center',
		        			padding: '10px',
		        			iconCls: 'add'
                			},
                			{
		        			xtype: 'button',
		        			align:'center',
		        			itemId:'removeClassroomToBulletinButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			iconCls: 'delete'
                			}
                			]
        },
        ],
        listeners: [
		        				{
						delegate: '#addClassroomToBulletinButton',
						event: 'tap',
						fn: 'showAddClassroomChooser'
						},
						{
						delegate: '#removeClassroomToBulletinButton',
						event: 'tap',
						fn: 'removeBulletin'
						}
		]
	},
	
showAddClassroomChooser: function () {
	this.fireEvent("chooseClass", this);
},

addClassroom: function () {
	var bulletinId = sessionStorage.getItem("edit_bulletin.bulletin_id");
	var classroomId = sessionStorage.getItem("classroom_id");
	this.editClassroomAssociation("associate",bulletinId,classroomId);
},
    
removeBulletin: function () {
	var bulletinId = sessionStorage.getItem("edit_bulletin.bulletin_id");
	var classroomsList = this.getComponent("bulletinsClassroomsList");
	if (!classroomsList.hasSelection()) {
		 Ext.Msg.alert('Nothing selected', 'Please select a classroom to remove');
	} else {
		var selected = classroomsList.getSelection();
		array = selected[0];
		this.editClassroomAssociation("delete",bulletinId,array.get('id'));
	}
},


editClassroomAssociation: function (insertMode,bulletinId,classroomId) {
	var classroomsList = this.getComponent("bulletinsClassroomsList");
	classroomsList.setStore(null);
	var classroomStore = Ext.create('myschoolishness.store.BulletinClassAssociationStore', {
			model: "myschoolishness.model.BulletinClassAssociationModel"
			});
		
        	classroomStore.load({
    			//define the parameters of the store:
    		    params: {
        		bulletinId: bulletinId,
        		insertMode: insertMode,
        		classroomId: classroomId,
        		userId:sessionStorage.getItem("user_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				
				myschoolishness.controller.Utils.hasRecords(records); //Check that the session is valid
				if (success) {
					//classroomsList.setStore(classroomStore);
					//classroomsList.getStore().load();
					Ext.Msg.alert('Success', 'Your changes have been saved', Ext.emptyFn);
					this.loadData();
					//					
				}
    		}
			})
},

loadData: function () {
	var classroomsList = this.getComponent("bulletinsClassroomsList");
	var bulletinId = sessionStorage.getItem("edit_bulletin.bulletin_id");
	
	var classroomStore = Ext.create('myschoolishness.store.ClassroomForBulletinIdStore', {
			model: "myschoolishness.model.ClassroomForBulletinIdModel"
	});
	classroomsList.setStore(null);
	classroomStore.addListener('load',this. onStoreLoad,this);
   classroomStore.load({
    			//define the parameters of the store:
    	params: {
        	bulletinId: bulletinId,
        	token: sessionStorage.getItem("token")
    	},
    	scope: this,
    	callback : function(records, operation, success) {
						classroomsList.setStore(classroomStore);
		}
		})
	},
	

})