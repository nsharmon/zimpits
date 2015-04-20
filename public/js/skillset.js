define([], function () {
	
	function SkillSet() {
		var skills = {};
		
		function insert(skill, index) {
			var existingSkill = skills[skill.name];

			if(existingSkill) {
				delete skills[existingSkill.name];
			}
			
			skills[skill.name] = skill;
			skill.index = index 
		}
		
		return {
			insert: insert
		};
	}
	
	return SkillSet;
});