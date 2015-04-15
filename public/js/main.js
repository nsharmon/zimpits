require.config({
	paths: {
		bluebird: 'lib/bluebird.min'
	}
});

require(['skillset'], function   (SkillSet) {
	//var img = document.getElementById('iconlist');
	var skills = new SkillSet('/img/iconlist.png');
	
	skills.getList.then(function (skillList) {
		var skillBin = document.getElementById('skillBin');
		skillList.forEach(function(skill) {
			var btn = skill.makeImage(0.5);
			skillBin.appendChild(btn);
		});
	});
});