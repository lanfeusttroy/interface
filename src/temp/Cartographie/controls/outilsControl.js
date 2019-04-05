ol.control.outilsControl = function (opt_options) {
	
	var options = opt_options || {};	
	var this_ = this;
			
	this.sketch;
	this.helpTooltipElement;
	this.helpTooltip;
	this.measureTooltipElement;
	this.measureTooltip;
	
	this.draw;	
	this.lengthLine = 0;
	this.compteur = 0;
	this.duree = 0;
	
	
	this.dictOverlay = {};
		
	this.continuePolygonMsg = 'Click pour tracer une zone'
	if(options.continuePolygonMsg)
		this.continuePolygonMsg = options.continuePolygonMsg;
	
	this.continueLineMsg = 'Click pour tracer une ligne';
	if(options.continueLineMsg)
		this.continueLineMsg = options.continueLineMsg;	
	
	this.helpMsg = 'Click pour commencer';
	if(options.helpMsg)
		this.helpMsg = options.helpMsg;
	
	this.wgs84Sphere = new ol.Sphere(6378137);
	
	
	this.unit = 'mn';
	if(options.unit)
		this.unit = options.unit;
	
	/*Zone de dialogue*/	
	this.dialogue;
	if(options.dialogue){		
		this.dialogue = options.dialogue;
	}
	
	this.lengthLine = 0;
		
		
	/*Outils PIM*/
	this.pim = false;
	if(options.pim)
		this.pim = options.pim;
	
	this.noeud = '12';
	if(options.noeud)
		this.noeud = options.noeud;
	
	this.uuid_Measure = this.guid();
	this.uuid_PIM = this.guid();	
	
	
	//->Plugin moment.js
	var today = moment().format('YYYY-MM-D HH:mm:ss');
	this.depart = options.today;
	
		 
	var container = document.createElement('div');
	container.className = 'ol-unselectable ol-control conteneur-measure';
	
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
			case "Measure":
				this_.createOutil('LineString', 'distance');
			break;	
			
			case "Area":
				this_.createOutil('Polygon', 'area');
			break;	
			
			case "Pim":
				this_.createOutil('LineString', 'pim');
			break;

			case "Clear":
				if(featureOverlayMeasure != undefined){
					this_.clear(e);
				}
			break;
		}
		
	}
	
	
		
	/*Measure*/
	var buttonMeasure = this.buttonMeasure = document.createElement('button');    
    buttonMeasure.typeControl = 'Measure';
	buttonMeasure.className = 'pull-left glyphicon mesure';
    buttonMeasure.addEventListener('click', handleButtonsClick, false);
	
	container.appendChild(buttonMeasure);
	
	var buttonArea = this.buttonArea = document.createElement('a');    
    buttonArea.typeControl = 'Area';
	
	buttonArea.className = 'pull-left glyphicon mesureArea';
    buttonArea.addEventListener('click', handleButtonsClick, false);
	
	container.appendChild(buttonArea);
	
	
	
	/* PIM */
	if(this.pim == true){
		var buttonPIM = this.buttonPIM = document.createElement('button');    
		buttonPIM.typeControl = 'Pim';
		buttonPIM.innerHTML = 'P';
		buttonPIM.className = 'pull-left ';
		buttonPIM.addEventListener('click', handleButtonsClick, false);
		
		container.appendChild(buttonPIM);
	}
	
	
	var buttonClear = this.buttonMarker = document.createElement('button');  	
    buttonClear.typeControl = 'Clear';
	buttonClear.className = 'pull-left glyphicon glyphicon-trash';
	container.appendChild(buttonClear);
    buttonClear.addEventListener('click', handleButtonsClick, false);
	
	container.appendChild(buttonClear);	

	ol.control.Control.call(this, {
		element: container,
		target: options.target
	});
    	
}
ol.inherits(ol.control.outilsControl, ol.control.Control);



