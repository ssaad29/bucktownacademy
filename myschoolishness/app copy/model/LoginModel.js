Ext.define('myschoolishness.model.LoginModel', {
	extend: 'Ext.data.Model',
	id  : 'user-password',
	
	config: {
	    	identifier: 'uuid',
	        idProperty: 'id',
	        fields: [
	            {name: "id" }, 
	            {name: "dbId" }, 
	            {name: "username", type: "string"},
	            {name: "roles", type: "string"},
	            {name: "password", type: "string"},
	            {name: "remember", type: "string"},
	            {name: "first_name", type: "string"},
	            {name: "last_name", type: "string"},
	            {name: "hint", type: "string"},
	            {name: "phone", type: "string"},
	            {name: "email", type: "string"},
	            {name: "addr1", type: "string"},
	            {name: "addr2", type: "string"},
	            {name: "city", type: "string"},
	            {name: "state", type: "string"},
	            {name: "zip", type: "string"},
	            {name: "cell", type: "string"},
	            {name: "public_profile", type: "string"},
	            {name: "last_sync", type: "string"},
	        ],
	        
	            proxy: {
	            type: 'localstorage',
	            id  : 'user_id'
	        },

	    }});