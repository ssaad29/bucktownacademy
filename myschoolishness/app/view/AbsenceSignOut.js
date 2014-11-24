Ext.define('myschoolishness.view.AbsenceSignOut', {
	extend: 'Ext.List',
	xtype: 'absence-signout',
	alias : 'widget.absence-signout',
	requires: ['Ext.List'],
	config: {
		iconCls: 'check',
		title: 'Sign Out' ,
		grouped: false,
		indexBar: false,
		store: 'IsSignedOutStore',
		itemTpl:'{display_first_name} {display_last_name} ',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
                	sessionStorage.setItem("attendance.student_id", record.get("student_id"));
                	list.fireShowSignaturePad()
        		}
        		
			}
		},
	
	
	fireShowSignaturePad: function () {	
	console.log("FIRE showSigPanel");
	 	this.checkSignature();
	},
	
	checkSignature: function (imageData) {
    		console.log("checkSignature called");
		 	var checkSignatureStore = Ext.create('myschoolishness.store.CheckSignedOutStore', {
			model: 'myschoolishness.model.CheckSignedOutModel'
			});
			console.log("checkSignatureStore student ID " + sessionStorage.getItem("attendance.student_id"));
			checkSignatureStore.load({
    		//define the parameters of the store:
    		params: {
        		student_id: sessionStorage.getItem("attendance.student_id"),
        		token: sessionStorage.getItem("token"),
    		    				},
    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								if (records.length===0) {
									//console.log("No signature found for today. Inserting");
									//this.insertSignature(imageData);
									this.fireEvent('showSigPanel');
								} else {
									Ext.Msg.alert('Unable to complete', 'Already signed out for today', Ext.emptyFn);
								}
							}
    					}
					})
	},		
	tabChosen: function () {	
	 	this.loadData();
	},
	
    loadData: function () {		
		this.setStore(null);
			var signOutStore = Ext.create('myschoolishness.store.IsSignedOutStore', {
			model: "myschoolishness.model.IsSignedOutModel"
			});
		
			signOutStore.addListener('load',this. onStoreLoad,this);
        	signOutStore.load({
    			//define the parameters of the store:
    		    		params: {
        		token: sessionStorage.getItem("token")
    			},

    		scope: this,
    		callback : function(records, operation, success) {}
			})
	},
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
			console.log("1: onStoreLoad RECORDS " + records.length);
			var newRecordArray = [];
			var dupesArray =[];
			var signedOutRecords =[];
			
			for (var i=0;i<records.length;i++) {
				console.log("SIGNED OUT?" + records[i].get('signed_out_today'));
				if (records[i].get('signed_out_today')==="1") {
					signedOutRecords.push(records[i].get('student_id'));
				}
				if (dupesArray.indexOf(records[i].get('student_id')) === -1) {
					newRecordArray.push(records[i]);
					dupesArray.push(records[i].get('student_id'));
				} 	
			}
			
			records.length = 0
			for (var i=0;i<newRecordArray.length;i++) {
					if (signedOutRecords.indexOf(newRecordArray[i].get('student_id')) != -1) {
						newRecordArray[i].set('signed_out_today',"1");
					}
					records.push(newRecordArray[i]);
			}
			for (var i=0;i<records.length;i++) {
					if (records[i].get("signed_out_today") === null || records[i].get("signed_out_today") === 0 || records[i].get("signed_out_today") === '0') {
						records[i].set('display_first_name', "<font color='black'> " + records[i].get("first_name") );
						records[i].set('display_last_name', records[i].get("last_name") + "</font>" );

					} else {
						records[i].set('display_first_name', "<font color='red'> " + records[i].get("first_name") );
						records[i].set('display_last_name', records[i].get("last_name") + "</font>" );
					}
				}
				
			store.setData(records);
			this.setStore(store);

    }
    
    

})