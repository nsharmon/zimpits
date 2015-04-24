define(['skill', 'utils'], function (Skill, Utils) {
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
		
		function insert(skill, index) {
			removeAt(index);
			
			skills[skill.name] = skill;
			skill.index = index 
			skillArray[index] = skill;
			
			container.appendChild(skill.getImage());
		}
		
		function removeAt(index, replaceWithPlaceholder) {
			var existingSkill = skillArray[index];

			if(existingSkill) {
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