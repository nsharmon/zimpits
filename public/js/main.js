require(['skillset'], function   (skillset) {
	//var img = document.getElementById('iconlist');
	var skills = new skillset.SkillSet('/img/iconlist.png');
	
	skills.getList.then(function (skillList) {
		var skillBin = document.getElementById('skillBin');
		skillList.forEach(function(skill) {
			var btn = skill.makeImage(0.5);
			skillBin.appendChild(btn);
		});
	});
});