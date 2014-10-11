Ext.define('myschoolishness.model.validations.StudentNameValidation', {
 
     extend: 'Ext.data.Model',
     alias: 'model.User',
 
    config: {
         fields: [
             {
                name: 'first'
           },
           {
                name: 'last'
           }
        ],
        validations: [
            {
                type: 'presence',
                field: 'first',
                message: 'is required'
            },
            {
                type: 'presence',
                field: 'last',
                message: 'is required'
            }
       ]
   }
});