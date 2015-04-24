require.config({
	paths: {
		bluebird: 'lib/bluebird.min'
	}
});

require(['zimpits'], function(Zimpits) {
	var app = new Zimpits();
	app.run();
});