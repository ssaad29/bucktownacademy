Ext.define('myschoolishness.controller.Signature', {
    extend : 'Ext.app.Controller',
    
    config: {
        control: {
            'button[action=getSignature]': {
                tap: 'getSignature'
            },
            'button[action=setSignature]': {
                tap: 'setSignature'
            }
        },
        refs: {
        	mainView: 'mainview',
            signatureField: 'signoutview signaturefield[name=signature]'
        }
    },
    
    getSignature: function() {
    	console.log("Get signature called");
        var imageData = this.getSignatureField().getValue();
        this.insertSignature(imageData);
        var mainView = this.getMainView();
		mainView.setMasked(false);
		Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
		this.getSignatureField().setValue("");
    },
    
    insertSignature: function (imageData) {
		 	var insertSignatureStore = Ext.create('myschoolishness.store.InsertSignatureStore', {
			model: 'myschoolishness.model.InsertSignatureModel'
			});
			insertSignatureStore.load({
    		//define the parameters of the store:
    		params: {
        		student_id: sessionStorage.getItem("attendance.student_id"),
        		action: 'checkout',
        		token: sessionStorage.getItem("token"),
        		signature: imageData,
    		    				},
    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								console.log("Signature insert successful");
							}
    					}
					})
	},
	
    setSignature: function() {
        var sampleData = 'data:image/png;base64,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';
        this.getSignatureField().setValue(sampleData);
    }
});