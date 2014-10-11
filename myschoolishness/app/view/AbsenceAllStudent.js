Ext.define('myschoolishness.view.AbsenceAllStudent', {
    extend: 'Ext.dataview.List',
    xtype: 'absence-allstudents',
    alias : 'widget.absence-allstudents',
     requires: ['Ext.MessageBox'],
    config: {
     store : 'AbsenceAllStudentStore',
     itemTpl: '{first_name} {last_name} - {displayTypeExc} ',
     iconCls: 'icon-users',
	title: 'Students Out' ,
	itemId:'allStudentList',
	listeners: {
                itemtap: function (list, idx, target, record, evt) {
                	var message = "Out from " + 
                	record.get("start_date_time") + 
                	" till "  + record.get("end_date_time") + " reason is " + record.get("reason");
                    this.showOverLay(record.get("first_name") + " " + record.get("last_name"),message);
                }, // itemtaphold
            } // li
    },
    
    showOverLay: function(title, message) {
    	if (this.overlay) {
    		Ext.Viewport.remove(this.overlay);
    		}
    		
    	 this.overlay = Ext.Viewport.add({
            xtype: 'panel',
			showAnimation: {
				type: 'popIn',
				duration: 250,
				easing: 'ease-out',
				},
				
			hideAnimation: {
				type: 'popOut',
				duration: 250,
				easing: 'ease-out',
				},
				
            // We give it a left and top property to make it floating by default
			centered: true,
			width: 200,
			height: 300,
			
            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: true,

            // Here we specify the #id of the element we created in `index.html`
            html: message,

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: title
                }
            ]
        });
        
         this.overlay.show();
        }
 
})

