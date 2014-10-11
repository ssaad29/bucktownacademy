Ext.define('myschoolishness.model.validations.ParentPasswordValidation', {
 
     extend: 'Ext.data.Model',
     alias: 'model.User',
 
    config: {
         fields: [
           {
                name: 'newPassword'
           },
           {
                name: 'newPasswordMatch'
           }
        ],
        validations: [
            {
                type: 'presence',
                field: 'newPassword',
                message: 'is required'
            },
            {
                type: 'presence',
                field: 'newPasswordMatch',
                message: 'is required'
            },
            {
                    field: 'newPassword',
                    type: 'length',
                    min: 6,
                    max: 12,
                    message: 'new password must be between 6 and 12 characters.'
            },
            {
                    field: 'newPasswordMatch',
                    type: 'length',
                    min: 6,
                    max: 12,
                    message: 'new password match must be between 6 and 12 characters.'
            }
       ]
   }
});