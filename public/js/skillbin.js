define(['skill', 'bluebird', 'eventbus', 'utils'], function (Skill, BlueBird, EventBus, Utils) {
	function SkillBin(container, img, options) {
		var defaults = {
			padding: {
				x: 15,
				y: 15
			},
			size: {
				x: 199,
				y: 199
			},
			names: undefined,
			perc: 1.0
		};
	
		var self = this;
		var loadListPromise;
		var list = [];
		var map = {};
		
		function init() {
			options = Utils.merge(options, defaults);
			
			loadListPromise = new BlueBird.Promise(loadImage).then(generateSkills);
		}
		
		function loadImage(resolve, reject) {
			if(typeof img === 'string') {
				var imgTag = document.createElement("img");
				img.onload = function() {
					resolve(img);
				};
				imgTag.src = img;
				imgTag.style.display = 'none';
				document.body.appendChild(imgTag);
				img = imgTag;
			} 
			
			if(!isImageLoaded()) {
				img.onload = function() {
					resolve(img);
				};
			} else {
				resolve(img);
			}
		}
		
		function isImageLoaded() {
			return img.complete && typeof img.naturalWidth !== "undefined" && img.naturalWidth !== 0;
		}
		
		function getName(posX, posY) {
			return options.names && options.names[posY] ? options.names[posY][posX] : undefined;
		}
		
		function generateSkills() {
			console.log('Generating skills');
			var posX = 0;
			for(var i=options.padding.x; i+options.size.x <= img.width; i+=options.size.x + 2*options.padding.x) {
				var posY = 0;
				for(var j=options.padding.y; j+options.size.y <= img.height; j+=options.size.y + 2*options.padding.y) {
					var skill = new Skill(getName(posX, posY), i, j, options.size, img.src, options.perc);
					
					addSkill(skill);
					
					posY++;
				}
				posX++;
			}
			return list;
		}
		
		function addSkill(skill) {
			list.push(skill);
			map[skill.name] = skill;
			
			enableSkill(skill, true);
			
			EventBus.trigger('skilladd', skill);
		}
		
		function enableSkill(skill, enable) {
			if(map[skill.name]) {
				if(enable && !container.contains(skill.getImage())) {
					skill.detach();
					
					var btn = skill.getImage();
					container.appendChild(btn);
				} else if (!enable && container.contains(skill.getImage())) {
					skill.detach();
				}
			}
		}
		
		function getSkillByName(skillName) {
			return map[skillName];
		}
		
		init();
		
		return {
			container: container,
			loadList: loadListPromise,
			addSkill: addSkill,
			enableSkill: enableSkill,
			getSkillByName: getSkillByName,
			defaults: defaults
		};
	}

	return SkillBin;
});