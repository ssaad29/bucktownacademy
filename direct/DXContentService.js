var db = dbConnection;

var DXContentService  = {
    
    getContent: function(params, callback){
    	console.log("Getting content for " + params.template);
    	db.getTextContent(params.template,callback);
    },
};

module.exports = DXContentService;