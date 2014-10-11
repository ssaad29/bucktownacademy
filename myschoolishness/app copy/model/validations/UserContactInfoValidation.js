Ext.define('myschoolishness.model.validations.UserContactInfoValidation', {
 
     extend: 'Ext.data.Model',
     alias: 'model.User',
 
    config: {
         fields: [
             {
                name: 'email'
           },
           {
                name: 'phone'
            },
            {
                name: 'cellphone'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'email',
                message: 'is required'
            },
            {
                type: 'presence',
                field: 'phone'
            },
            {
                type: 'presence',
                field: 'cellPhone'
            },
            {
               type: 'email',
               field: 'Email',
               message: 'Your Email Format is invalid'
            },
            {
               type: 'format',
               field: 'phone',
               matcher: /^([0-9]{3}[-]?){1,2}([0-9]{4})$/, //US Phone No
               message: 'Your Phone Number is invalid'
            },
			{
               type: 'format',
               field: 'cellphone',
               matcher: /^([0-9]{3}[-]?){1,2}([0-9]{4})$/, //US Phone No
               message: 'Your Cell Phone Number is invalid'
            }
       ]
   }
});