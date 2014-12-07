Ext.define('myschoolishness.view.ChildCrudCard', {
    extend: 'Ext.Panel',
	alias: "widget.childCrudCard",
    xtype: 'childCrudCard',
	fullscreen: true,
	requires: ['myschoolishness.model.validations.StudentNameValidation'],
	config: {
	title: 'Child Info',
	layout: 'fit',
	items: [    
                				{
                				xtype: 'titlebar',
                				title: "Settings",
                				itemId: 'prefTitlebar',
                				docked: 'top',
                				items: [{
		        				xtype: 'button',
		        				itemId:'backButtonChildCard',
		        				id:'backButtonChildCard',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				},
                				
                				{
		        				xtype: 'button',
		        				itemId:'saveButtonChildCard',
		        				id:'saveButtonChildCard',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Save'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'nextButtonChildCard',
		        				id:'nextButtonChildCard',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Next'
                				}]
        						},
        						{
        						xtype: 'panel',
        						layout: 'card',
        						itemId:'childPrefCardPanel',
		        				id:'childPrefCardPanel',
        						items: [
		        		        	{
                					xtype: 'student-details-panel',
                					itemId: 'studentDetailsPanel',
                					id: 'studentDetailsPanel'
		        		        	}, 
		        		        	{
                					xtype: 'student-parents-panel',
                					itemId: 'studentParentsPanel',
                					id: 'studentParentsPanel'
		        		        	}, 
		        		        	{
                					xtype: 'student-invite-panel',
                					itemId: 'studentInvitePanel',
                					id: 'studentInvitePanel'
		        		        	}, 
		        		        	{
                					xtype: 'student-name-panel',
                					itemId: 'studentNamePanel',
                					id: 'studentNamePanel'
		        		        	},
		        		        	{
                					xtype: 'student-student-class-grade-panel',
                					itemId: 'studentGradeClassPanel',
                					id: 'studentGradeClassPanel'
		        		        	},  
		        		        ]
		        		    }
		        		],
		        listeners: [
						{
						delegate: '#backButtonChildCard',
						event: 'tap',
						fn: 'onBackButtonTap'
						},
						{
						delegate: '#saveButtonChildCard',
						event: 'tap',
						fn: 'onSaveButtonTap'
						},
						{
						delegate: '#nextButtonChildCard',
						event: 'tap',
						fn: 'doNext'
						}
						],	
        			},

	
	doNext: function () {
		sessionStorage.setItem("backButtonIdx.index",-1);
		var saveButton = Ext.getCmp("saveButtonChildCard");	
		var nextButton = Ext.getCmp("nextButtonChildCard");	
		var card = this.getComponent("childPrefCardPanel");
		
		var idx = sessionStorage.getItem("newstudent.index");
		
		if (idx === null || idx === undefined) {
			idx = 3;
		} else {
			idx = parseInt(idx);
		}
		
		if (idx === 3) {
			var namePanel = Ext.getCmp("studentNamePanel");	
			namePanel.setFirstName("");	
			namePanel.setLastName("");	
			saveButton.setHidden(true);
			nextButton.setHidden(false);
			card.setActiveItem(idx);
			sessionStorage.setItem("newstudent.index","4");
		} else if (idx === 4) {
		console.log("In 4");
			var namePanel = Ext.getCmp("studentNamePanel");	
			var isValid = this.validateNameInfo(namePanel.getFirstName(),namePanel.getLastName());
			
			if (!isValid) {
				return;
			} else {
				saveButton.setHidden(true);
				nextButton.setHidden(false);
				var gradeClassPanel = Ext.getCmp("studentGradeClassPanel");	
				gradeClassPanel.loadData(null,null);
				card.setActiveItem(idx);
				sessionStorage.setItem("backButtonIdx.index",3);
				sessionStorage.setItem("newstudent.index","0");
			}
		} else if (idx === 0) {
			sessionStorage.setItem("backButtonIdx.index",4);
			var studentDetailsPanel = Ext.getCmp("studentDetailsPanel");
			studentDetailsPanel.setAllergies("");	
			studentDetailsPanel.setComments("");
			sessionStorage.setItem("newstudent.index",100);
			saveButton.setHidden(false);
			nextButton.setHidden(true);
			card.setActiveItem(idx);
		} 
	},
	
	validateNameInfo: function (first,last) { 		
		var nameValidation = Ext.create('myschoolishness.model.validations.StudentNameValidation',{
     		first: first,
     		last: last
		});
 
		var errs = nameValidation.validate();
		var msg = '';
 		
 		var returnVal = true;
 		
		if (!errs.isValid()) {
  			 errs.each(function (err) {
  			  		msg += err.getField() + ' : ' + err.getMessage() + '<br/>';
  			  		returnVal = false;
   			});
   		if (!returnVal) {
   			Ext.Msg.alert('ERROR', msg);
   		}
		} 
		
		return returnVal;
	},
	
	activateItem: function () {
		sessionStorage.setItem("backButtonIdx.index",-1);
		var saveButton = Ext.getCmp("saveButtonChildCard");	
		var nextButton = Ext.getCmp("nextButtonChildCard");	
		saveButton.setHidden(false);
		nextButton.setHidden(true);

		var card = this.getComponent("childPrefCardPanel");
		var idx = sessionStorage.getItem("edit_student.index");
		if (idx === null || idx === undefined) {
			idx = 0;
		} else {
			idx = parseInt(idx);
		}
		if (idx === 0) {
			card.setActiveItem(0);
		} else if (idx === 1) {
			card.setActiveItem(1);
		} else if (idx === 2) {
			card.setActiveItem(2);
		} else if (idx === 3) {
			card.setActiveItem(3);
		} else if (idx === 4) {
			card.setActiveItem(4);
		}
	},
						
   onBackButtonTap: function () {
   		var roles = sessionStorage.getItem("roles");
			
    	if (roles.indexOf("P") != -1 ) {
    			this.fireEvent("goHome", this);
    	} else {
   			var idx = sessionStorage.getItem("backButtonIdx.index");
   			var card = this.getComponent("childPrefCardPanel");
   		
			if (idx === null || idx === undefined) {
				idx = 0;
			} else {
				idx = parseInt(idx);
				if (idx === -1) {
					this.fireEvent("editStudent", this);
			} else {
				sessionStorage.setItem("newstudent.index",idx);
				this.doNext();
				}
			}
		}
	},
	
	onSaveButtonTap: function () {
		var createIndex = sessionStorage.getItem("newstudent.index");
		if (createIndex === "100") { //create a new student
			var createIndex = sessionStorage.setItem("newstudent.index","3");
			sessionStorage.setItem("newstudent.index",'3');
			var userId = sessionStorage.getItem("user_id");
			var insertStore = Ext.create('myschoolishness.store.StudentInsertStore', {
			model: "myschoolishness.model.StudentInsertModel"
			});
			insertStore.addAfterListener('load',this.afterInsertLoad,this);
			var namePanel = Ext.getCmp("studentNamePanel");	
			var firstName = namePanel.getFirstName();	
			var lastName = namePanel.getLastName();	
			var gradeClassPanel = Ext.getCmp("studentGradeClassPanel");	
			var grade = gradeClassPanel.getGrade();	
			var classroom = gradeClassPanel.getClassroom();	
			var studentDetailsPanel = Ext.getCmp("studentDetailsPanel");
			var allergies = studentDetailsPanel.getAllergies();	
			var comments = studentDetailsPanel.getComments();
			
			insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				userId: userId,
				insertMode: "new",
        		allergies: allergies,
        		comments: comments,
        		token: sessionStorage.getItem("token"),
        		firstName: firstName,
        		lastName: lastName,
        		grade: grade,
        		classroom: classroom,
    			},
    		});
		} else {
			
			var idx = sessionStorage.getItem("edit_student.index");
			if (idx === null || idx === undefined) {
				idx = 0;
			} else {
				idx = parseInt(idx);
			}
			console.log("idx --> " + idx);
			var userId = sessionStorage.getItem("user_id");
			var studentId = sessionStorage.getItem("child_crud.student_id");
			var insertStore = Ext.create('myschoolishness.store.StudentInsertStore', {
			model: "myschoolishness.model.StudentInsertModel"
			});
			insertStore.addAfterListener('load',this.afterUpdateLoad,this);
			
			
			if (idx === 0) {
				var studentDetailsPanel = Ext.getCmp("studentDetailsPanel");
				var allergies = studentDetailsPanel.getAllergies();	
				var comments = studentDetailsPanel.getComments();
			
			
				console.log("comments " + comments);
				insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				userId: userId,
				insertMode: "details",
        		studentId: studentId,
        		allergies: allergies,
        		comments: comments,
        		token: sessionStorage.getItem("token")
    			},
    		})
			
			} else if (idx === 3) {
				var namePanel = Ext.getCmp("studentNamePanel");	
				var firstName = namePanel.getFirstName();	
				var lastName = namePanel.getLastName();	
			
				insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				userId: userId,
				insertMode: "name",
        		studentId: studentId,
        		firstName: firstName,
        		lastName: lastName,
        		token: sessionStorage.getItem("token")
    			},
    		})
			} else if (idx === 4) {
				var gradeClassPanel = Ext.getCmp("studentGradeClassPanel");	
				var grade = gradeClassPanel.getGrade();	
				var classroom = gradeClassPanel.getClassroom();	
			
				insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				userId: userId,
				insertMode: "grade-class",
        		studentId: studentId,
        		grade: grade,
        		classroom: classroom,
        		token: sessionStorage.getItem("token")
    			},
    		})
	
		} 
		}
	},	
	

	afterInsertLoad: function(store, records, successful, operation, eOpts) {
		if (records.length === 1 && successful) {
    		Ext.Msg.alert('Success', 'New student added', Ext.emptyFn);
    		this.fireEvent("showStudentList", this);
    	}
	},
	
	loadData: function () {	
			var saveButton = Ext.getCmp("saveButtonChildCard");	
			var nextButton = Ext.getCmp("nextButtonChildCard");		
			saveButton.setHidden(false);
			nextButton.setHidden(true);


			var studentId = sessionStorage.getItem("child_crud.student_id");
			var studentParentsPanel = Ext.getCmp("studentParentsPanel");
			studentParentsPanel.loadData(studentId);	
			
			var studentStore = Ext.create('myschoolishness.store.GetStudentStore', {
			model: "myschoolishness.model.GetStudentModel"
			});
		
			studentStore.addListener('load',this. onStoreLoad,this);
    
        	studentStore.load({
    			//define the parameters of the store:
    		    		params: {
        		studentId: studentId,
        		token: sessionStorage.getItem("token")
    		},
			})
	},
	
	afterUpdateLoad: function(store, records, successful, operation, eOpts) {
		var roles = sessionStorage.getItem("roles");
			
		if (records.length === 1 && successful) {
    		Ext.Msg.alert('Success', 'Your changes have been saved', Ext.emptyFn);
    		if (roles.indexOf("P") != -1 ) {
    			this.fireEvent("goHome", this);
    		} else {
    			this.fireEvent("showStudentList", this);
    		}
    	}
	},
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
		if (successful===false) {
			myschoolishness.controller.Utils.sessionExpired();
		
			return;
		}
		
        if (myschoolishness.controller.Utils.hasRecords(records)) {
			for (var i=0;i<records.length;i++) {
				var firstName = this.getCleanValue(records[i].get("first_name"));
				var lastName = this.getCleanValue(records[i].get("last_name"));
				var allergies = this.getCleanValue(records[i].get("allergies"));
				var comments = this.getCleanValue(records[i].get("comments"));
				var grade = this.getCleanValue(records[i].get("grade"));
				var classroom = this.getCleanValue(records[i].get("classroom"));
				var namePanel = Ext.getCmp("studentNamePanel");	
				namePanel.setFirstName(firstName);	
				namePanel.setLastName(lastName);	
				var gradeClassPanel = Ext.getCmp("studentGradeClassPanel");	
				gradeClassPanel.loadData(grade,classroom);
				var studentDetailsPanel = Ext.getCmp("studentDetailsPanel");	
				studentDetailsPanel.setAllergies(allergies);	
				studentDetailsPanel.setComments(comments);
				}
		} else {
					console.log("No records");
		}
	},

	
	getCleanValue: function (text) {
		if (text==null || text=='undefined') {
			return null;
		}
		
		if (text.length < 1) {
			return  null;
		}
		
		return  text;
	},
		
})