ol.control.outilsControl.prototype.clear = function(map, pixel) {	
	var this_ = this.getContext();	
	var map = this_.getMap();
	
	var source = featureOverlayMeasure.getSource();
	source.clear();
		
	if($('#' + this_.uuid_Measure).length > 0)
		$('#' + this_.uuid_Measure).empty();	
	
	
	if($('#' + this_.uuid_PIM).length > 0)
		$('#' + this_.uuid_PIM).empty();
			
	
	var overlay;
	for(var i = 0; i < this_.compteur; i++){
		overlay = map.getOverlayById("mesure_" + i);
		map.removeOverlay(overlay);
	}
		
	this_.compteur = 0;
	
			
};


/* Conversion pour l'outil PIM */
ol.control.outilsControl.prototype.conversion = function(nbrHeure){
	var reste=(nbrHeure * 3600);
	var result='';

	var nbJours=Math.floor(reste/(3600*24));
	reste -= nbJours*24*3600;

	var nbHours=Math.floor(reste/3600);
	reste -= nbHours*3600;

	var nbMinutes=Math.floor(reste/60);
	reste -= nbMinutes*60;

	var nbSeconds=reste;

	if (nbJours>0)
		result=result+nbJours+'j ';

	if (nbHours>0)
		result=result+nbHours+'h ';

	if (nbMinutes>0)
		result=result+nbMinutes+'min ';

	

	return result;
}




/*Creation de l'inteface de l'outil*/
ol.control.outilsControl.prototype.createOutil = function(type, outil){
	this.outil = outil;
	this.type = type;
	
	this.map = this.getMap();		
	this.setContext(this);
	
	
	
	
	switch(outil){
		case "pim":	
			if($('#' + this.uuid_PIM).length == 0)
				this.addTab(this.uuid_PIM, 'PIM');
	
			if($('#' + this.uuid_PIM + '_dialogueVitessePIM').length == 0)
				this.createDialoguePIM();
			
				
		break;
		
		
		
		case "distance":
			if($('#' + this.uuid_Measure).length == 0)
				this.addTab(this.uuid_Measure, 'Distance');
			
			this.createMeasure();
		break;
	}
	
};

/*Zone de dialogue outil PIM*/
ol.control.outilsControl.prototype.createDialoguePIM = function(){
	var this_ = this.getContext();
	
	
	$('#' + this_.uuid_PIM).empty();
	$('#' + this_.uuid_PIM).append('<label>Vitesse(noeud)<input type="text" class="form-control" id="' + this_.uuid_PIM + '_dialogueVitessePIM" value="' + this_.noeud + '" /></label>');
	$('#' + this_.uuid_PIM).append('<div style="clear:both"></div>');
	$('#' + this_.uuid_PIM).append('<a class="btn btn-default" href="javascript:void(0)">Valider</a>');
	$('#' + this_.uuid_PIM).append('<div id="bilanPIM" style="margin-top:10px;"></div>');
	
	
	$('#' + this_.uuid_PIM + ' A').click(function(){
		this_.createMeasure();
	});
};


/*Zone de bilan trajectoire*/
ol.control.outilsControl.prototype.createBilanTrajectoire = function(){
	var this_ = this.getContext();
		
	
	$('#' + this_.uuid_Measure).append('<label>Mesure (' + this_.compteur + ')</label>');	
	
	var ligne = '<table class="table">' +
					'<tr>'  +
						'<td width="150px">Kilomètre(Km)</td>' +
						'<td>' + this.conversionUnite(this_.lengthLine, 'km') + '</td>' +
					'</tr>' +
					'<tr>'  +
						'<td width="150px">Mètre (m)</td>' +
						'<td>' + this.conversionUnite(this_.lengthLine, 'm') + '</td>' +
					'</tr>' +
					'<tr>'  +
						'<td width="150px">Mille marin (mn)</td>' +
						'<td>' + this.conversionUnite(this_.lengthLine, 'mn') + '</td>' +
					'</tr>' +
				'</table>';
	
	$('#' + this_.uuid_Measure).append(ligne);
};

