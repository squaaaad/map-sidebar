//generate random user ids from 1-1000
'use strict';

const generateUserIDs = (userContext, events, done) => {
	const id = Math.ceil(Math.random() * 1000).toString();
  userContext.vars.id = id;
  //console.log(userContext.vars.id);
	return done();
}

module.exports.generateUserIDs = generateUserIDs;

// let userContext = {vars: {}};
// generateUserIDs(userContext, {}, ()=>{});

