ol.control.editionControl = function (opt_options) {
	
	var options = opt_options || {};	
	var this_ = this;
	
	this.containerID;
	if(options.containerID){		
		this.containerID = options.containerID;
	}
	
	this.selectInteraction;
	this.editInteraction;
	this.dragInteraction;
	
	
	this.setContext(this);
	
	var container = document.createElement('div');
	container.className = 'ol-unselectable ol-control conteneur-edition';
	
	/*Events*/
	 var handleButtonsClick = function (e) {
		e = e || window.event;

		// Disabled Controls buttons
		var elementsButton = container.getElementsByTagName('button');
		for(var i = 0; i < elementsButton.length; i++) {
			elementsButton.item(i).classList.remove('enable');		
		}
		
		e.target.classList.toggle('enable');
		
		switch(e.target.typeControl){
			case "Move":
				this_.move();
			break;	
			
			case "Edition":
				this_.edition();
			break;	
			
		}
		
	}
	
	
	var buttonMove = this.buttonMove = document.createElement('button');    
    buttonMove.typeControl = 'Move';
	buttonMove.className = 'pull-left glyphicon deplacement';
    buttonMove.addEventListener('click', handleButtonsClick, false);
	
	container.appendChild(buttonMove);
	
	var buttonEdition = this.buttonEdition = document.createElement('button');    
    buttonEdition.typeControl = 'Edition';
	buttonEdition.className = 'pull-left glyphicon modifie';
    buttonEdition.addEventListener('click', handleButtonsClick, false);
	
	container.appendChild(buttonEdition);
	
	ol.control.Control.call(this, {
		element: container,
		target: options.target
	});
	
}
ol.inherits(ol.control.editionControl, ol.control.Control);


/*Creation de l'inteface de l'outil*/
ol.control.editionControl.prototype.move = function(){
	var this_ = this.getContext();	
		
	if(this_.selectInteraction != undefined)
		ol2d.removeInteraction(this_.selectInteraction);
	
	if(this_.editInteraction != undefined)
		ol2d.removeInteraction(this_.editInteraction);
	
	if(this_.dragInteraction != undefined)
		ol2d.removeInteraction(this_.dragInteraction);
	
	
	var debutDrag = false;
	var selectFeature;
	
	
	/*Drag and Drop*/
	dragInteraction = new ol.interaction.Pointer({	
		handleDownEvent: function(event){
			var feature = ol2d.forEachFeatureAtPixel(event.pixel,
				function(feature, layer){
					if(debutDrag == false){
						debutDrag = true;
						selectFeature = feature;
						return feature;
					}else{
						return false;
					}
				}
			);
			
			if(feature){					
				this.coordinate_ = event.coordinate;
				this.feature_ = feature;
			}
			
			return !!feature;
		},
		handleDragEvent: function (event){
			if(debutDrag == true){
				var deltaX = event.coordinate[0] - this.coordinate_[0];
				var deltaY = event.coordinate[1] - this.coordinate_[1];
				
				if(selectFeature){
					var geometry = selectFeature.getGeometry();
					geometry.translate(deltaX, deltaY);
					
					this.coordinate_[0] = event.coordinate[0];
					this.coordinate_[1] = event.coordinate[1];
				}
			}
			
		},
		handleMoveEvent: function(event){
			
		},
		handleUpEvent: function(event){			
			var idGeom = selectFeature.get('ID');
			var wkt = new ol.format.WKT();
			
			$('#' + this_.containerID).val(wkt.writeFeature(selectFeature));
						
			selectFeature = undefined;
			debutDrag = false;
			this.coordinate_ = null;
			this.feature_ = null;
			
			return false;
		}
	});
	
	ol2d.addInteraction(dragInteraction);
	
}

ol.control.editionControl.prototype.edition = function(){
	var this_ = this.getContext();	
	
	if(this_.selectInteraction != undefined)
		ol2d.removeInteraction(this_.selectInteraction);
	
	if(this_.editInteraction != undefined)
		ol2d.removeInteraction(this_.editInteraction);
	
	
	
	this_.selectInteraction = new ol.interaction.Select();
	ol2d.addInteraction(this_.selectInteraction);
	
	this_.editInteraction = new ol.interaction.Modify({
		features : this_.selectInteraction.getFeatures()			
	});
	ol2d.addInteraction(this_.editInteraction);
	
	var collection = this_.selectInteraction.getFeatures();
	
	collection.on('remove', function(e){	
		console.log('fin');
		ol2d.removeInteraction(this_.selectInteraction);
		ol2d.removeInteraction(this_.editInteraction);
		
		var feature = e.element;
		var idGeom = feature.get('ID');
		var wkt = new ol.format.WKT();
		
		
		var clone = feature.clone();
		clone.getGeometry().transform(strProjection, 'EPSG:4326');

		$('#' + this_.containerID).val(wkt.writeFeature(clone));
	});	
}

/* Context */
ol.control.editionControl.prototype.setContext = function(context){
    this.context = context;
};

ol.control.editionControl.prototype.getContext = function(){
	var undefined;
	if(undefined == this.context)
		return false;
	else
		return this.context
};


