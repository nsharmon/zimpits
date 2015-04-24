define(['eventbus'], function(EventBus) {
	var skillTemplate;
	
	function makeTemplate(perc, size) {
		var img = document.createElement('div');
		img.classList.add('skill');
		img.style.width=size.x + 'px';
		img.style.height=size.y + 'px';
		img.style.transform = 'scale(' + perc + ')';
		img.style.margin = -((1 - perc)*size.x)/2 + 'px';
		img.setAttribute('draggable', 'true');

		return img;
	}
	
	function Skill(name, offsetX, offsetY, size, imgSrc, perc) {
		var self = this;
		
		function getImage() {
			if(!this.element) {
				if(!skillTemplate) {
					perc = perc || 1.0;
					
					skillTemplate = makeTemplate(perc, size);
				}
				
				this.element = skillTemplate.cloneNode();
				if(imgSrc) {
					this.element.style.backgroundImage = 'url(' + imgSrc + ')';
					this.element.style.backgroundPosition = -offsetX + 'px ' + -offsetY + 'px';
				}
				if(name) {
					this.element.setAttribute('alt', name);
					this.element.setAttribute('title', name);
				}
				this.element.addEventListener('dragstart', function() {
					EventBus.trigger('skilldragstart', self);
				});
				this.element.addEventListener('dragdrop', function() {
					EventBus.trigger('skilldragdrop', self);
				});
				this.element.addEventListener('dragenter', function() {
					EventBus.trigger('skilldragenter', self);
				});
				this.element.addEventListener('dragleave', function() {
					EventBus.trigger('skilldragleave', self);
				});
				this.element.addEventListener('dragend', function() {
					EventBus.trigger('skilldragend', self);
				});
				this.element.skill = self;
			}
			return this.element;
		}
		
		function detach() {
			if(this.element) {
				this.element.parentNode.removeNode(this.element);
			}
		}
		
		return {
			name : name,
			detach: detach,
			getImage : getImage,
			offset: {
				x: offsetX,
				y: offsetY
			}
		};
	}
	
	return Skill;
});