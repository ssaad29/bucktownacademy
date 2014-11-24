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
			absenceSignOut: 'absence-signout',
			absenceEdit: 'absence-edit',
			absenceAllStaff: 'absence-allstaff',
			absenceAllStudents: 'absence-allstudent',
			absenceMyKids: 'absence-mykids',
			absenceManageStaff: 'absence-manage-staff',
			absenceManageStudents: 'absence-manage-students',
			studentsOutToday: 'absence-allstudents',
			staffOutToday: 'absence-allstaff',
			absenceList: 'absenceList',
			signoutView: 'signoutview',
		},
		control: {
			absenceHome: {
				showEdit: 'showEdit',
				showManageStaff: 'showManageStaff'
			},
			absenceRollCall: {
				showAbsenceList: 'showAbsenceList',
				refreshHome: 'refreshHome',
				markOutToday: 'markOutToday'
			},
			absenceSignOut: {
				showSigPanel: 'showSigPanel'
			},
			mainView: {
				showRollCall: 'showRollCall',
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
				reloadRollCall: 'reloadRollCall',
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
	
	reloadRollCall: function () {
		var absenceRollCall = this.getAbsenceRollCall();
		absenceRollCall.showAddedAbsence();
	},
	
	goHome: function () {
		var mainView = this.getMainView();
		mainView.loadData();
		mainView.setMasked(false);
		//var absenceRollCall = this.getAbsenceRollCall();
		//absenceRollCall.loadData();
		Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
		//var absenceRollCall = this.getAbsenceRollCall();
		//absenceRollCall.loadData();
	},
	
	showSigPanel: function () {
		console.log("showSigPanel FIRED");
		var signoutView = this.getSignoutView();
		signoutView.setMasked(false);
		signoutView.clearSignature();
		Ext.Viewport.animateActiveItem(signoutView,myschoolishness.controller.Utils.getDefaultSlideTransition());
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
		absenceHome.configureTabs();
		//this.showAllStudents();
	},
			
	showAbsenceList: function () {
		var absenceList = this.getAbsenceList();
		absenceList.loadData();
		Ext.Viewport.animateActiveItem(absenceList,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	markOutToday: function () {
		console.log("markOutToday CALLED");
		var absenceList = this.getAbsenceList();
		absenceList.loadData();
		//Ext.Viewport.animateActiveItem(absenceList,myschoolishness.controller.Utils.getDefaultSlideTransition());
		absenceList.onReportAbsentButtonTap();
	},
		
	showStudentsOutToday: function () {
		var absenceHome = this.getAbsenceHome();
		var studentsOutToday = this.getStudentsOutToday();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(studentsOutToday);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		
	},
	
	showStaffOutToday: function () {
		var absenceHome = this.getAbsenceHome();
		var staffOutToday = this.getStaffOutToday();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(staffOutToday);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showManageStaff: function () {
		var absenceHome = this.getAbsenceHome();
		var absenceManageStaff = this.getAbsenceManageStaff();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(absenceManageStaff);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		
	},

	showManageStudents: function () {
		var absenceHome = this.getAbsenceHome();
		var absenceManageStudents = this.getAbsenceManageStudents();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(absenceManageStudents);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showRollCall: function () {
		var absenceHome = this.getAbsenceHome();
		var absenceRollCall = this.getAbsenceRollCall();
		absenceRollCall.loadData();
		absenceHome.configureTabs();
		//absenceHome.setActiveItem(absenceRollCall);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		//absenceRollCall.tabChosen();
	},
	
	showAllStudents: function () {
		var absenceHome = this.getAbsenceHome();
		var allStudents = this.getAbsenceAllStudents();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(allStudents);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showAllStaff: function () {
		var absenceHome = this.getAbsenceHome();
		var allStaff = this.getAbsenceAllStaff();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(allStaff);
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showMyKids: function () {
		var absenceHome = this.getAbsenceHome();
		var myKids = this.getAbsenceMyKids();
		absenceHome.configureTabs();
		absenceHome.setActiveItem(myKids);
		myKids.tabChosen();
		Ext.Viewport.animateActiveItem(absenceHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
		
	},
	
	showEdit: function() {
		var absenceEdit = this.getAbsenceEdit();
		console.log("Shoud go to edit screen");
		absenceEdit.loadData();
		Ext.Viewport.animateActiveItem(absenceEdit,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
		
	 	
})