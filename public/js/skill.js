define(function() {
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
			img.setAttribute('alt', this.name);
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
	return Skill;
});