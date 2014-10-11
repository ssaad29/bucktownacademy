Ext.define('myschoolishness.controller.Directory', {
	extend: 'Ext.app.Controller',
	requires: ['myschoolishness.view.DirectoryFamily',
	'myschoolishness.view.DirectoryHome',
	'myschoolishness.view.DirectoryStaff',
	'myschoolishness.view.DirectoryStaffDetail',
	'myschoolishness.view.DirectoryStudents',
	'myschoolishness.store.DirectoryFamilyStore',
	'myschoolishness.store.DirectoryStaffDetailStore',
	'myschoolishness.store.DirectoryStaffStore',
	'myschoolishness.store.DirectoryStudentsStore',
	'myschoolishness.model.DirectoryFamilyModel',
	'myschoolishness.model.DirectoryStaffDetailModel',
	'myschoolishness.model.DirectoryStaffModel',
	'myschoolishness.model.DirectoryStudentsModel'],
	config: {
		refs: {
			mainView: 'mainview',
			directoryHome: 'directory-home',
			directoryStudents: 'directory-students',
			directoryStaff: 'directory-staff',
			directoryFamily: 'directory-family',
			directoryStaffDetail: 'directory-staff-detail',
			directoryBirthdays: 'directory-birthdays'
		},
		control: {
			directoryStudents: {
				showFamily: 'showFamily'
			},
			directoryStaff: {
				showStaffDetail: 'showStaffDetail'
			},
			mainView: {
				showDirectory: 'showStudentDirectory'
			},
			directoryFamily: {
				showDirectory: 'showStudentDirectory'
			}
		},
        routes: {
            'directory': 'showStudentDirectory',
            'directory/staffDetail': 'showStaffDetail',
            'directory/family': 'showFamily',
            'directory/students': 'showStudentDirectory',
            'directory/staff': 'showStaffDirectory',
            'directory/birthdays': 'showBirthdays'
        }
	},
	
	showStaffDetail: function () {
		var directoryStaffDetail = this.getDirectoryStaffDetail();
		Ext.Viewport.animateActiveItem(directoryStaffDetail,myschoolishness.controller.Utils.getDefaultSlideTransition());
		directoryStaffDetail.loadStaff();
	},
	
	showStudentDirectory: function () {
		var directoryHome = this.getDirectoryHome();
		var directoryStudents = this.getDirectoryStudents();
		directoryStudents.onDataUpdated();
		Ext.Viewport.animateActiveItem(directoryHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		directoryStudents.loadData();
		directoryHome.setActiveItem(directoryStudents);
	},
	
	showStaffDirectory: function () {
		var directoryHome = this.getDirectoryHome();
		var directoryStaff = this.getDirectoryStaff();
		Ext.Viewport.animateActiveItem(directoryHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		directoryStaff.loadData();
		directoryHome.setActiveItem(directoryStaff);
	},	
	
	showFamily: function () {
		var directoryFamily = this.getDirectoryFamily();
		directoryFamily.loadFamily();
		Ext.Viewport.animateActiveItem(directoryFamily,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showBirthdays: function () {
		var directoryBirthdays = this.getDirectoryBirthdays();
		Ext.Viewport.animateActiveItem(directoryBirthdays,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
			 	
})