define(['skill', 'utils', 'eventbus'], function (Skill, Utils, EventBus) {
	var defaults = {
		slots: 8
	};
	
	function SkillSet(container, skillbin, options) {
		options = Utils.merge(options, defaults);
		
		var skills = {};
		var skillArray = [];
		
		function init() {
			for(var i=0; i<options.slots; i++) {
				insertPlaceholderAt(i);
			}
			render();
		}
		
		function render() {
			// empty container
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
			skillArray.forEach(function(skill) {
				container.appendChild(skill.getImage());
			});
		}
		
		function onDropSkill(event) {
			event.preventDefault();
			
			var skillName = event.dataTransfer.getData("text/plain");
			var skill = skillbin.getSkillByName(skillName);
			
			var currentSkill = skills[skillName];
			var currentSkillIndex = currentSkill ? currentSkill.index : 0;
			var replaced = insert(skill, event.srcElement.skill.index);
			
			if(currentSkill && !replaced.empty) {
				insert(replaced, currentSkillIndex);
			}
			render();
			
			console.log('skill dropped ' + skill.name);
		}
		
		function insert(skill, index) {
			// add placeholder if skill already exists, since it is really a swap, not an insert
			var currentSkill = skills[skill.name];
			
			var replaced = removeAt(index);
			if(currentSkill && !currentSkill.empty) {
				removeAt(currentSkill.index, true);
			} else {
				skillbin.enableSkill(skill, false);
			}
			
			skills[skill.name] = skill;
			skill.index = index 
			
			console.log('Setting skill ' + skill.name + ' at position ' + skill.index);
			skillArray[index] = skill;
			
			var skillEle = skill.getImage();
			toggleListeners(skillEle, true);
			
			EventBus.trigger('skillsetadd', skill);
			
			return replaced;
		}
		
		function toggleListeners(skillEle, add) {
			var eventFunc = add ? skillEle.addEventListener.bind(skillEle) : skillEle.removeEventListener.bind(skillEle);
			
			eventFunc('dragover', Utils.preventDefault);
			eventFunc('drop', onDropSkill);
		}
		
		function removeAt(index, replaceWithPlaceholder) {
			var existingSkill = skillArray[index];

			if(existingSkill && !existingSkill.empty) {
				console.log('Removing skill ' + existingSkill.name + ' at position ' + existingSkill.index);
				var skillEle = existingSkill.getImage();
				toggleListeners(skillEle, false);
				
				if(!existingSkill.empty) {
					skillbin.enableSkill(existingSkill, true);
				}
				delete skillArray[index];
				
				if(!existingSkill.empty) {
					delete skills[existingSkill.name];
				}
				
				if(replaceWithPlaceholder) {
					insertPlaceholderAt(index);
				}
			}
			return existingSkill;
		}
		
		function insertPlaceholderAt(index) {
			var emptySlot = new Skill('Empty slot');
			
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