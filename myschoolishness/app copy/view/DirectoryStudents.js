Ext.define('myschoolishness.view.DirectoryStudents', {
	extend: 'Ext.List',
	xtype: 'directory-students',
	alias : 'widget.directory-students',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-users',
		grouped: true,
		indexBar: true,
		pinHeaders: false,
		store : 'DirectoryStudentsStore',
		itemTpl:'{student_first} {student_last}',
		itemId:'Student Directory',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
				var me = this;
				sessionStorage.setItem("directory.student_id", record.get("student_id"));
				me.fireEvent('showFamily');                } // itemtaphold
        }
	},
    
    loadData: function () {
    console.log("DirectoryStudents load data");
		 //this.setStore(null);
		 	var studentStore = Ext.create('myschoolishness.store.DirectoryStudentsStore', {
			model: 'myschoolishness.model.DirectoryStudentsModel'
			});
			studentStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token"),
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								this.setStore(studentStore);
								console.log("SETTING StUDENT STORE");
							}
    					}
					})
	},
	
	onSearchKeyUp: function(queryString) {
  		var store = this.getStore();
  		store.clearFilter();
 
  		if(queryString){
   			var thisRegEx = new RegExp(queryString, "i");
   			store.filterBy(function(record) {
    		if (thisRegEx.test(record.get('student_first')) || thisRegEx.test(record.get('student_last')) || thisRegEx.test(record.get('parent_first')) || thisRegEx.test(record.get('parent_last')) || thisRegEx.test(record.get('class')) ) {
     			return true;
    			}
    		return false;
    		});
 		}
 	},
	
	onClearSearch: function() {
  		var store = this.getStore();
  		store.clearFilter();
 	},	
 	
	onDataUpdated: function () {
			var data = this.getStore().getData();
			var indexBar = this.getIndexBar();
			var allClasses = [];
			
			for (var i=0;i<data.length;i++) {
				var currClass = data.getAt(i).get('class');
				if (allClasses.indexOf(currClass)==-1) {
					allClasses.push(currClass);
				}

			}
			indexBar.setLetters(allClasses);
		}
		
})