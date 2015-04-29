define(['skill', 'utils/utils', 'eventbus', 'utils/draghandler'], function (Skill, Utils, EventBus, DragHandler) {
	var defaults = {
		slots: 8
	};
	var EMPTY = 0, PARTIAL = 1, FULL = 2;
	
	function SkillSet(container, skillbin, options) {
		options = Utils.merge(options, defaults);
		
		var dragHandler = new DragHandler(skillbin, onDropSkill.bind(this), onDropOutSkill.bind(this));
		var skills = {};
		var skillArray = [];
		var skillBarStatus = EMPTY;
		
		function init() {
			for(var i=0; i<options.slots; i++) {
				insertPlaceholderAt(i);
			}
			render();
		}
		
		function updateStatus(full, empty) {
			if(full && skillBarStatus !== FULL) {
				skillBarStatus = FULL;
				EventBus.trigger('skillset statuschange', publicSelf);
			} else if (empty && skillBarStatus !== EMPTY) {
				skillBarStatus = EMPTY;
				EventBus.trigger('skillset statuschange', publicSelf);
			} else if (!full && !empty && skillBarStatus !== PARTIAL) {
				skillBarStatus = PARTIAL;
				EventBus.trigger('skillset statuschange', publicSelf);
			}
		}
		
		function render() {
			// empty container
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
			var full = true;
			var empty = true;
			skillArray.forEach(function(skill) {
				container.appendChild(skill.getImage());
				if(skill.empty) {
					full = false;
				} else {
					empty = false;
				}
			});
			updateStatus(full, empty);
		}
		
		function onDropOutSkill(skill, atIndex) {
			removeAt(atIndex, true);
			
			render();
		}
		
		function onDropSkill(skill, atIndex) {
			var currentSkill = skills[skill.name];
			var currentSkillIndex = currentSkill ? currentSkill.index : 0;
			var replaced = insert(skill, atIndex);
			
			if(currentSkill && !replaced.empty) {
				console.log('replace');
				insert(replaced, currentSkillIndex);
			}
			
			render();
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
			
			skillArray[index] = skill;
			
			var skillEle = skill.getImage();
			dragHandler.toggleListeners(skillEle, true);
			
			EventBus.trigger('skillsetadd', skill);
			
			return replaced;
		}
		
		function removeAt(index, replaceWithPlaceholder) {
			var existingSkill = skillArray[index];

			if(existingSkill && !existingSkill.empty) {
				var skillEle = existingSkill.getImage();
				dragHandler.toggleListeners(skillEle, false);
				
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
		
		var publicSelf = {
			container: container,
			insert: insert,
			getStatus: function() {
				return skillBarStatus;
			}
		};
		
		init();
		
		return publicSelf;
	}
	
	return SkillSet;
});