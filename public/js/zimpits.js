define(['skillset', 'skillbin', 'eventbus', 'skillnames'], function   (SkillSet, SkillBin, EventBus, SkillNames) {
	function Zimpits() {
		function run() {
			EventBus.addCallback('skilladd', function(event, skill) {
				console.log('added new skill ' + skill.name);
			});
			EventBus.addCallback('skilldragstart', function(event) {
				console.log('skill dragstart');
			});
			EventBus.addCallback('skilldragenter', function(event) {
				console.log('skill dragenter');
			});
			EventBus.addCallback('skilldragleave', function(event) {
				console.log('skill dragleave');
			});
			EventBus.addCallback('skilldragdrop', function(event) {
				console.log('skill dragdrop');
			});
			EventBus.addCallback('skilldragend', function(event) {
				console.log('skill dragend');
			});
			
			//var img = document.getElementById('iconlist');
			var skillBinEle = document.getElementById('skillBin');
			var skills = new SkillBin(skillBinEle, '/img/iconlist.png', {
				names: SkillNames,
				perc: 0.5
			});
			
			skills.loadList.then(function(skills) {
				var skillSetEle = document.getElementById('skillSet');
				var skillSet = new SkillSet(skillSetEle);
			});
		}
		
		return {
			run: run
		};
	}
	
	return Zimpits;
});