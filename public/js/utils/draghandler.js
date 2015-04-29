define(['utils/utils'], function (Utils) {
	function DragHandler(skillbin, onDropSkill, onDropOutSkill) {
		var draggedSkill;
		var exitHandled = false;
		
		function toggleListeners(skillEle, add) {
			var eventFunc = add ? skillEle.addEventListener.bind(skillEle) : skillEle.removeEventListener.bind(skillEle);
			
			eventFunc('dragover', Utils.preventDefault);
			eventFunc('dragstart', onDragStart);
			eventFunc('dragleave', onDragLeave);
			eventFunc('dragenter', onDragEnter);
			eventFunc('dragend', onDragEnd);
			eventFunc('drop', onDrop);
		}
		
		function onDragStart(evt) {
			draggedSkill = skillbin.getSkillByName(evt.srcElement.skill.name);
			exitHandled = false;
		}
		
		function onDragEnd(evt) {
			if(draggedSkill && exitHandled) {
				onDropOutSkill(draggedSkill, evt.srcElement.skill.index);
			}
			draggedSkill = undefined;
		}
		
		function onDragLeave() {
			exitHandled = true;
		}

		function onDragEnter() {
			exitHandled = false;
		}
		
		function onDrop(event) {
			event.preventDefault();
			
			// Trigger onDragEnter to prevent problems with race conditions in case last event was "dragleave"
			onDragEnter();
			
			var skillName = event.dataTransfer.getData("text/plain");
			var skill = skillbin.getSkillByName(skillName);
			
			if(skill && !skill.empty) {
				onDropSkill(skill, event.srcElement.skill.index);
			}
		}
		
		return {
			toggleListeners : toggleListeners
		};
	}
	
	return DragHandler;
});