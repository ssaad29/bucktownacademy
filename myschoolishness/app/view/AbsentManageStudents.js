Ext.define('myschoolishness.view.AbsentManageStudents', {
	extend: 'Ext.List',
	xtype: 'absence-manage-students',
	alias : 'widget.absence-manage-students',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-hammer',
		title: 'Student Admin' ,
		grouped: true,
		indexBar: true,
		store : 'AbsentManageStudentsStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'Student Admin List',
		listeners: {
        	itemtap: function (list, idx, target, record, evt) {
                	setTimeout(function() {
					console.log("Item tap" + idx);
					if (this.actions) {
					console.log("Hidden" + this.actions.getHidden());
					}
					console.log("this.actions" + this.actions);
					if (!this.actions) {
										console.log("CREATING NEW");
		        							this.actions = Ext.Viewport.add({
		        								xtype: 'actionsheet',
		        								items: [
        											{
            										text: 'Roll call',
            										scope: this,
            											handler: function() {
            												sessionStorage.setItem("attendance.id_type", record.get("student"));
															sessionStorage.setItem("attendance.student_id", record.get("student_id"));
															sessionStorage.setItem("attendance.first_name", record.get("first_name"));
															sessionStorage.setItem("attendance.last_name", record.get("last_name"));
															sessionStorage.setItem("absence.edit.role", "approver");
															//var me = this;
															window.location.hash = 'absence/absenceList';
															//me.fireEvent('showAbsenceList');
															//this.fireEvent('showAbsenceList');
															this.actions.hide();
															console.log("Hiding...");
            											}
        											},
        											{
            										text: 'Sign in / Sign out',
            										scope: this,
            											handler: function() {
            												this.actions.hide();
            												//this.up().up().up().onRecordTardy();
            												console.log("Hiding...");
            											}
        											},
    											]
		        							})
		        						} else if (this.actions.getHidden() === true){
		        							console.log("Showing OLD");
		        							this.actions.show();
		        							console.log("Showing...");
		        						}                
                 }, 0);
        		}
		}
		}
})