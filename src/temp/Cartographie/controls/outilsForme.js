/*
* Ensemble des outils pour créer, modifier, déplacer ou supprimer des formes
* Sur OpenLayer 3
*
*/

ol.control.outilsForme = function (opt_options) {
	var options = opt_options || {};	
	var this_ = this;
	
		
	/*Zone de dialogue*/	
	this.dialogue;
	if(options.dialogue){		
		this.dialogue = options.dialogue;
	}
	
	/*Data Projection*/	
	this.strDataProjection = "EPSG:4326";
	if(options.strDataProjection){		
		this.strDataProjection = options.strDataProjection;
	}
	
	/*Projection*/	
	this.strProjection = "EPSG:900913";
	if(options.strProjection){		
		this.strProjection = options.strProjection;
	}
	
	
	
	var container = document.createElement('div');
	container.className = 'ol-unselectable ol-control conteneur-outilsForme';
	
	
	/*Event*/
	var handleButtonsClick = function (e) {		
		e = e || window.event;

		//Disabled Controls buttons
		var elementsButton = container.getElementsByTagName('button');
		for(var i = 0; i < elementsButton.length; i++) {
			elementsButton.item(i).classList.remove('enable');		
		}
		
		e.target.classList.toggle('enable');
		
		switch(e.target.typeControl){
			case "cancel":				
				//Clear interaction -> cartographie.js
				this_.cancel();
			break;
			
			case "drawPoint":
				this_.createOutilDraw(e, "Point");
			break;
			
			case "drawLine":
				this_.createOutilDraw(e, "LineString");
			break;
			
			case "drawPolygon":
				this_.createOutilDraw(e, "Polygon");
			break;
			
			
			
			
			case "moveForme":
				this_.createOutilMove(e);
			break;	
			
			case "editForme":
				this_.createOutilEdit(e);
			break;	
			
		}
	};
	
	/*Outils de creation de forme*/
	
	/*Annuler l'opération en cours*/
	var buttonCancel = this.buttonCancel = document.createElement('button');    
    buttonCancel.typeControl = 'cancel';
	buttonCancel.className = 'pull-left glyphicon cancel';
    buttonCancel.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonCancel);
	
	/*Point*/
	var buttonDrawPoint = this.buttonDrawPoint = document.createElement('button');    
    buttonDrawPoint.typeControl = 'drawPoint';
	buttonDrawPoint.className = 'pull-left glyphicon drawPoint';
    buttonDrawPoint.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonDrawPoint);
	
	/*Line*/
	var buttonDrawLine = this.buttonDrawLine = document.createElement('button');    
    buttonDrawLine.typeControl = 'drawLine';
	buttonDrawLine.className = 'pull-left glyphicon drawLine';
    buttonDrawLine.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonDrawLine);
	
	/*Polygon*/
	var buttonDrawPolygon = this.buttonDrawPolygon = document.createElement('button');    
    buttonDrawPolygon.typeControl = 'drawPolygon';
	buttonDrawPolygon.className = 'pull-left glyphicon drawPolygon';
    buttonDrawPolygon.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonDrawPolygon);
	
	
	/*separateur*/
	var separateur = document.createElement('div');  
	separateur.className = 'pull-left glyphicon separateur';
	container.appendChild(separateur);
	
	
	/*Outils d'edition de forme*/
	
	/*Deplacer une forme*/
	var buttonMoveForme = this.buttonMoveForme = document.createElement('button');    
    buttonMoveForme.typeControl = 'moveForme';
	buttonMoveForme.className = 'pull-left glyphicon moveforme';
    buttonMoveForme.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonMoveForme);
	
	/*Editer une forme*/
	var buttonEditForme = this.buttonEditForme = document.createElement('button');    
    buttonEditForme.typeControl = 'editForme';
	buttonEditForme.className = 'pull-left glyphicon editforme';
    buttonEditForme.addEventListener('click', handleButtonsClick, false);

	container.appendChild(buttonEditForme);
	
	
	
	
	ol.control.Control.call(this, {
		element: container,
		target: options.target
	});

}
ol.inherits(ol.control.outilsForme, ol.control.Control);

/*Annuler l'operation en cours*/
ol.control.outilsForme.prototype.cancel = function(evt){
	var map = this.map = this.getMap();	
	
	//Clear interaction -> cartographie.js
	clearInteraction(map);
}

