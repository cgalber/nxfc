'use strict';

var config = {
    useHolding: !!(process.env.HOLDING_USERNAME && process.env.HOLDING_PASSWORD),
    holdingUsername: process.env.HOLDING_USERNAME || 'HOLDING_USERNAME',
    holdingPassword: process.env.HOLDING_PASSWORD || 'HOLDING_PASSWORD'
};

module.exports = function(app, db) {
	// Root routing
	var core = require('../controllers/home.server.controller'), 
	    express = require('express');

	if (config.useHolding) {
	    console.log('setting holding');
        app.use(express.static('../views/holding'));
        app.use(core.renderHoldingPage);

        // Basic auth for holding
        app.use(core.checkBasicAuth);
    }

    app.locals.home = config;
};
