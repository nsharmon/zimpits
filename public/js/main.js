require.config({
	paths: {
		bluebird: 'lib/bluebird.min'
	}
});

require(['skillbin', 'eventbus'], function   (SkillBin, EventBus) {
	EventBus.addCallback('skillinit', function(skill) {
		console.log('added new skill ' + skill.name);
	});

	//var img = document.getElementById('iconlist');
	var skills = new SkillBin('/img/iconlist.png');
	
	skills.getList.then(function (skillList) {
		var skillBin = document.getElementById('skillBin');
		skillList.forEach(function(skill) {
			var btn = skill.makeImage(0.5);
			skillBin.appendChild(btn);
		});
	});
});