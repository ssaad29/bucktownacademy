Ext.define('myschoolishness.view.Register', {
    extend: 'Ext.Panel',
	alias: "widget.register",
	xtype: 'register',
	requires: [
		'Ext.ux.signaturefield'
    ],
	config: {
		title: 'Register',
		fullstreen: true,
		itemId:'registration',
		items: [
		        	{
		        		xtype: 'fieldset',
		        		items: [
		        		        	{
		        		        		xtype: 'togglefield',
            							name: 'toc',
            							itemId:'toc',
            							id:'toc',
            							label: 'I have reviewed the Terms of Use and I accept them',
            							value:0,
            							labelWidth: '70%'
		        		        	},
		        		        	{
		        		        		xtype: 'togglefield',
            							name: 'privacy',
            							itemId:'privacy',
            							id:'privacy',
            							label: 'I have reviewed the Privacy Policy and I accept its terms',
            							labelWidth: '70%'
		        		        	},
		        		        	
									
		        		        ]
		        	},
		        	
		        	
		        	
		        	
		     ],  
		listeners: [
		        		{
						delegate: '#toc',
						event: 'tap',
						fn: 'onBackButtonTap'
						}
						],
		},
		
		getPrivacy: function() {
			var privacy = this.down('#privacy');
						
			return privacy.getValue();
		},
		
		getTOC: function() {
			var toc = this.down('#toc');
			
			return toc.getValue();
		},
		
		initialize: function() {
        	this.callParent();
   	 	}
	
		})
		
