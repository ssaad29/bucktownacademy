Ext.define('myschoolishness.view.UserAgreement', {
    extend: 'Ext.TabPanel',
	alias: 'widget.user-agreement-panel',
	xtype: 'user-agreement-panel',
	tabBarPosition: 'bottom',

            defaults: {
                styleHtmlContent: true
            },
config: {
		title: 'User Agreement Form',
		fullstreen: true,
        items:  [{
                title: 'Agreement',
                itemId: 'agreement',
                xtype: 'register',
            }, {
                title: 'Terms of User',
                itemId: 'terms',
                xtype: 'scrollabletextarea',
                readOnly: true,
                maxRows : 40
            },
            {
                title: 'Privacy Policy',
                itemId: 'privacy',
                xtype: 'scrollabletextarea',
                readOnly: true,
                maxRows : 40
            },
            ],
},

loadData: function () {
	this.loadTerms();
	this.loadPrivacy();
},

hasAccepted: function () {
	var agreement = this.getComponent("agreement");
	console.log("privacy " + agreement.getPrivacy());
	console.log("toc " + agreement.getTOC());
	
	if (agreement.getPrivacy() === 1 && agreement.getTOC() === 1) {
		return true;
	}
	
	return false;
},

loadTerms: function () {
		 	var termsofUseStore = Ext.create('myschoolishness.store.ContentStore', {
			model: 'myschoolishness.model.ContentModel'
			});
			termsofUseStore.load({
    		//define the parameters of the store:
    		params: {
        		template: "terms",
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								var terms = this.getComponent("terms");
								terms.setValue(records[0].get("content"));
								//console.log("GOT TOC " + records[0].get("content"));
							} else {
								console.log("Errored out " + success);
							}
    					}
			})
	},

loadPrivacy: function () {
		 	var termsofUseStore = Ext.create('myschoolishness.store.ContentStore', {
			model: 'myschoolishness.model.ContentModel'
			});
			termsofUseStore.load({
    		//define the parameters of the store:
    		params: {
        		template: "privacy",
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								var privacy = this.getComponent("privacy");
								privacy.setValue(records[0].get("content"));
							} else {
								console.log("Errored out " + success);
							}
    					}
			})
	},
	
})