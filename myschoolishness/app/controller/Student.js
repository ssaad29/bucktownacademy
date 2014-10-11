Ext.define('myschoolishness.controller.Student', {
	extend: 'Ext.app.Controller',
	requires: ['myschoolishness.view.UserCrudCard','myschoolishness.view.ChildCrudCard'],
	
	config: {
		refs: {
			editUserView: 'edituserview',
			userCrudCard: 'userCrudCard',
			childCrudCard: 'childCrudCard',
			mainView: 'mainview'
		},
				
		routes: {
            'editStudent/userCard': 'showUserCard',
            'editUser/childCard': 'showChildCard',
            'home': 'goHome',
            'editUser': 'showEditUser'
        }

	},
	
	showEditUser: function () {
		var editUserView = this.getEditUserView();
		editUserView.configureList();
		Ext.Viewport.animateActiveItem(editUserView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showUserCard: function () {
		var userCrudCard = this.getUserCrudCard();
		userCrudCard.activateItem();
		Ext.Viewport.animateActiveItem(userCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showChildCard: function () {
		var childCrudCard = this.getChildCrudCard();
		childCrudCard.loadData();
		childCrudCard.onSegButtonTap();
		Ext.Viewport.animateActiveItem(childCrudCard,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
			
	goHome: function () {
		var mainView = this.getMainView();
		mainView.setMasked(false);
		Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	 	
})