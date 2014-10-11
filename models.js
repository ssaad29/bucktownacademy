/**
 * New node file
 */

/**
 * Sequelize ORM Models
 */
	
module.exports = function(db) {

    /**
     * @type {Object}
     * All models we have defined over Sequelize, plus the db instance itself
     */
	var database = require('./database');
	var common = require('./common');
	
	var Sequelize = require('sequelize');
	var sequelize = db.client;
	console.log(common.getObjectClass(db));
	//console.log(inspect("Sequelize-> " + Sequelize,null,null));
	
	var User = sequelize.define('User', {
		ID: Sequelize.INTEGER,
		FIRST_NAME: Sequelize.STRING,
		LAST_NAME: Sequelize.STRING,
		USER_NAME: Sequelize.STRING,
		PASSWORD: Sequelize.STRING,
		ROLES: Sequelize.STRING,
		CREATED: Sequelize.DATE,
		PHONE: Sequelize.INTEGER,
		EMAIL: Sequelize.STRING,
		ADDR1: Sequelize.STRING,
		ADDR2: Sequelize.STRING,
		ZIP: Sequelize.STRING,
		CITY: Sequelize.STRING,
		STATE: Sequelize.STRING,
		ACTIVE: Sequelize.BOOLEAN
		});
		

    return this;
};