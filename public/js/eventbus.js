define([], function () {
	function CallbackListener(callback) {
		function on(event, context) {
			callback(event, context);
		}
		return {
			on: on
		};
	}
	
	function EventBus() {
		var listeners = {};
		
		function addListener(event, listener) {
			if(!listeners[event]) {
				listeners[event] = [];
			}
			listeners[event].push(listener);
		}
		
		function addCallback(event, callback) {
			addListener(event, new CallbackListener(callback));
		}
		
		function trigger(event, context) {
			if(listeners[event]) {
				listeners[event].forEach(function(listener) {
					listener.on(event, context);
				});
			}
		}
		
		return {
			addListener: addListener,
			addCallback: addCallback,
			trigger: trigger
		};
	}
	
	var instance;
	if(!instance) {
		instance = new EventBus();
	}
	return instance;
});