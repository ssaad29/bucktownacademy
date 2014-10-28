Ext.define('myschoolishness.view.SignaturePad', {
    extend: 'Ext.Container',
    alias: 'widget.signaturepad',
    xtype: 'signaturepad',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: 600,
    height: 300,
    border: 1,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    
    items: [
        {
            xtype: 'panel',
            id: 'signature',
            html: '<canvas id="signaturePanel" width="600" height="300">no canvas support</canvas>'
        },
        {
                    xtype: 'button',
                    text: 'Save Signature',
                    id: 'save',
                    disabled: true,
                  },
                  {
                    xtype: 'button',
                    text: 'Clear Signature',
                    id: 'clear'
        }]
   
});