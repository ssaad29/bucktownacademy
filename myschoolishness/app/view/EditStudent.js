Ext.define('myschoolishness.view.EditStudent', {
    extend: 'Ext.Panel',
	alias: "widget.editstudentview",
    xtype: 'editstudentview',
	fullscreen: true,
	title: 'Edit Student',
	config: {
		title: 'Main',
		layout: 'fit',
		fullstreen: true,
        items: [
        {
                		xtype: 'titlebar',
                		title: "Edit Student",
                		itemId: 'editStudentTitlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'backButtonEditStudent',
		        			id:'backButtonEditStudent',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			{
		        			xtype: 'button',
		        			align: 'right',
		        			itemId:'staffDeleteButton',
		        			id:'staffDeleteButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			text: 'Delete'
                			},
                			]
        },
        {
        	xtype: 'list',
			fullscreen: true,
			itemId:'editStudentList',
		    id:'editStudentList',
    		itemTpl: '{Edit_Student}',        		
        	listeners: {
                itemtap: function (list, idx, target, record, evt) {
				var me = this;
				sessionStorage.setItem("edit_student.index", idx);
				sessionStorage.setItem("user_crud.user_id", sessionStorage.getItem("user_id"));
				this.parent.fireEvent("showChildCard", this);
        		}
			}
        }
        ],
        listeners: [
		        				{
						delegate: '#backButtonEditStudent',
						event: 'tap',
						fn: 'onBackButtonTap'
						},
						{
						delegate: '#staffDeleteButton',
						event: 'tap',
						fn: 'onDeleteButtonTap'
						}
		]
	},
			
	onDeleteButtonTap: function () {
		var student_id =	sessionStorage.getItem("child_crud.student_id");

		Ext.Msg.confirm("Confirmation", "Are you sure that you want to delete this student?",  function(choice)
 		{
   			if(choice == 'yes')
     		{
					var deleteStudentStore = Ext.create('myschoolishness.store.DeleteStudentStore', {
					model: "myschoolishness.model.DeleteStudentModel"
					});
		
					deleteStudentStore.addListener('load',this. onStoreLoad,this);
    
        			deleteStudentStore.load({
    				//define the parameters of the store:
    		    		params: {
        				student_id: student_id,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
    							Ext.Msg.alert('Success', 'Student has been deleted', Ext.emptyFn);
								this.fireEvent("showStudentList", this);
							}
    					}
					})
     		}
 		})
	},
		
	configureList: function() {
		var roles =myschoolishness.controller.Utils.getRoles();
		var editStudentList = Ext.getCmp("editStudentList");
		var editStudentOrigin = sessionStorage.getItem("edit_student.origin");
		var dataForList = null;

		if (editStudentList.getData() === null) {
			if (editStudentOrigin === "pref") {
				dataForList = [
    				{Edit_Student:"Details"},
    				];
			} else if (editStudentOrigin === "staffEdit") {
				if (roles.indexOf("A") === -1) {
					dataForList = [
    				{Edit_Student:"Details"},
    				{Edit_Student:"Parents"},
    				{Edit_Student:"Invite"},
    				];	
    				} else {
    					dataForList = [
    					{Edit_Student:"Details"},
    					{Edit_Student:"Parents"},
    					{Edit_Student:"Invite"},
    					{Edit_Student:"Name"},
    					{Edit_Student:"Class/Grade"},
    					];
    				}
    					
    		}
			editStudentList.setData(dataForList);
			editStudentList.refresh();
		}
	},	
	
	
	onBackButtonTap: function () {
		 this.fireEvent("showStudentList", this);
	}
})
