Ext.define('myschoolishness.view.DirectoryStaffDetail', {
    extend: 'Ext.Panel',
    alias: 'widget.directory-staff-detail',
    xtype: 'directory-staff-detail',
   fullscreen: true,
           	config: {
		title: 'Login',
		fullstreen: true,
		items: [
		    	{
                		xtype: 'titlebar',
                		itemId: 'staffTitlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'backButtonStaff',
		        			id:'backButtonStaff',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			}
                			]
           		},
				{
                    xtype: 'textfield',
                    name: 'fname',
                    label: 'First:',
                    readOnly: true,
                    itemId: 'fname',
                }, 
                {
                    xtype: 'textfield',
                    name: 'lname',
                    label: 'Last:',
                    readOnly: true,
                    itemId: 'lname',

                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    styleHtmlContent: true,
                    label: 'Email:',
                    readOnly: true,
                    itemId: 'email',

                },
                {
                    xtype: 'textfield',
                    name: 'phone',
                    styleHtmlContent: true,
                    label: 'Phone:',
                    readOnly: true,
                    itemId: 'phone',

                },
                {
                    xtype: 'textfield',
                    name: 'addr1',
                    label: 'Address 1:',
                    readOnly: true,
                    itemId: 'addr1',
                    itemId: 'addr1',

                },
                {
                    xtype: 'textfield',
                    name: 'addr2',
                    label: 'Address 2:',
                    readOnly: true,
                    itemId: 'addr2',

                },
                {
                    xtype: 'textfield',
                    name: 'city',
                    label: 'City:',
                    readOnly: true,
                    itemId: 'city',

                },
                {
                    xtype: 'textfield',
                    name: 'state',
                    label: 'State:',
                    readOnly: true,
                    itemId: 'state',

                },
                {
                    xtype: 'textfield',
                    name: 'zip',
                    label: 'Zip:',
                    readOnly: true,
                    itemId: 'zip',

                }
					
		        ],
		listeners: [
		        			{
							delegate: '#backButtonStaff',
							event: 'tap',
							fn: 'onBackButtonTap'
							}
						]
	},
	
	onBackButtonTap: function () {
		this.fireEvent("showStaffDetail", this);
	},
	
	loadStaff: function () {
		var user_id = sessionStorage.getItem("directory.user_id");
		
		var staffStore = Ext.create('myschoolishness.store.DirectoryStaffDetailStore', {
			model: "myschoolishness.model.DirectoryStaffDetailModel"
			});
			staffStore.addListener('load',this. onStoreLoad,this);

        	staffStore.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    			},
			});
	},
	
	
		onStoreLoad: function(store, records, successful, operation, eOpts) {

			if (successful===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
					
		if (myschoolishness.controller.Utils.hasRecords(records)) {
			var firstName = this.getComponent("fname");
			var lasttName = this.getComponent("lname");
			var email = this.getComponent("email");
			var phone = this.getComponent("phone");
			var addr1 = this.getComponent("addr1");
			var addr2 = this.getComponent("addr2");
			var city = this.getComponent("city");
			var state = this.getComponent("state");
			var zip = this.getComponent("zip");

			for (var i=0;i<records.length;i++) {
				firstName.setValue(records[i].get("first_name"));
				lasttName.setValue(records[i].get("last_name"));
				email.setHtml('<a href="mailto:{' + records[i].get("email") + '}">' + records[i].get("email") + '</a>');
				phone.setHtml('<a href="tel:{' + records[i].get("phone") + '}">' + records[i].get("phone") + '</a>');
				addr1.setValue(records[i].get("addr1"));
				addr2.setValue(records[i].get("addr2"));
				city.setValue(records[i].get("city"));
				state.setValue(records[i].get("state"));
				zip.setValue(records[i].get("zip"));
			}		
		}
		}

})