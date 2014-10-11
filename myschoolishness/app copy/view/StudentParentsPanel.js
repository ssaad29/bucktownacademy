Ext.define('myschoolishness.view.StudentParentsPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.student-parents-panel',
	xtype: 'student-parents-panel',
requires: ['Ext.List'],
	config: {
		title: 'Main',
		layout: 'fit',
		
		fullstreen: true,
        items: [
        {
        	xtype: 'list',
			itemId:'parentsForStudentList',
    		itemTpl: '{parent_first} {parent_last}',    
    		listeners: {
            //itemtap: function (list, idx, target, record, evt) {
        	//}
		}    		
        },
      {
                		xtype: 'titlebar',
                		itemId: 'editBulletinTitlebar',
                		docked: 'bottom',
                		items: [{
		        			xtype: 'button',
		        			itemId:'addParentToStudentButton',
		        			ui: 'action',
		        			align:'center',
		        			padding: '10px',
		        			iconCls: 'add'
                			},
                			{
		        			xtype: 'button',
		        			align:'center',
		        			itemId:'removeParentFromStudentButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			iconCls: 'delete'
                			}
                			]
        },
        ],
        listeners: [
		        				{
						delegate: '#addParentToStudentButton',
						event: 'tap',
						fn: 'showAddParentChooser'
						},
						{
						delegate: '#removeParentFromStudentButton',
						event: 'tap',
						fn: 'removeParent'
						}
		]
	},
	
showAddParentChooser: function () {
	this.fireEvent("showParentChooser", this);
},

addParent: function () {
	var studentId = sessionStorage.getItem("child_crud.student_id");
	var userId = sessionStorage.getItem("child_crud.chosen_parent_id");
	this.editParentAssociation("associate",userId,studentId);
},
    
removeParent: function () {
	var parentList = this.getComponent("parentsForStudentList");
	if (!parentList.hasSelection()) {
		 Ext.Msg.alert('Nothing selected', 'Please select a parent to remove');
	} else {
		var selected = parentList.getSelection();
		array = selected[0];
		this.editParentAssociation("delete",array.get('user_id'),array.get('student_id'));
	}
},

editParentAssociation: function (insertMode,parentId,studentId) {
	var parentStudentStore = Ext.create('myschoolishness.store.ParentStudentAssociationStore', {
			model: "myschoolishness.model.ParentStudentAssociationModel"
			});
		
        	parentStudentStore.load({
    			//define the parameters of the store:
    		    params: {
        		parentId: parentId,
        		insertMode: insertMode,
        		studentId: studentId,
        		userId:sessionStorage.getItem("user_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				var parentList = this.getComponent("parentsForStudentList");
				
				myschoolishness.controller.Utils.hasRecords(records); //Check that the session is valid
				parentList.setStore(null);
				if (success) {
					Ext.Msg.alert('Success', 'Your changes have been saved', Ext.emptyFn);
					//this.loadData();
					this.fireEvent("showChildCard", this);
				}
    		}
			})
},

loadData: function (student_id) {
	var parentList = this.getComponent("parentsForStudentList");
	
	var studentParentStore = Ext.create('myschoolishness.store.GetParentsForStudentStore', {
			model: "myschoolishness.model.GetParentsForStudentModel"
	});
	parentList.setStore(studentParentStore);
	studentParentStore.addListener('load',this. onStoreLoad,this);
   studentParentStore.load({
    			//define the parameters of the store:
    	params: {
        	student_id: student_id,
        	token: sessionStorage.getItem("token")
    	}
		})
	},
	
onStoreLoad: function(store, records, successful, operation, eOpts) {
console.log("SUCCESS?" + successful);
var parentList = this.getComponent("parentsForStudentList");
parentList.setStore(null);
			if (successful) {
				parentList.setStore(store);
			}
    },
})