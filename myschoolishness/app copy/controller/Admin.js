Ext.define('myschoolishness.controller.Admin', {
	extend: 'Ext.app.Controller',
	requires: ['myschoolishness.view.AdminHome'],
	config: {
		refs: {
			mainView: 'mainview',
			staffHome: 'admin-home',
			childCrudCard: 'childCrudCard',
			manageStudents: 'manage-students',
			manageParents: 'manage-parents',
			parentChooser: 'choose-parents',
			classChooser: 'choose-class',
			studentParentsPanel: 'student-parents-panel',
			editUserView: 'edituserview',
			editStudentView: 'editstudentview',
			userCrudCard: 'userCrudCard',
			editBulletinView: 'editbulletinview',
			manageBulletins: 'manage-bulletins',
			bulletinCrudCard: 'bulletincrudcard',
			bulletinClassroomsPanel: 'bulletins-classrooms-panel',
			viewbulletindetails: 'viewbulletindetails',
			loginView: 'loginview',
			adminHome: 'admin-home'
		},
		control: {
			adminHome: {
				goHome: 'goHome',
			},
			viewbulletindetails: {
				goHome: 'goHome',
			},
			loginview: {
				doNewRegistration: 'newRegistration',
				doForgotPassword: 'forgotPassword'
			},
			manageStudents: {
				editStudent: 'showEditStudent',
				newStudent: 'newStudent'
			},
			manageParents: {
				showEditUser: 'showEditUser',
				showNewUser: 'newUser',
			},
			manageBulletins: {
				editBulletin: 'editBulletin',
				newBulletin: 'newBulletin'
			},
			editStudentView: {
				showStudentList: 'showStudentAdminList',
				showChildCard: 'showChildCard'
			},
			editUserView: {
				showUserCard: 'showUserCard',
				showParentList: 'showParentAdminList',
				goHome: 'goHome',
			},
			parentChooser: {
				addParent: 'addParent'
			},
			studentParentsPanel: {
				showParentChooser: 'showParentsChooser',
				showChildCard: 'showChildCard'
			},
			classChooser: {
				addClass: 'addClassroom'
			},
			mainView: {
				showStaff: 'showStaffHome',
				goHome: 'goHome',
			},
			bulletinCrudCard: {
				showEditBulletin: 'editBulletin',
				showBulletinList: 'showBulletinAdminList'
			},
			bulletinClassroomsPanel: {
				chooseClass: 'showClassChooser'
			},
			childCrudCard: {
				showStudentList: 'showStudentAdminList',
				editStudent: 'showEditStudent'
			},
			userCrudCard: {
				showChildCard: 'showChildCard',
				showParentAdminList: 'showParentAdminList',
				showEditUser: 'showEditUser',
			},
			editBulletinView: {
				showBulletinCrudCard: 'showBulletinCrudCard',
				showBulletinList: 'showBulletinAdminList'
			}
		},
        routes: {
            'staff': 'showStaffHome',
            'bulletinList': 'showBulletinAdminList',
            'parentList': 'showParentAdminList',
            'studentList': 'showStudentAdminList',
            'editStudent': 'editStudent',
            'editStudent/Parents/chooseParent': 'showParentsChooser',
            'editStudent/Bulletins/chooseClass': 'showClassChooser',
            'bulletins/addClass': 'addClassroom',
            'newStudent': 'newStudent',
            'newUser': 'newUser',
            'newBulletin': 'newBulletin',
            'newRegistration': 'newRegistration',
            'forgotPassword': 'forgotPassword',
            'editUser/userCard': 'showUserCard',
            'home': 'goHome',
            'editUser': 'showEditUser',
            'editBulletin': 'editBulletin',
            'bulletinCrudCard': 'showBulletinCrudCard',
            'editUser/editStudent': 'showEditStudent',
            'editUser/editStudent/childCard': 'showChildCard'
        }
	},
	
	showBulletinAdminList: function () {
		var staffHome = this.getStaffHome();
		staffHome.showBulletins();
		Ext.Viewport.animateActiveItem(staffHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showParentAdminList: function () {
		var staffHome = this.getStaffHome();
		staffHome.showParents();
		Ext.Viewport.animateActiveItem(staffHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showStudentAdminList: function () {
		var staffHome = this.getStaffHome();
		staffHome.showStudents();
		Ext.Viewport.animateActiveItem(staffHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showBulletinCrudCard: function () {
		var bulletinCrudCard = this.getBulletinCrudCard();
		bulletinCrudCard.activateItem();
		bulletinCrudCard.loadData();
		Ext.Viewport.animateActiveItem(bulletinCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	editBulletin: function () {
		var editBulletinView = this.getEditBulletinView();
		editBulletinView.configureList();
		Ext.Viewport.animateActiveItem(editBulletinView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showEditUser: function () {
		var editUserView = this.getEditUserView();
		editUserView.configureList();
		Ext.Viewport.animateActiveItem(editUserView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showUserCard: function () {
		console.log("SHOWING USER CARD");
		var userCrudCard = this.getUserCrudCard();
		userCrudCard.activateItem();
		Ext.Viewport.animateActiveItem(userCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showEditStudent: function () {
		console.log("showEditStudent ");
		var editStudentView = this.getEditStudentView();
		editStudentView.configureList();
		Ext.Viewport.animateActiveItem(editStudentView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showChildCard: function () {
		var childCrudCard = this.getChildCrudCard();
		childCrudCard.loadData();
		childCrudCard.activateItem();
		Ext.Viewport.animateActiveItem(childCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
			
	goHome: function () {
		var mainView = this.getMainView();
		mainView.setMasked(false);
		Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	newRegistration: function () {
		var userCrudCard = this.getUserCrudCard();
		userCrudCard.doRegister();
		
		Ext.Viewport.animateActiveItem(userCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	forgotPassword: function () {
		var userCrudCard = this.getUserCrudCard();
		userCrudCard.doPasswordReset();
		Ext.Viewport.animateActiveItem(userCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	newBulletin: function () {
		var bulletinCrudCard = this.getBulletinCrudCard();
		bulletinCrudCard.doNext();
		Ext.Viewport.animateActiveItem(bulletinCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	newUser: function () {
		var userCrudCard = this.getUserCrudCard();
		userCrudCard.doNext();
		Ext.Viewport.animateActiveItem(userCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	newStudent: function () {
		var childCrudCard = this.getChildCrudCard();
		childCrudCard.doNext();
		Ext.Viewport.animateActiveItem(childCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	addParent: function () {
		var studentParentsPanel = this.getStudentParentsPanel();
		studentParentsPanel.addParent();
		sessionStorage.setItem("edit_student.index","1");
		
	},
	
	addClassroom: function () {
		var bulletinClassroomsPanel = this.getBulletinClassroomsPanel();
		bulletinClassroomsPanel.addClassroom();
		sessionStorage.setItem("edit_bulletin.index","1");
		this.showBulletinCrudCard();
		//Ext.Viewport.animateActiveItem(bulletinClassroomsPanel,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showStaffHome: function () {
		var staffHome = this.getStaffHome();
		staffHome.setRoles();
		Ext.Viewport.animateActiveItem(staffHome,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showParentsChooser: function () {
		var parentChooser = this.getParentChooser();
		parentChooser.loadData();
		Ext.Viewport.animateActiveItem(parentChooser,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showClassChooser: function () {
		var classChooser = this.getClassChooser();
		classChooser.loadData();
		Ext.Viewport.animateActiveItem(classChooser,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},		 	
})