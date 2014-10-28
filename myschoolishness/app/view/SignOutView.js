Ext.define('myschoolishness.view.SignOutView', {
    extend: 'Ext.Container',
    xtype: 'signoutview',
	alias : 'widget.signoutview',
    requires: [
		'Ext.form.Panel',
		'Ext.form.FieldSet'
    ],
config: {
        layout: 'vbox',
        scrollable: null,
        items:[{
            xtype: 'spacer',
            flex: 1
        },{
            xtype: 'formpanel',
            width: 600,
            height: 360,
            centered: true,
            items: [{
                xtype: 'toolbar',
                title: 'Sign Out'
                
            },{
                xtype: 'fieldset',
                margin: '1em 2em',
                items: [{
                	itemId: 'signoutsig',
                	id: 'signoutsig',
                    xtype: 'signaturefield',
                    name: 'signature',
                    label: 'Sign out at ' + myschoolishness.controller.Utils.getTimeStamp()
                }]
            },{
                xtype: 'button',
                text: 'Done',
                margin:'1em 2em',
                action: 'getSignature'
            }]
        },{
            xtype: 'spacer',
            flex: 1
        }]
    },
    
    clearSignature: function () {
    	console.log("Clear SIG called");
	 var signaturePad = Ext.getCmp("signoutsig");
	 signaturePad.resetCanvas();
	},
    
});