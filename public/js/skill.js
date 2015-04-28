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
		var publicSelf;
		
		function publish(evt) {
			EventBus.trigger('skill' + evt.type, publicSelf);
		}
		
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
				this.element.addEventListener('dragstart', function(evt) {
					evt.dataTransfer.setData("text/plain", name);
					publish(evt);
				});
				this.element.addEventListener('dragdrop', publish);
				this.element.addEventListener('dragenter',publish);
				this.element.addEventListener('dragleave', publish);
				this.element.addEventListener('dragend', publish);
				
				this.element.skill = publicSelf;
			}
			return this.element;
		}
		
		function detach() {
			if(this.element && this.element.parentNode) {
				this.element.parentNode.removeChild(this.element);
			}
		}
		
		publicSelf = {
			name : name,
			detach: detach,
			getImage : getImage,
			empty : !imgSrc,
			offset: {
				x: offsetX,
				y: offsetY
			}
		};
		return publicSelf;
	}
	
	return Skill;
});