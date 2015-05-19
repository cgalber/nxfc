'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Products Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/orders',
			permissions: '*'
		}, {
			resources: '/api/orders/:orderId',
			permissions: '*'
		}, {
			resources: '/api/orders/history',
			permissions: '*'
		}]
	}, {
		roles: ['manager'],
		allows: [{
			resources: '/api/orders',
			permissions: ['get', 'post']
		}, {
			resources: '/api/orders/:orderId',
			permissions: ['get']
		}, {
			resources: '/api/orders/history',
			permissions: ['get']
		}]
	}, {
		roles: ['guest', 'user'],
		allows: [{
			resources: '/api/orders',
			permissions: ['get']
		}, {
			resources: '/api/orders/:orderId',
			permissions: ['get']
		}, {
			resources: '/api/orders/history',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If Orders Policy Allows
 */
exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});
};
