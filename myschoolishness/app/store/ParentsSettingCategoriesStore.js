Ext.define('myschoolishness.store.ParentsSettingCategoriesStore', {
    extend: 'Ext.data.Store',
    config:{
    	model: 'myschoolishness.model.CategoryModel',
     	autoLoad: true,
        data: [{
                category_name: "Contact Info",
            }, {
                category_name: "Address",
            }, 
            {
                category_name: "Profile",
            },
            {
                category_name: "Password",
            },
            {
                category_name: "Children",
            }
            ]
    }
});