/*Zone de bilan trajectoire*/
ol.control.outilsControl.prototype.createBilanPIM = function(){
	var this_ = this.getContext();
	
	var distance_MN = this.conversionUnite(this_.lengthLine, 'mn');
	
	//en heure
	this_.duree = 0;		
	if(this_.dialogue != undefined){	
		this_.noeud = parseInt($('#' + this_.uuid_PIM + '_dialogueVitessePIM').val())					
	}
	
	this_.duree = distance_MN / this_.noeud;
	
	var ligne = 
				'<label>Mesure (' + this_.compteur + ')</label>' +
				'<table class="table">' +
					'<tr>'  +
						'<th>Vitesse (Noeud)</th>' +
						'<th>Distance (Mn)</th>' +
						'<th>Temps</th>' +
					'</tr>' +
					'<tr>'  +
						'<td width="150px">' + this_.noeud + '</td>' +
						'<td>' + distance_MN + '</td>' +
						'<td>' + this_.conversion(this_.duree) + '</td>' +
					'</tr>' +					
				'</table>';
		
	$('#bilanPIM').append(ligne);
};



/*Conversion*/
ol.control.outilsControl.prototype.conversionUnite = function(length, unite){
	
	var valeur = 0;
	
	switch(unite){
		case "km":
			valeur = ((length / 1000 * 100) / 100).toFixed(2);
		break;
		
		case "m":
			valeur = ((length * 100) / 100).toFixed(2);	
		break
		
		case "mn":
			valeur = ((((length * 100) / 100)) * 0.000539957).toFixed(2);
		break;
	}
	
	return valeur;
};


/*Creation des outils*/
ol.control.outilsControl.prototype.createMeasure = function(){
	var this_ = this.getContext();
	
	
	
		
	//couche technique pour les outils
	if(featureOverlayMeasure == undefined){ //parametre.js
		this.createLayerOutils();		
	}
		
		
	//interaction
	this.draw = new ol.interaction.Draw({             
            source : featureOverlayMeasure.getSource(),
            type: this_.type,
			style: this.style()
        });
		
	this.createMeasureTooltip();
	this.createHelpTooltip();
	
	//->Events	
	this.map.on('pointermove', this.pointerMoveHandler, this)
	this.draw.on('drawstart', this.drawStartFeature, this);
	this.draw.on('drawend', this.drawEndFeature, this);
	
	this_.map.addInteraction(this.draw);
};


