define(['skill', 'bluebird', 'eventbus'], function (Skill, BlueBird, EventBus) {
	function SkillBin(img, options) {
		var defaults = {
			padding: {
				x: 15,
				y: 15
			},
			size: {
				x: 199,
				y: 199
			},
			names: undefined
		};
	
		var self = this;
		var skillLoadPromise;
		var list = [];
		
		function merge(objA, objB) {
			objA = objA || {};
			for(var prop in objB) {
				if(!objA[prop]) {
					objA[prop] = objB[prop];
				} else if ( typeof(objA[prop]) === 'object') {
					objA[prop] = merge(objA[prop], objB[prop]);
				}
			}
			return objA;
		}
		
		function init() {
			options = merge(options, defaults);
			
			skillLoadPromise = new BlueBird.Promise(function(resolve, reject) {
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
			}).then(function(img) {
				generateSkills();
				return list;
			});
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
					var skill = new Skill(getName(posX, posY), i, j, options.size, img.src);
					
					addSkill(skill);
					
					posY++;
				}
				posX++;
			}
		}
		
		function addSkill(skill) {
			list.push(skill);
			EventBus.trigger('skilladd', skill);
		}
		
		function appendSkillTo(skill, container, perc) {
			perc = perc || 1.0;
			var btn = skill.getImage(perc);
			container.appendChild(btn);
		}
		
		function appendTo(container, perc) {
			skillLoadPromise.then(function(skillList) {
				skillList.forEach(function(skill) {
					appendSkillTo(skill, container, perc);
				});
				var emptySlot = new Skill('Empty slot');
				addSkill(emptySlot);
				appendSkillTo(emptySlot, container, perc);
			});
		}
		
		init();
		
		return {
			getList: skillLoadPromise,
			addSkill: addSkill,
			appendTo: appendTo,
			defaults: defaults
		};
	}

	return SkillBin;
});