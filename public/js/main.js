require.config({
	paths: {
		bluebird: 'lib/bluebird.min'
	}
});

require(['skill', 'skillbin', 'eventbus'], function   (Skill, SkillBin, EventBus) {
	EventBus.addCallback('skilladd', function(event, skill) {
		console.log('added new skill ' + skill.name);
	});

	//var img = document.getElementById('iconlist');
	var skills = new SkillBin('/img/iconlist.png', {
			names: [
				['Recharge', 'Remove hex', 'Decay', 'Enchant weapon', 'Sharpen', 'Cure condition', 'Animate corpse'],
				['Power strike', 'Reverse damage', 'Gaze', 'Death pact', 'Cleave', 'Explosion', 'Smite'],
				['Pious heal', 'Shadow step', 'Shield stance', 'Intimidate', 'Disease', 'Ranged strike', 'Banish'],
				['Envenom', 'Restore', 'Distract', 'Barrage', 'Unblockable blow', 'Sacrifice', 'Rock out'],
				['Dismember', 'Reaper\'s mark', 'Pacifism', 'Death blow', 'Meditate', 'Animal form', 'Dark ritual'],
				['Ray of light', 'Embrace', 'Shield blow', 'Energy shield', 'Block stance', 'Holy lance', 'Retribution']
		]
	});
	
	skills.appendTo(document.getElementById('skillBin'), 0.5);
});