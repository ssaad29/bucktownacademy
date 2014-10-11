Ext.define('myschoolishness.view.StudentClassGradePanel', {
    extend: 'Ext.Panel',
	alias: 'widget.student-student-class-grade-panel',
	xtype: 'student-student-class-grade-panel',
config: {
		title: 'Student Class Grade Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'studentClassGradeForm',
		        	items: [
		        		    {
                    		xtype: 'selectfield',
                    		label: 'Grade',
		        			itemId: 'gradeField',
                    		options: []
                    		},
                    		{
                    		xtype: 'selectfield',
                    		label: 'Homeroom',
		        			itemId: 'classField',
                    		options: []
                    		},
		        		    ]
		        }],
},

loadData: function (grade,classroom) {	
			var gradesStore = Ext.create('myschoolishness.store.GradesStore', {
			model: "myschoolishness.model.GradesModel"
			});
		
        	gradesStore.load({
    			//define the parameters of the store:
    		    params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token")
    		},


    		scope: this,
    		callback : function(records, operation, success) {
				var gradeField = Ext.ComponentQuery.query("#gradeField");
				var options = [];
				for (var i=0;i<records.length;i++) {
					var gradeName = records[i].get("name");
					options[i] = {text: gradeName, value:gradeName, leaf: true }
				}
				gradeField[0].setOptions(options);
				if (grade!=null) {
					gradeField[0].setValue(grade);
				}
    		}
			});
			
			var classroomStore = Ext.create('myschoolishness.store.ClassroomStore', {
			model: "myschoolishness.model.ClassroomModel"
			});
		
        	classroomStore.load({
    			//define the parameters of the store:
    		    params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {

			if (success===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
				myschoolishness.controller.Utils.hasRecords(records); //Check for session validity
				var classField = Ext.ComponentQuery.query("#classField");
				var options = [];
				for (var i=0;i<records.length;i++) {
					var className = records[i].get("name");
					options[i] = {text: className, value:className, leaf: true}
				}
				classField[0].setOptions(options);
				if (classroom!=null) {
					classField[0].setValue(classroom);
				}
    		}
			});
},
	
getGrade: function () {
	var fieldSet = this.getComponent('studentClassGradeForm');
	var gradeField = fieldSet.getComponent("gradeField");
	
	return gradeField.getValue();
},

getClassroom: function () {
	var fieldSet = this.getComponent('studentClassGradeForm');
	var classField = fieldSet.getComponent("classField");

	return classField.getValue();
},

setGrade: function (value) {
	var fieldSet = this.getComponent('studentClassGradeForm');
	var gradeField = fieldSet.getComponent("gradeField");
	
	return gradeField.setValue(value);
},

setClassroom: function (value) {
	var fieldSet = this.getComponent('studentClassGradeForm');
	var classField = fieldSet.getComponent("classField");

	return classField.setValue(value);
},


})