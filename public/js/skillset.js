define(['skill', 'utils', 'eventbus'], function (Skill, Utils, EventBus) {
	var defaults = {
		slots: 8
	};
	
	function SkillSet(container, options) {
		options = Utils.merge(options, defaults);
		
		var skills = {};
		var skillArray = [];
		
		function init() {
			for(var i=0; i<options.slots; i++) {
				insertPlaceholderAt(i);
			}
		}
		
		function onDrop(event) {
			console.log('skill dropped');
		}
		
		function insert(skill, index) {
			removeAt(index);
			
			skills[skill.name] = skill;
			skill.index = index 
			skillArray[index] = skill;
			
			var skillEle = skill.getImage();
			container.appendChild(skillEle);
			
			skillEle.addEventListener('dragover', Utils.preventDefault);
			skillEle.addEventListener('drop', onDrop);
			
			EventBus.trigger('skillsetadd', skill);
		}
		
		function removeAt(index, replaceWithPlaceholder) {
			var existingSkill = skillArray[index];

			if(existingSkill) {
				var skillEle = existingSkill.getImage();
				skillEle.removeEventListener('dragover', Utils.preventDefault);
				skillEle.removeEventListener('drop', onDrop);
				existingSkill.detach();
				delete skillArray[index];
				delete skills[existingSkill.name];
				
				if(replaceWithPlaceholder) {
					insertPlaceholderAt(index);
				}
			}
		}
		
		function insertPlaceholderAt(index) {
			var emptySlot = new Skill('Empty slot');
			emptySlot.allowDuplicates = true;
			
			insert(emptySlot, index);
		}
		
		init();
		
		return {
			container: container,
			insert: insert
		};
	}
	
	return SkillSet;
});