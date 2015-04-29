define([], function () {
	var Utils = {
		preventDefault: function(event) {
			event.preventDefault();
		},
		merge: function (objA, objB) {
			objA = objA || {};
			for(var prop in objB) {
				if(!objA[prop]) {
					objA[prop] = objB[prop];
				} else if ( typeof(objA[prop]) === 'object') {
					objA[prop] = Utils.merge(objA[prop], objB[prop]);
				}
			}
			return objA;
		}
	}
	
	return Utils;
});