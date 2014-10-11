Ext.define('myschoolishness.view.SignaturePanel', {
    extend: 'Ext.Container',
    alias: "widget.signatureview",
    xtype: 'signatureview',
    requires: [
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.ux.signaturefield'
    ],
config: {
        layout: 'card',
        items: [{
			xtype: 'formpanel',			
			padding: '10 10 10 10',
			items: [{
				xtype: 'fieldset',
				items: [{
					xtype: 'signaturefield',
					id: 'signatureField',
					sigWidth: 350,
					sigHeight: 160,
					label:'I Allow',
					labelWidth: '50%'
				},
				{
		        		xtype:'label',
		        		html: 'Field trip to the Zoo on June 19th 2014. Please wear a spirit shirt',
		        		itemId: 'signInFailedLabel',
		        	},
		        	]
			}
			
			]
		}]
    },
    initialize: function() {
        this.callParent();
    }
});