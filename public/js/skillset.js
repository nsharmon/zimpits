define(function () {
	var defaults = {
		padding: {
			x: 15,
			y: 15
		},
		size: {
			x: 199,
			y: 199
		}
	};
	
	function Skill(offsetX, offsetY, size, imgSrc) {
		function makeImage(perc) {
			perc = perc || 1.0;
			
			var img = document.createElement('div');
			img.classList.add('skill');
			img.style.backgroundImage = 'url(' + imgSrc + ')';
			img.style.backgroundPosition = -offsetX + 'px ' + -offsetY + 'px';
			img.style.width=size.x + 'px';
			img.style.height=size.y + 'px';
			img.style.transform = 'scale(' + perc + ')';
			img.style.marginLeft = -(1 - perc)*size.x + 'px';
			img.style.marginTop = -(1 - perc)*size.y + 'px';
			img.setAttribute('draggable', 'true');
			return img;
		}
		
		return {
			makeImage : makeImage,
			offset: {
				x: offsetX,
				y: offsetY
			}
		};
	}
	
	function SkillSet(img, options) {
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
			
			skillLoadPromise = new Promise(function(resolve, reject) {
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
		
		function generateSkills() {
			console.log('Generating skills');
			for(var i=options.padding.x; i+options.size.x <= img.width; i+=options.size.x + 2*options.padding.x) {
				for(var j=options.padding.y; j+options.size.y <= img.height; j+=options.size.y + 2*options.padding.y) {
					list.push(new Skill(i, j, options.size, img.src));
				}
			}
		}
		
		init();
		
		return {
			getList: skillLoadPromise
		};
	}

	return {
		defaults: defaults,
		SkillSet: SkillSet
	}
});