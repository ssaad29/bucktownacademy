Ext.define('myschoolishness.view.ManageStudents', {
	extend: 'Ext.List',
	xtype: 'manage-students',
	alias : 'widget.manage-students',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-users',
		title: 'Students' ,
		store : 'AbsentManageStudentsStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'Student Admin List',
		listeners: {
            itemtap: function (list, idx, target, record, evt) {
            	sessionStorage.setItem("edit_student.origin","staffEdit");
				sessionStorage.setItem("child_crud.student_id", record.get("student_id"));
				console.log("FIRING EVENT! " + this);
				this.fireEvent("editStudent", this);
				//console.log("PARENT FIRING EVENT! " + this);
				//this.parent.fireEvent("editStudent", this);
        	}
		}
		},
	
	invokeNewFlow: function () {	
		sessionStorage.setItem("edit_student.origin","staffEdit");
		sessionStorage.setItem("newstudent.index","3");
		this.fireEvent("newStudent", this);
	},
	
		loadData: function () {
			console.log("Reloading students");
		 this.setStore(null);
		 	var studentsStore = Ext.create('myschoolishness.store.AbsentManageStudentsStore', {
			model: 'myschoolishness.model.AbsentManageStudentsModel'
			});
			studentsStore.addListener('load',this. onStoreLoad,this);
			studentsStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token"),    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								this.setStore(studentsStore);
							}
    					}
					})
	},
})