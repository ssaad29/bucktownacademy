Ext.define('myschoolishness.view.ChooseClassWindow', {
		extend: 'Ext.Panel',
	xtype: 'choose-class',
	alias : 'widget.choose-class',
	requires: ['Ext.List'],
	fullscreen: true,
	config: {
	title: 'Class Chooser',
	layout: 'fit',
	items: [    
                			{
                				xtype: 'titlebar',
                				title: "Choose Class",
                				itemId: 'chooseClass',
                				id:'chooseClass',
                				docked: 'top',
                			items: [{
		        				xtype: 'button',
		        				itemId:'cancelButtonChooseClass',
		        				id:'cancelButtonChooseClass',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				},
                				]
        						}, 
        						{
        						xtype: 'list',
									title: 'Choose Class' ,
									grouped: false,
									indexBar: false,
									title: 'Classroom' ,
									store : 'ClassroomStore',
									itemTpl:'{name} ',
									itemId:'chooseClassList',
		        					id:'chooseClassList',
		        							listeners: {
                										itemtap: function (list, idx, target, record, evt) {
                											console.log("redirecting now");
                											sessionStorage.setItem("classroom_id",record.get("id"));
                											this.fireEvent("addClass", this);
                										}, // itemtaphold
											}
        						}
		        		],
		        	listeners: [
		        		{
						delegate: '#cancelButtonChooseClass',
						event: 'tap',
						fn: 'onCancelButtonTap'
						}
						],
		
        			},
		
	loadData: function () {
			var chooseClassList = Ext.getCmp("chooseClassList");	
		 	chooseClassList.setStore(null);
		 	var classStore = Ext.create('myschoolishness.store.ClassroomStore', {
			model: 'myschoolishness.model.ClassroomModel'
			});
			classStore.addListener('load',this. onStoreLoad,this);
			
			classStore.load({
    			//define the parameters of the store:
    		    params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				chooseClassList.setStore(classStore);
    		}
			})
			
			
	},
	
	onCancelButtonTap: function () {
		 history.back();
	},
})