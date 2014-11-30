Ext.define('myschoolishness.view.SignOutView', {
    extend: 'Ext.Panel',
    xtype: 'signoutview',
	alias : 'widget.signoutview',
    requires: [
		'Ext.form.Panel',
		'Ext.form.FieldSet'
    ],
config: {
        layout: 'vbox',
       // scrollable: null,
            items: [{
                xtype: 'toolbar',
                title: 'Sign Out'
                
            },{
                xtype: 'fieldset',
                //margin: '1em 2em',
                //width:"100%",
                flex:2,
                border:0,
                layout: 'fit',
                items: [{
                	itemId: 'signoutsig',
                	id: 'signoutsig',
                    xtype: 'signaturefield',
                    name: 'signature',
                    //label:"10%",
                    align:'center'
                }]
            },{
                xtype: 'button',
                text: 'Done',
                //margin:'1em 2em',
                action: 'getSignature'
            },
            {
                xtype: 'button',
                text: 'Cancel',
                //margin:'1em 2em',
                action: 'cancelSignature'
            }
            ]
    },
    
    clearSignature: function () {
     console.log("Clear SIG called");
	 var signaturePad = Ext.getCmp("signoutsig");
	},
    
});