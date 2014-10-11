Ext.define('myschoolishness.view.AbsentManageStaff', {
	extend: 'Ext.List',
	xtype: 'absence-manage-staff',
	alias : 'widget.manage-staff',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-hammer2',
		title: 'Staff Admin' ,
		grouped: true,
		indexBar: true,
		store : 'AbsentManageStaffStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'Staff Admin List',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
				sessionStorage.setItem("attendance.id_type", "staff");
				sessionStorage.setItem("absence.edit.role", "creator");
				sessionStorage.setItem("staff.first_name", record.get("first_name"));
				sessionStorage.setItem("staff.last_name", record.get("last_name"));
				sessionStorage.setItem("staff.user_id", record.get("user_id"));
				var me = this;
				window.location.hash = 'absence/absenceList';
				me.fireEvent('showAbsenceList');        		
        		}
			}
		}
})