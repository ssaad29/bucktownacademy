Ext.define('myschoolishness.view.UserAddressForm', {
    extend: 'Ext.Panel',
	alias: 'widget.user-address-form',
	xtype: 'user-address-form',
config: {
		title: 'User Address Form',
		fullstreen: true,
         items: [ { xtype: 'fieldset',
                   itemId:'userAddressForm',
		        	items: [
		        		        		{
                    					xtype: 'textfield',
                    					itemId: 'addr1',
		        		        		name: 'addr1',
		        		        		placeHolder: "Address 1",
                    					value:""
                    					},
                    					{
                    					xtype: 'textfield',
                    					placeHolder: "Address 2",
                    					itemId: 'addr2',
		        		        		name: 'addr2',
                    					value:""
                    					},
                    					{
                    					xtype: 'textfield',
                    					itemId: 'city',
                    					placeHolder: "City",
		        		        		name: 'city',
                    					value:""
                    					},
                    					{
		        		        		xtype: 'selectfield',
            							label: 'State',
            							itemId: 'state',
            							store: 'StateStore',
            							displayField: 'text',
            							autoComplete:'true',
            							valueField: 'value'
            							},
                    					{
                    					xtype: 'numberfield',
                    					placeHolder: "Zip",
                    					itemId: 'zip',
		        		        		name: 'zip',
                    					value:""
                    					}
                    		] } 
		        		        		
        ]
},

setAddr1: function (value) {
	var fieldSet = this.getComponent('userAddressForm');
	var addr1Field = fieldSet.getComponent("addr1");
	addr1Field.setValue(value);
},

getAddr1: function () {
	var fieldSet = this.getComponent('userAddressForm');
	var addr1Field = fieldSet.getComponent("addr1");
	return addr1Field.getValue();
},

setAddr2: function (value) {
	var fieldSet = this.getComponent('userAddressForm');
	var addr2Field = fieldSet.getComponent("addr2");
	addr2Field.setValue(value);
},

getAddr2: function () {
	var fieldSet = this.getComponent('userAddressForm');
	var addr2Field = fieldSet.getComponent("addr2");
	return addr2Field.getValue();
},

setCity: function (value) {
	var fieldSet = this.getComponent('userAddressForm');
	var cityField = fieldSet.getComponent("city");
	cityField.setValue(value);
},

getCity: function () {
	var fieldSet = this.getComponent('userAddressForm');
	var cityField = fieldSet.getComponent("city");
	return cityField.getValue();
},

setState: function (value) {
	var fieldSet = this.getComponent('userAddressForm');
	var stateField = fieldSet.getComponent("state");
	stateField.setValue(value);
},

getState: function () {
	var fieldSet = this.getComponent('userAddressForm');
	var stateField = fieldSet.getComponent("state");
	return stateField.getValue();
},

setZip: function (value) {
	var fieldSet = this.getComponent('userAddressForm');
	var zipField = fieldSet.getComponent("zip");
	zipField.setValue(value);
},

getZip: function () {
	var fieldSet = this.getComponent('userAddressForm');
	var zipField = fieldSet.getComponent("zip");
	return zipField.getValue();
},

})