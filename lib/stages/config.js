/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Upstage.
 * Licensed under the MIT License (MIT).
 */

var async = require('async');

var notifier = require('./notifier');

module.exports = function(assemble) {

	var stages = assemble.config.plugins.stages;
	return function(next) {
		assemble.log.info('Running config steps');

		var params = {};
		var notify = notifier(assemble, params);

		async.series([
				notify(stages.optionsBeforeConfiguration),
				function (done) {
					assemble.log.info('Doing some configuration work here.');
					done();
				},
				notify(stages.optionsAfterConfiguration)
			],
			next
		);
	};
};