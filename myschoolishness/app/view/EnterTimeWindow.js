Ext.define('myschoolishness.view.EnterTimeWindow', {
    extend: 'Ext.Panel',
alias: 'widget.modalpanel',

config: {
    centered: true,
    height: 150,
    itemId: 'timeEntryPanel',
    id: 'timeEntryPanel',
    width: 180,
    hideOnMaskTap: true,
    modal: false,
    scrollable: true,
    hideAnimation: {
        type: 'popOut',
        duration: 200,
        easing: 'ease-out'
    },
    showAnimation: {
        type: 'popIn',
        duration: 200,
        easing: 'ease-out'
    },
    items: [
    	{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Enter time'
        },
        {
        	xtype: 'timepickerfield',
        	name: 'Enter time',
        	id: 'timeEntryPicker',
        	itemId: 'timeEntryPicker',
        	value: new Date()
        },
        {
            xtype: 'toolbar',
            layout: {
            	pack: 'center',
            	align:'center',
            },
            docked: 'bottom',
            items: [
		      {
              xtype: 'button',
		      itemId:'cancelTimeEntry',
		      id:'cancelTimeEntry',
		      text: 'Cancel'
              },
              {
              xtype: 'button',
		      itemId:'saveTimeEntry',
		      id:'saveTimeEntry',
		      text: 'Save'
              },
		 ]
        },
    	],
    	listeners: [
		        		{
						delegate: '#cancelTimeEntry',
						event: 'tap',
						fn: 'onCancelTimeEntry'
						},
						{
						delegate: '#saveTimeEntry',
						event: 'tap',
						fn: 'onSaveTimeEntry'
						}
						
						],
		
},

	onCancelTimeEntry: function () {
		 this.hide();
		 console.log("time entry cancelled");
	},

	onSaveTimeEntry: function () {
		var picker = this.getComponent("timeEntryPicker");	
		this.fireEvent('timeEntryCollected', picker.getValue());
		this.hide();
	},
});