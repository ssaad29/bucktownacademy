Ext.define('myschoolishness.controller.Utils', {
    singleton : true,
    alias : 'widget.utils',
    
    config : {
            thisInstance: "me@html5wood.com"
    },
    
         
    constructor: function(config) {
        this.initConfig(config);
        console.log("INTSTANTIATING SINGLETON" + config);
    },
    
    
    printObject: function ( obj ) {
  var props = Object.getOwnPropertyNames( obj );

  props.filter(function( prop ) {

    console.log("printing prop" +  obj[ prop ]);
    if ( obj[ prop ]!=null &&  obj[ prop ]!=undefined) {
   	 	console.log("printing constructor" + obj[ prop ].constructor);
    	console.log("printing call" + obj[ prop ].call);
    	console.log("printing apply" + obj[ prop ].apply);
    }

  });
},

	getDateTimeStringForDisplayFromDBDate: function (dateString) {  
		var date = new Date();  
		
		if (dateString === null || dateString === undefined || dateString.length < 1) {
			return date;
		}
    	
    	var parts = String(dateString).split(/[- : T Z]/);  
    	
    	var month = parts[1];
  		if (month === 0)
  			month = 12;
  			
    	date.setFullYear(parts[0]);  
    	date.setMonth(parts[1] );  
    	date.setDate(parts[2]);  
    	date.setHours(parts[3]);  
    	date.setMinutes(parts[4]);  
    	date.setSeconds(parts[5]);  
    	date.setMilliseconds(0);  
    	var hours = date.getHours();
    	var ampm = hours >= 12 ? 'pm' : 'am';
  		hours = hours % 12;
  		hours = hours ? hours : 12; // the hour '0' should be '12'
  		var minutes = date.getMinutes();
  		minutes = minutes < 10 ? '0'+minutes : minutes;
  		var strTime = hours + ':' + minutes + ' ' + ampm;
  		var month = date.getMonth();
  		if (month === 0)
  			month = 12;
  		
      	var formattedDate = month + "/" + date.getDate() + "/" + date.getFullYear() + "-" + strTime;
      	
      	return formattedDate;
	},
    
    absenceTypeStringToInt: function (type) {
    	var typeInt = 1;
    	
    	return typeInt;
    },
    
    getDefaultSlideTransition: function() {
		//return {type:'slide',direction:'right'};
		if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token").length < 1) {
			
		}
		
		return {type:'fade'};
	},
	
	logout: function() {
		myschoolishness.app.redirectTo('logout');
	},
	
	sessionExpired: function() {
		console.log("SESSION EXPIRED!!!!!TEST");
		myschoolishness.app.redirectTo('sessionExpired');
	},
	
	getRoles: function() {
		var roles = sessionStorage.getItem("roles");

		/*if (roles==="null" || roles===null || roles==undefined || roles.length < 1) {
			this.sessionExpired();
			return null;
		}*/
		
		return roles;
	},
	
	checkTokenOnServer: function(successRedirect,failureRedirect) {
	console.log("checkTokenOnServer ");
		var clientToken = sessionStorage.getItem("token");
		var tokenStore = Ext.create('myschoolishness.store.CheckTokenStore', {
				model: "myschoolishness.model.CheckTokenModel"
			});
			
			tokenStore.load({
    		scope: this,
			params: {
        		token: clientToken,
    		},
    		callback : function(records, operation, success) {	
					console.log("checkTokenOnServer success " + success);
					if (success ===true) {
						if (successRedirect) {
							myschoolishness.app.redirectTo('home');
						} 
						return true;
					} else {
						if (failureRedirect) {
							this.redirectTo('sessionExpired');
						}
						return false;
					}
				}
			})
			
			return false;
	},
	
	hasRequiredSessionInfo: function(checkToken) {
		console.log("hasRequiredSessionInfo CALLED!!");
		
		var roles = sessionStorage.getItem("roles");
    	var user_id = sessionStorage.getItem("user_id");
    	var school_id = sessionStorage.getItem("school_id");
    	var token = sessionStorage.getItem("token");
    	console.log("roles " + roles);
    	console.log("user_id " + user_id);
    	console.log("school_id " + school_id);
    	console.log("token " + token);
    	
    	if (roles=="null" || roles==undefined || roles.length < 1) {
    		return false;
    	}
    	if (user_id==="null" || user_id===undefined || user_id.length < 1) {
    		return false;
    	}
    	if (school_id==="null" || school_id===undefined || school_id.length < 1) {
    		return false;
    	}
    	if (checkToken && (token === null || token==="null" || token===undefined || token.length < 1)) {
    		return false;
    	}

    	return this.checkTokenOnServer(true,false);
	},
	
	printAllProperties: function(anObject){     
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = anObject; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
		result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
	}
	
	console.log(result); 
	},
	
	hasRecords: function(records) {
		if (records != null && records!=undefined && records.length > 0) {
			return true;
		}
		
		return false;
	},
	
    absenceTypeIntToString: function (type) {
    	var typeString ="Absent";
    	
    	if (type === 2) {
				typeString = "Late arrival";
			} else if (type === 3) {
				typeString = "Leaving early";
			} else if (type === 4) {
				typeString = "After school note";
			}  else if (type === 5) {
				typeString = "Before school note";
			}
			
		return typeString;
    },
    
     	//Example date received from mysql 2013-06-28T20:09:00.000Z 
	convertDateToJS: function (dateString) {  
		if (dateString === null || dateString === undefined || dateString.length < 1) {
			return date;
		}
    	
    	var date = new Date();  
    	var parts = String(dateString).split(/[- : T Z]/);  
      
    	date.setFullYear(parts[0]);  
    	console.log("Month received " + parts[1]);
    	var month = parseInt(parts[1] -1);
    	if (month === 0)
  			month = "12";
  			
    	date.setMonth(month);  
    	date.setDate(parts[2]);  
    	date.setHours(parts[3]);  
    	date.setMinutes(parts[4]);  
      
    	return date;  
	},
	
    getDateStringForDisplayFromDBDate: function (dateString) {  
		var date = new Date();  
		
		if (dateString === null || dateString === undefined || dateString.length < 1) {
			return date;
		}
    	
    	var parts = String(dateString).split(/[- : T Z]/);  
    	
    	date.setFullYear(parts[0]);  
    	date.setMonth(parts[1] );  
    	date.setDate(parts[2]);   
    	var month = date.getMonth();
  		if (month === 0)
  			month = 12;
 		
      	var formattedDate = month + "/" + date.getDate() + "/" + date.getFullYear();
      	
      	return formattedDate;
	},
	
	getTimeStringForDisplayFromString: function (dateString) {  
		var date = new Date();  
		if (dateString === null || dateString === undefined || dateString.length < 1) {
			return "";
		}

    	var parts = String(dateString).split(/[: ]/);  
    	date.setHours(parts[1]);  
    	date.setMinutes(parts[2]);  
    	var hours = date.getHours();
    	var ampm = hours >= 12 ? 'pm' : 'am';
  		hours = hours % 12;
  		hours = hours ? hours : 12; // the hour '0' should be '12'
  		var minutes = date.getMinutes();
  		minutes = minutes < 10 ? '0'+minutes : minutes;
  		
  		return hours + ':' + minutes + ' ' + ampm;
	},
});