ol.control.outilsControl.prototype.pointerMoveHandler = function(evt){
	var this_ = this.getContext();	
	
	var formatArea = function(polygon) {
		var area;
		
		var sourceProj = this_.getMap().getView().getProjection();
		var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
			sourceProj, 'EPSG:4326'));
		var coordinates = geom.getLinearRing(0).getCoordinates();
		area = Math.abs(this_.wgs84Sphere.geodesicArea(coordinates));
		
		
		
		var output;
		if (area > 10000) {
			output = (Math.round(area / 1000000 * 100) / 100) +
				' ' + 'km<sup>2</sup>';
		} else {
			output = (Math.round(area * 100) / 100) +
				' ' + 'm<sup>2</sup>';
		}
		return output;
	};
		
	var formatLength = function(line) {
		var length;		
		
		var coordinates = line.getCoordinates();
		length = 0;
		var sourceProj = this_.getMap().getView().getProjection();
		
		for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
			var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
			var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
			length += this_.wgs84Sphere.haversineDistance(c1, c2); //en metre
		}
		
		this_.lengthLine = length;
		
		var output;
		
		switch(this_.unit){
			case 'km':
				output = ((length / 1000 * 100) / 100).toFixed(2) +
				' ' + 'km';
			break;

			case 'mn':
				var lengthMeter = (length * 100) / 100;				
				output = (lengthMeter * 0.000539957).toFixed(2) +
				' ' + 'mn';
			break;
		}
		
		return output;
	};
	
	var formatPim = function(line) {
		var length;		
		
		var coordinates = line.getCoordinates();
		length = 0;
		var sourceProj = this_.getMap().getView().getProjection();
		
		for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
			var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
			var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
			length += this_.wgs84Sphere.haversineDistance(c1, c2); //en metre
		}
		
		this_.lengthLine = length;
		
		var output;	
		
		var lengthMeter = (length * 100) / 100;				
		var lengthMN = (lengthMeter * 0.000539957).toFixed(2);
				
		//en heure
		this_.duree = 0;		
		if(this_.dialogue != undefined){	
			this_.noeud = parseInt($('#' + this_.uuid_PIM + '_dialogueVitessePIM').val())					
		}
		
		
		this_.duree = lengthMN / this_.noeud;			
		output = this_.conversion(this_.duree);
		
		return output;
	};
	
	
	if (evt.dragging) {
		return;
	}
	
	var tooltipCoord = evt.coordinate;
	if (this_.sketch) {		
		var output;		
		
		var geom = (this_.sketch.getGeometry());
		switch(this_.outil){
			case "distance":
				output = formatLength( /** @type {ol.geom.LineString} */ (geom));
				this_.helpMsg = this_.continueLineMsg;
				tooltipCoord = geom.getLastCoordinate();
			break;
			
			case "area":
				output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
				this_.helpMsg = this_.continuePolygonMsg;
				tooltipCoord = geom.getInteriorPoint().getCoordinates();
			break;
			
			case "pim":
				output = formatPim( /** @type {ol.geom.LineString} */ (geom));
				this_.helpMsg = this_.continueLineMsg;
				tooltipCoord = geom.getLastCoordinate();
			break;
			
		}
		
		this_.measureTooltipElement.innerHTML = output;
		this_.measureTooltip.setPosition(tooltipCoord);
	}
	
	this_.helpTooltipElement.innerHTML = this_.helpMsg;
	this_.helpTooltip.setPosition(evt.coordinate);
}

ol.control.outilsControl.prototype.drawStartFeature = function(evt){
	var this_ = this.getContext();
	
	this_.sketch = evt.feature;
};

ol.control.outilsControl.prototype.drawEndFeature = function(evt){
	var this_ = this.getContext();	
	var map = this_.getMap();
	
	this_.measureTooltipElement.className = 'tooltip tooltip-static';
    this_.measureTooltip.setOffset([0, -7]);	
	
	this_.compteur = this_.compteur + 1;
	var textTipElement = "<b>(" + this_.compteur + ")</b>  " + this_.measureTooltipElement.innerHTML;
	
	this_.measureTooltipElement.innerHTML = textTipElement;
		
	 // unset sketch
	this_.sketch = undefined;	
	this_.helpTooltipElement = undefined;
	
	if(this_.dialogue != undefined){
		switch(this_.outil){
			case "distance":
				this.createBilanTrajectoire();
			break;
			case "pim":
				this.createBilanPIM();
			break;
		}
	}
		
	
	
	// unset tooltip so that a new one can be created
	this_.measureTooltipElement = null;
	this_.createMeasureTooltip();
	
	map.removeInteraction(this_.draw);
	map.removeOverlay(this_.measureTooltip);
	map.removeOverlay(this_.helpTooltip);	
	
	map.un('pointermove', this.pointerMoveHandler, this);
};



/* Layer pour le trace des outils*/
ol.control.outilsControl.prototype.createLayerOutils = function(){	
	var this_ = this.getContext();
	
	featureOverlayMeasure = new ol.layer.Vector({
		id: 'measure',
		categorie: 'technique',
		isquery: false,
		map: ol2d, //parametre.js
		source: new ol.source.Vector({
			features: new ol.Collection(),
			useSpatialIndex: false
		}),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
			  color: '#FA9702',
			  lineDash: [10, 10],
			  width: 2
			}),
			image: new ol.style.Circle({
			  radius: 7,
			  fill: new ol.style.Fill({
				color: '#FA9702'
			  })
			})
		  })
	});	
	
};






