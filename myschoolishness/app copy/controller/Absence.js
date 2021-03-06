Ext.define('myschoolishness.controller.Absence', {
	extend: 'Ext.app.Controller',
	requires: ['myschoolishness.view.AbsenceAllStaff',
	'myschoolishness.view.AbsenceAllStudent',
	'myschoolishness.view.AbsenceEdit',
	'myschoolishness.view.AbsenceHome',
	'myschoolishness.view.AbsenceMyKids',
	'myschoolishness.view.AbsenceRollCall',
	'myschoolishness.view.AbsentManageStaff',
	'myschoolishness.view.AbsentManageStudents',
	'myschoolishness.store.AbsenceAllStaffStore',
	'myschoolishness.store.AbsenceAllStudentStore',
	'myschoolishness.store.AbsenceMyKidsStore',
	'myschoolishness.store.AbsenceStaffMemberStore',
	'myschoolishness.store.AbsentDeleteStore',
	'myschoolishness.store.AbsentInsertStore',
	'myschoolishness.store.AbsentManageStaffStore',
	'myschoolishness.store.AbsentManageStudentsStore',	
	'myschoolishness.store.AbsentSingleStudentStore',
	'myschoolishness.store.AbsentStore',
	'myschoolishness.store.AttendanceStore',
	'myschoolishness.model.AbsenceAllStaffModel',
	'myschoolishness.model.AbsenceAllStudentModel',
	'myschoolishness.model.AbsenceMyKidsModel',
	'myschoolishness.model.AbsenceStaffMemberModel',
	'myschoolishness.model.AbsentDeleteModel',
	'myschoolishness.model.AbsentInsertModel',
	'myschoolishness.model.AbsentManageStaffModel',
	'myschoolishness.model.AbsentManageStudentsModel',
	'myschoolishness.model.AbsentModel',
	'myschoolishness.model.AbsentSingleStudentModel',
	'myschoolishness.model.AttendanceModel'],
	config: {
		refs: {
			mainView: 'mainview',
			absenceHome: 'absence-home',
			absenceRollCall: 'absence-rollcall',
			absenceEdit: 'absence-edit',
			absenceAllStaff: 'absence-allstaff',
			absenceAllStudents: 'absence-allstudent',
			absenceMyKids: 'absence-mykids',
			absenceManageStaff: 'absence-manage-staff',
			absenceManageStudents: 'absence-manage-students',
			studentsOutToday: 'absence-allstudents',
			staffOutToday: 'absence-allstaff',
			absenceList: 'absenceList',
		},
		control: {
			absenceHome: {
				showEdit: 'showEdit',
				goHome: 'goHome',
				showManageStaff: 'showManageStaff'
			},
			absenceRollCall: {
				showAbsenceList: 'showAbsenceList',
				refreshHome: 'refreshHome'
			},
			mainView: {
				showRollCall: 'showRollCall',
				absentChosen: 'absentChosen',
			},
			absenceMyKids: {
				showEdit: 'showEdit'
			},
			absenceManageStudents: {
				showEdit: 'showEdit'
			},
			absenceManageStaff: {
				showEdit: 'showEdit'
			},
			absenceList: {
				showEdit: 'showEdit',
				showRollCall: 'showRollCall',
				goHome: 'goHome',
			}
		},
        routes: {
            'absence': 'absentChosen',
            'absence/rollcall': 'showRollCall',
            'absence/staffMember': 'showAbsenceList',
            'absence/myKids': 'showMyKids',
            'absence/manageStaff': 'showManageStaff',
            'absence/manageStudents': 'showManageStudents',
            'absence/allStudents': 'showAllStudents',
            'absence/allStaff': 'showAllStaff',
            'absence/studentsOutToday': 'showStudentsOutToday',
            'absence/staffOutToday': 'showStaffOutToday',
            'absence/absenceList': 'showAbsenceList',
            'absence/edit': 'showEdit'
        }
	},
	
	goHome: function () {
		var mainView = this.getMainView();
		mainView.setMasked(false);
		Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	absentChosen: function () {
		var absenceHome = this.getAbsenceHome();
		
		var roles = sessionStorage.getItem("roles");
		if (roles.indexOf("T") != -1) {
			console.log("TEACHER");
		} else if (roles.indexOf("P") != -1) {
						console.log("PARENT");
		} else if (roles.indexOf("T") != -1 || roles.indexOf("S") != -1 || roles.indexOf("A") != -1) {
					console.log("STAFF MEMBER");
		} 
		console.log("About to config tabs");
		absenceHome.configureTabs();
		console.log("Done!");
	},
			
	showAbsenceList: function () {
		var absenceList = this.getAbsenceList();
		absenceList.loadData();
		Ext.Viewport.animateActiveItem(absenceList,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
		
	showStudentsOutToday: function () {
		var absenceHome = this.getAbsenceHome();
		var studentsOutToday = this.getStudentsOutToday();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(studentsOutToday);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		
	},
	
	showStaffOutToday: function () {
		var absenceHome = this.getAbsenceHome();
		var staffOutToday = this.getStaffOutToday();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(staffOutToday);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showManageStaff: function () {
		var absenceHome = this.getAbsenceHome();
		var absenceManageStaff = this.getAbsenceManageStaff();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(absenceManageStaff);
		absenceManageStaff.tabChosen();
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},

	showManageStudents: function () {
		var absenceHome = this.getAbsenceHome();
		var absenceManageStudents = this.getAbsenceManageStudents();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(absenceManageStudents);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showRollCall: function () {
		console.log("roll call showRoll call 1");
		var absenceHome = this.getAbsenceHome();
		var absenceRollCall = this.getAbsenceRollCall();
		absenceRollCall.loadData();
		//absenceHome.configureTabs();
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showAllStudents: function () {
		var absenceHome = this.getAbsenceHome();
		var allStudents = this.getAbsenceAllStudents();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(allStudents);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showAllStaff: function () {
		var absenceHome = this.getAbsenceHome();
		var allStaff = this.getAbsenceAllStaff();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(allStaff);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showMyKids: function () {
		var absenceHome = this.getAbsenceHome();
		var myKids = this.getAbsenceMyKids();
		//absenceHome.configureTabs();
		absenceHome.setActiveItem(myKids);
		myKids.tabChosen();
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		
	},
	
	showEdit: function() {
	console.log("SHOW EDIT!!! in controller");
		var absenceEdit = this.getAbsenceEdit();
		
		absenceEdit.loadData();
		Ext.Viewport.animateActiveItem(absenceEdit,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
		
	 	
})