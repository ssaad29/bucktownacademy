Ext.define('myschoolishness.model.validations.BulletinValidation', {
 
     extend: 'Ext.data.Model',
     alias: 'model.User',
 
    config: {
         fields: [
           {
                name: 'title'
           },
           {
                name: 'message'
           }
        ],
        validations: [
            {
                type: 'presence',
                field: 'title',
                message: 'is required'
            },
            {
                type: 'presence',
                field: 'message',
                message: 'is required'
            }
       ]
   }
});