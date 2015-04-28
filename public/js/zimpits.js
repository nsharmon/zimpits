define(['skillset', 'skillbin', 'eventbus', 'skillnames'], function   (SkillSet, SkillBin, EventBus, SkillNames) {
	function Zimpits() {
		function run() {
			EventBus.addCallback('skilladd', function(event, skill) {
				console.log('added new skill ' + skill.name);
			});
			
			//var img = document.getElementById('iconlist');
			var skillBinEle = document.getElementById('skillBin');
			var skillBin = new SkillBin(skillBinEle, '/img/iconlist.png', {
				names: SkillNames,
				perc: 0.5
			});
			
			skillBin.loadList.then(function(skills) {
				var skillSetEle = document.getElementById('skillSet');
				var skillSet = new SkillSet(skillSetEle, skillBin);
			});
		}
		
		return {
			run: run
		};
	}
	
	return Zimpits;
});