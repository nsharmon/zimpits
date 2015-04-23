define(function() {
	var skillTemplate;
	
	function makeTemplate(perc, size) {
		var img = document.createElement('div');
		img.classList.add('skill');
		img.style.width=size.x + 'px';
		img.style.height=size.y + 'px';
		img.style.transform = 'scale(' + perc + ')';
		img.style.marginLeft = -(1 - perc)*size.x + 'px';
		img.style.marginTop = -(1 - perc)*size.y + 'px';
		img.setAttribute('draggable', 'true');
		
		return img;
	}
	
	function Skill(name, offsetX, offsetY, size, imgSrc) {
		function getImage(perc) {
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
			}
			return this.element;
		}
		
		return {
			name : name,
			getImage : getImage,
			offset: {
				x: offsetX,
				y: offsetY
			}
		};
	}
	
	return Skill;
});