/* Outils creer une forme*/
ol.control.outilsForme.prototype.createOutilDraw = function(evt, type){
	console.log("Draw " + type);
	
	
	var map = this.map = this.getMap();	
	this.setContext(this);
	
	
	//Clear interaction -> cartographie.js
	clearInteraction(map);
	
	var style = styleAdd; //->Fichier style.js	
	var geometryFctDraw;
	
	switch (type){
		case "LineString":
			style = styleAddLine; //->Fichier style.js
		break;		
		
		case "Square":
			geometryFctDraw = ol.interaction.Draw.createRegularPolygon(4);
		break;
	}
	
	this.objLayer = this.getLayerCourant();
	if(this.objLayer !== false){
		
		this.drawInteraction = new ol.interaction.Draw({             
			source : this.objLayer.getSource(),
			type: type,
			geometryFunction : geometryFctDraw,
			style: style
		});
		
		this.drawInteraction.on('drawend', this.drawEndFeature, this);		
		this.map.addInteraction(this.drawInteraction);
		
	}
		
	
}

ol.control.outilsForme.prototype.drawEndFeature = function(evt){
	var this_ = this.getContext();
	var map = this_.getMap();
	
	var feature = evt.feature;
	
	
	map.removeInteraction(this.drawInteraction);
	
	this.createFormulaire(feature);
	//console.log(wkt.writeFeature(feature));
	
}

/*Fenetre de dialogue*/
ol.control.outilsForme.prototype.createFormulaire = function(feature){
	var this_ = this.getContext();
	
	var uuidObj = this.objLayer.get("id");	
		
	var wkt = new ol.format.WKT();
	var typeGeom =  feature.getGeometry().getType();
	
	
	
	var strWkt = (wkt.writeFeature(feature,  {
											  dataProjection: this.strDataProjection,
											  featureProjection: this.strProjection
											}));
											
	
	
	//Creation du formulaire de dialogue
	//->common.js	
	addFormZoneLibre(feature, this.objLayer);
	
	
}


/* Outils modifier une forme */

ol.control.outilsForme.prototype.createOutilEdit = function(evt){
	console.log('outils select forme');
	
	
		
	var map = this.map = this.getMap();	
	this.setContext(this);
	
	this.objLayer = this.getLayerCourant();
	
	
	//Clear interaction -> cartographie.js
	clearInteraction(map);
	
	
	//interaction selection forme
	this.selectInteraction = new ol.interaction.Select();	
	this.map.addInteraction(this.selectInteraction);
	
		
	//interaction edition de la forme
	this.editInteraction = new ol.interaction.Modify({
		features : this.selectInteraction.getFeatures()			
	});
	
	this.collection = this.selectInteraction.getFeatures();	
	this.collection.on('remove',this.editEndForme, this);
	
		
	this.map.addInteraction(this.editInteraction);
}

ol.control.outilsForme.prototype.editEndForme = function(evt){
	var this_ = this.getContext();	
	var map = this_.getMap();
	
	
	
	map.removeInteraction(this_.selectInteraction);
	map.removeInteraction(this_.editInteraction);
	
	var feature = evt.element;
	
	var wkt = new ol.format.WKT();
	var clone = feature.clone();
	clone.getGeometry().transform(strProjection, this.strDataProjection);
	
	//Creation du formulaire de dialogue
	//->common.js	
	editFormZoneLibre(feature, this.objLayer);
	
}

/* Outils deplacer une forme */

ol.control.outilsForme.prototype.createOutilMove = function(evt){
	console.log('outils move forme');
	
	
	
	var map = this.map = this.getMap();
	var debutDrag = false;
	var selectFeature;
	
	this.setContext(this);	
	
	//Clear interaction -> cartographie.js
	clearInteraction(map);
	
	this.dragInteraction = new ol.interaction.Pointer({	
		handleDownEvent: function(event){
			
			var feature = map.forEachFeatureAtPixel(event.pixel,
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
			
			debutDrag == false;
		}
	});
	
	//this.dragInteraction = new ol.interaction.Pointer();	
	
	// this.dragInteraction.on('handleDownEvent',this.downEvent, this);
	// this.dragInteraction.on('handleDragEvent',this.dragEvent, this);
	// this.dragInteraction.on('handleUpEvent',this.upEvent, this);
	
	this.map.addInteraction(this.dragInteraction);	
	
}


/* Layer courant */
ol.control.outilsForme.prototype.getLayerCourant = function(){
	var map = this.map = this.getMap();
	
	var layers = map.getLayers();	
	var nbrLayers = layers.getLength();
	var layerCourant;
	
	var trouve = false;
	
		
	if(nbrLayers > 0){
		console.log(layers.getLength());
		var i = 1;
		while(trouve === false && i <= nbrLayers){
			layerCourant = layers.item(nbrLayers - i);
			
			if(layerCourant.get('ressource') == 'zoneLibre'){
				console.log("layer courant : " + layerCourant.get('id'));
				trouve = true;			
			}
			
			i++;
		}
		
	}  
	
	if(trouve == true)
		return layerCourant;
	else
		return false;
};


/* Context */
ol.control.outilsForme.prototype.setContext = function(context){
    this.context = context;
};

ol.control.outilsForme.prototype.getContext = function(){
	var undefined;
	if(undefined == this.context)
		return false;
	else
		return this.context
};