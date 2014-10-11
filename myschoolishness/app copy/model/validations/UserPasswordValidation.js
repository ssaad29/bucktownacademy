Ext.define('myschoolishness.model.validations.UserPasswordValidation', {
 
     extend: 'Ext.data.Model',
     alias: 'model.User',
 
    config: {
         fields: [
             {
                name: 'existingPassword'
           },
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
                field: 'existingPassword',
                message: 'is required'
            },
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
                    field: 'existingPassword',
                    type: 'length',
                    min: 6,
                    max: 12,
                    message: 'password must be between 6 and 12 characters.'
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