/*InfoBulle de depart*/
ol.control.outilsControl.prototype.createHelpTooltip = function(evt){
	var this_ = this.getContext();	
	var map = this_.getMap();
	
	if (this_.helpTooltipElement) {
		this_.helpTooltipElement.parentNode.removeChild(this_.helpTooltipElement);
	}
	
	this_.helpTooltipElement = document.createElement('div');
	this_.helpTooltipElement.className = 'tooltip';
	this_.helpTooltip = new ol.Overlay({
						element: this_.helpTooltipElement,
						offset: [15, 0],
						positioning: 'center-left'
					});
					
	map.addOverlay(this_.helpTooltip);
}



/*Creation de l'info bulle pour les outils de mesure*/
ol.control.outilsControl.prototype.createMeasureTooltip = function(evt){
	var this_ = this.getContext();	
	var map = this_.getMap();
	
	if (this.measureTooltipElement) {
		this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
	}
	
	this.measureTooltipElement = document.createElement('div');
	this.measureTooltipElement.className = 'tooltip tooltip-measure';
	
	
	this.measureTooltip = new ol.Overlay({
							id: "mesure_" + this_.compteur,
							element: this.measureTooltipElement,
							offset: [0, -15],
							positioning: 'bottom-center'
						});
	map.addOverlay(this.measureTooltip);
}




/* Context */
ol.control.outilsControl.prototype.setContext = function(context){
    this.context = context;
};

ol.control.outilsControl.prototype.getContext = function(){
	var undefined;
	if(undefined == this.context)
		return false;
	else
		return this.context
};


/*Feuille de style pour les outils*/
ol.control.outilsControl.prototype.style = function(){
   var style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.8)'
      }),
      stroke: new ol.style.Stroke({
        color: '#FA9702',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: '#FA9702'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.8)'
        })
      })
    });

    return style;
}

ol.control.outilsControl.prototype.addTab = function(uuid, title) { 
	var this_ = this.getContext();	
	var idContainer = this_.dialogue;
	var $objTab;
	var $objContent;
	
	
	
	if($('#' + idContainer +' .nav-tabs:eq(0) li').length == 0){	
		
		$('#' + idContainer +' .nav-tabs:eq(0)').append('<li  class="active"><a href="#' + uuid + '"  role="tab" data-toggle="tab">' + title + '<span style="margin-left:5px; cursor:pointer" class="ti-close"></span></a></li>')
		$('#' + idContainer +' .tab-content:eq(0)').append('<div role="tabpanel" style="padding:5px;" class="tab-pane active" id="' + uuid + '"></div>')		
	
	}else{
		$('#' + idContainer +' .nav-tabs li:eq(0)').removeClass('active');
		$('#' + idContainer +' .tab-content:eq(0)').removeClass('active');
		
		$objTab = $('#' + idContainer +' .nav-tabs li:eq(0)').first().clone();
		$objContent = $('#' + idContainer +' .tab-content div:eq(0)').first().clone();	
		
		$objTab.find('a').attr({'href':'#' + uuid });
		$objTab.find('a').empty();
		$objTab.find('a').append(title + '<span style="margin-left:5px; cursor:pointer" class="ti-close"></span>');
	
		$objContent.attr({'id': uuid});
		$objContent.empty();
		
		$('#' + idContainer +' .nav-tabs:eq(0)').append($objTab);
		$('#' + idContainer +' .tab-content:eq(0)').append($objContent);
		
	}
	
	
	$('#' + idContainer + ' a[href="#' + uuid + '"]').tab('show');	
	$('.ti-close').bind('click', { idContainer: idContainer }, eventRemoveTab);
}


ol.control.outilsControl.prototype.guid = function() {    
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}