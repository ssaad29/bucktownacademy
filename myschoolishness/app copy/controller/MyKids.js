Ext.define('myschoolishness.controller.MyKids', {
	extend: 'Ext.app.Controller',
	requires: [
	'myschoolishness.view.AbsenceMyKids',
	'myschoolishness.view.AbsenceRollCall',
	'myschoolishness.store.AbsenceMyKidsStore',
	'myschoolishness.store.AttendanceStore',
	'myschoolishness.model.AbsenceMyKidsModel',
	'myschoolishness.model.AttendanceModel'],
	config: {
		refs: {
			mainView: 'mainview',
			mykidsHome: 'mykids-home',
		},
		control: {
			
			mainView: {
			},
			
		},
        routes: {
            'myKidsHome': 'showMyKidsHome',
        }
	},
			
	showMyKidsHome: function () {
		console.log("show my kids home");
		var mykidsHomeView = this.getMykidsHome();
		//absenceList.loadData();
		Ext.Viewport.animateActiveItem(mykidsHomeView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	}
		
	 	
})