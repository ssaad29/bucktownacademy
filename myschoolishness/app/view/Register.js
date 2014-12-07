Ext.define('myschoolishness.view.Register', {
    extend: 'Ext.Panel',
	alias: "widget.register",
	xtype: 'register',
	config: {
		title: 'Register',
		fullstreen: true,
		itemId:'registration',
		items: [
		        		{
		        		xtype: 'fieldset',
		        		items: [
		        					{
		        		        		xtype: 'label',
            							html: 'I have reviewed:',
		        		        	},
		        		        	{
		        		        		xtype: 'togglefield',
            							name: 'toc',
            							itemId:'toc',
            							id:'toc',
            							label: 'Terms of Use and I accept',
            							value:0,
            							labelWidth: '70%'
		        		        	},
		        		        	{
		        		        		xtype: 'togglefield',
            							name: 'privacy',
            							itemId:'privacy',
            							id:'privacy',
            							label: 'Privacy Policy and I accept',
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
		
