Ext.define('myschoolishness.view.ChooseParentsWindow', {
		extend: 'Ext.Panel',
	xtype: 'choose-parents',
	alias : 'widget.choose-parents',
	requires: ['Ext.List'],
	fullscreen: true,
	config: {
	title: 'Absence List',
	layout: 'fit',
	items: [    
                			{
                				xtype: 'titlebar',
                				title: "Choose Parent",
                				itemId: 'chooseParent',
                				id:'chooseParent',
                				docked: 'top',
                			items: [{
		        				xtype: 'button',
		        				itemId:'cancelButtonChooseParent',
		        				id:'cancelButtonChooseParent',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				},
                				]
        						}, 
        						{
        						xtype: 'list',
									title: 'Choose Parent' ,
									grouped: false,
									indexBar: false,
									title: 'Parents' ,
									store : 'ParentsStore',
									itemTpl:'{first_name} {last_name}',
									itemId:'chooseParentList',
		        					id:'chooseParentList',
		        							listeners: {
                										itemtap: function (list, idx, target, record, evt) {
                											sessionStorage.setItem("child_crud.chosen_parent_id",record.get("user_id"));
                											var me = this;
															this.parent.fireEvent('addParent',me);
                										}, // itemtaphold
											}
        						}
		        		],
		        	listeners: [
		        		{
						delegate: '#cancelButtonChooseParent',
						event: 'tap',
						fn: 'onCancelButtonTap'
						}
						],
		
        			},
	
	onCancelButtonTap: function () {
		 history.back();
	},
		
	loadData: function () {
			var chooseParentsList = Ext.getCmp("chooseParentList");	
		 	chooseParentsList.setStore(null);
		 	var parentStore = Ext.create('myschoolishness.store.ParentsStore', {
			model: 'myschoolishness.model.ParentsModel'
			});
			parentStore.addListener('load',this. onStoreLoad,this);
			
			parentStore.load({
    			//define the parameters of the store:
    		    params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				chooseParentsList.setStore(parentStore);
    		}
			})
			
			
	},
})