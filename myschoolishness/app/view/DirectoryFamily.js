Ext.define('myschoolishness.view.DirectoryFamily', {
    extend: 'Ext.Container',
    alias: 'widget.directory-family',
    xtype: 'directory-family',
    requires: ['Ext.Carousel','Ext.form.Panel','Ext.util.HashMap','Ext.SegmentedButton'],      
    config: {
    	layout: 'fit',
    	items:[ 
    	    {
                		xtype: 'titlebar',
                		itemId: 'familyTitlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'backButtonFamily',
		        			id:'backButtonFamily',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			{
                			xtype: 'segmentedbutton',
                			itemId:'segBtn',
                			id: 'segBtn',
                			align: 'right',
                			allowMultiple: false,
                			style: 'padding: 20px;',
                			items: [{
                    		text: 'Children',
                    		pressed: true
                			}, {
                    		text: 'Parents'
                			}
                			]} 
                			]
           	},
    		{
    			id: 'familyCarousel',
    			itemId: 'familyCarousel',
                xtype: 'carousel',
                fullscreen:true,
                flex:1,
                styleHtmlContent: true
            }
    	    ],
    	     listeners: [
		        			{
							delegate: '#backButtonFamily',
							event: 'tap',
							fn: 'onBackButtonTap'
							},
							{
							delegate: '#segBtn',
							event: 'toggle',
							fn: 'onSegButtonTap'
							}
						]
    },
	
    onBackButtonTap: function () {
		this.fireEvent("goHome", this);
	},
	
	onSegButtonTap: function () {
		 this.loadFamily();
	},

	loadFamily: function () {
	console.log("LOAD FAMILY called");
		var student_id = sessionStorage.getItem("directory.student_id");
		var familyStore = Ext.create('myschoolishness.store.DirectoryFamilyStore', {
			model: "myschoolishness.model.DirectoryFamilyModel"
			});
			familyStore.addListener('load',this. onStoreLoad,this);

        	familyStore.load({
    			//define the parameters of the store:
    		    params: {
        		student_id: student_id,
        		token: sessionStorage.getItem("token")
    			},
			});
	},
	
	contains: function(aList, obj) {
    	var i = aList.length;
    	while (i--) {
       		if (aList[i] === obj) {
           	return true;
       		}
    	}
    	return false;
	},
	
	getStudentView: function(record) {
	var studentForm = Ext.create('Ext.form.FormPanel', {
			fullscreen:true,
			layout:'fit',
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    name: 'fname',
                    label: 'First:',
                    readOnly: true,
                    value:record.get("student_first"),
                }, 
                {
                    xtype: 'textfield',
                    name: 'lname',
                    label: 'Last:',
                    readOnly: true,
                    value:record.get("student_last"),
                },
                {
                    xtype: 'textfield',
                    name: 'class',
                    label: 'Class:',
                    readOnly: true,
                    value:record.get("class"),
                },
                {
                    xtype: 'textfield',
                    name: 'grade',
                    label: 'Grade:',
                    readOnly: true,
                    value:record.get("grade"),
                },
                {
                    xtype: 'textfield',
                    name: 'allergies',
                    label: 'Allergies:',
                    readOnly: true,
                    value:record.get("allergies"),
                },
                {
                    xtype: 'textfield',
                    name: 'comments',
                    label: 'Comments:',
                    readOnly: true,
                    value:record.get("comments"),
                },
                ] // items
            }] 
        }); // create()
        
        return studentForm;
	},
	
	getParentView: function(record) {
	var parentForm = Ext.create('Ext.form.Panel', {
			fullscreen:true,
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    name: 'fname',
                    label: 'First:',
                    readOnly: true,
                    value:record.get("parent_first"),
                }, 
                {
                    xtype: 'textfield',
                    name: 'lname',
                    label: 'Last:',
                    readOnly: true,
                    value:record.get("parent_last"),
                },
                {
                    xtype: 'emailfield',
                    name: 'email',
                    label: 'Email:',
                    styleHtmlContent: true,
                    html:[record.get("display_email")],
                },
                {
                	styleHtmlContent: true,
    				html: [record.get("display_phone")], 
                    xtype: 'textfield',
                    name: 'phone',
                    label: 'Phone:',
                },
                {
                    xtype: 'textfield',
                    name: 'addr1',
                    label: 'Address 1:',
                    styleHtmlContent: true,
                    html:[record.get("display_addr1")],
                },
                {
                    xtype: 'textfield',
                    name: 'addr2',
                    label: 'Address 2:',
                	styleHtmlContent: true,
                    html:[record.get("display_addr2")],
                },
                {
                    xtype: 'textfield',
                    name: 'city',
                    label: 'City:',
                    styleHtmlContent: true,
                    html:[record.get("display_city")],
                },
                {
                    xtype: 'textfield',
                    name: 'state',
                    label: 'State:',
                    styleHtmlContent: true,
                    html:[record.get("display_state")],
                },
                {
                    xtype: 'textfield',
                    name: 'zip',
                    label: 'Zip:',
                    styleHtmlContent: true,
                    html:[record.get("display_zip")],
                },
                ] // items
            }] 
        }); // create()
        
        return parentForm;
	},
		onStoreLoad: function(store, records, successful, operation, eOpts) {

			if (successful===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}

			var items = [];
			var studentids = [];
			var parentids = [];
			var carousel = this.getComponent("familyCarousel");
			var segButton = Ext.getCmp("segBtn");
			var parentOrChildren = segButton.getPressedButtons()[0].getText();

			carousel.removeAll(true);
			if (myschoolishness.controller.Utils.hasRecords(records)) {
			for (var i=0;i<records.length;i++) {
			     var currStudentId = records[i].get("student_id");
			      var currParentId = records[i].get("user_id");
			      var public_profile = records[i].get("public_profile");
			      
			      if (public_profile === 0) {
			      	records[i].set("display_zip","private");
			      	records[i].set("display_state","private");
			      	records[i].set("display_city","private");
			      	records[i].set("display_addr2","private");
			      	records[i].set("display_addr1","private");
			      	records[i].set("display_email","private");
			      	records[i].set("display_phone","private");
			      	records[i].set("display_cell","private");
			      } else {
			      	records[i].set("display_zip",records[i].get('zip'));
			      	records[i].set("display_state",records[i].get('state'));
			      	records[i].set("display_city",records[i].get('city'));
			      	records[i].set("display_addr2",records[i].get('addr2'));
			      	records[i].set("display_addr1",records[i].get('addr1'));
			      	records[i].set("display_email",'<a href="mailto:{' + records[i].get("email") + '}">' + records[i].get("email") + '</a>');
			      	records[i].set("display_phone",'<a href="tel:{' + records[i].get("phone") + '}">' + records[i].get("phone") + '</a>');
			      	records[i].set("display_cell",'<a href="tel:{' + records[i].get("cell_phone") + '}">' + records[i].get("cell_phone") + '</a>');
			      }
			      
			     if (studentids.indexOf(currStudentId)==-1 && (parentOrChildren==="Children")) {
			     	studentids.push(currStudentId);
			     	items.push(this.getStudentView(records[i])); 
			     } 
			     if (parentids.indexOf(currParentId)==-1 && (parentOrChildren==="Parents")) {
			     	parentids.push(currParentId);
			     	items.push(this.getParentView(records[i])); 
			     }
			}	
			}	
			carousel.setItems(items);
      		carousel.setActiveItem(0);	
		}

})