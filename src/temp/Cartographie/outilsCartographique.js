var _interaction = false;


/*
* Gestion des interactions
* Supprime les interactions lors d'un changement d'action
*
*/

function clearInteraction(map){
	//Boucle pour supprimer quand une interaction depend d'une autre
	//exemple select -> modify
	for(var i=0; i<=2; i++){
		
		map.getInteractions().forEach(function (interaction) {		  
		  
		  if(interaction instanceof ol.interaction.Select) { 
				console.log("select");
				map.removeInteraction(interaction);
		  }
		  
		  if(interaction instanceof ol.interaction.Draw) { 
				console.log("draw");
				map.removeInteraction(interaction);
		  }
		  
		  
		 if(interaction instanceof ol.interaction.Modify) { 
				console.log("modify");
				map.removeInteraction(interaction);
		  }
		  
		  
		});
		
		i++;
	}
	
	
}

/*
* 
*
*
*/


/*
* Modifier une forme
*
*/

/* Edit  */
// function editForm(obj){
			
	// if(_interaction != false){
		// ol2d.removeInteraction(_interaction);
		// _interaction = false;
	// }
	
	
	
		
	// ol2d.addInteraction(_interaction);
// }



/*
* Outils de forme
*
*/
// function drawForm(typeControl){
	// var layers = ol2d.getLayers();
	// var geometryFctDraw;
	
	
	// if(_interaction != false){
		// ol2d.removeInteraction(_interaction);
		// _interaction = false;
	// }
	

	// if (typeControl == 'Square') {
		// typeControl = 'Circle';
		// geometryFctDraw = ol.interaction.Draw.createRegularPolygon(4);
	// }
	
	
	// var style = styleAdd;
	
	// if (typeControl == 'LineString') {
		// style = styleAddLine;
	// }
	
	
	// if(layers.getLength() > 0){
		// var objLayer = getLayerCourant(layers); //common.js
		
		// var drawInteraction = new ol.interaction.Draw({             
			// source : objLayer.getSource(),
			// type: typeControl,
			// geometryFunction : geometryFctDraw,
			// style: style
		// });
		
		 // _interaction = drawInteraction;
		
		// _interaction.on('drawend', drawEndFeature);
		
		// ol2d.addInteraction(_interaction);
		
	// }
		
// }

// function drawEndFeature(evt){
	// var layers = ol2d.getLayers();
	// var objLayer = getLayerCourant(layers); //common.js
	
	// var feature = evt.feature;
	// var wkt = new ol.format.WKT();
	
	
	// console.log(wkt.writeFeature(feature));
	
	// ol2d.removeInteraction(_interaction);
	// _interaction = false;
	
	
	// addFormZoneLibre(feature, objLayer); //common.js
// }





/*
* Affiche la trajectoire courante d'un navire
* imo, uuid, id_bbd, uuidContainer
*/

function createTrajectoire(imo, uuid, id_bdd, uuidContainer){
	
	//feature, objLayer, uuidContainer
	
	
	// var imo = feature.get('IMO');	
	// var uuid = objLayer.get("id");
		
	// var id_bdd = feature.get("id_bdd");
	
	
	
	if(!dictfeatureVectorTrajectoire[uuid]){
		dictfeatureVectorTrajectoire[uuid] = [];	
	}
	
	if(!dictfeatureVectorTrajectoire[uuid][id_bdd]){
		console.log("Creation de la couche vector trajectoire");
		
		var featureOverlayTrajectoire = new ol.layer.Vector({			
			categorie: 'technique',
			isquery: false,					
			source: new ol.source.Vector({
				features: new ol.Collection(),
				useSpatialIndex: false
			}),
			style: styleTrajectoireOrientation //(styleTrajectoireClassique , styleTrajectoireOrientationDateTime) style.js
		});	
		
		dictfeatureVectorTrajectoire[uuid][id_bdd] = featureOverlayTrajectoire;
		ol2d.addLayer(dictfeatureVectorTrajectoire[uuid][id_bdd]);
		
		var featureTechniqueTrajectoireSource = dictfeatureVectorTrajectoire[uuid][id_bdd].getSource();
		
		var format = new ol.format.GeoJSON({
			defaultDataProjection: strProjectionData				
		});
		
		var url = urlApplication + "trajectoires/geojsonTrajectoire";				
	
		$.ajaxSetup({cache:false});
		
		//$('#' + uuidContainer).empty();
		
		//->Common.js
		var color = getRandomColor();
		
		
		$.ajax({
			type : 'POST',
			url : url,	
			data: {id_bdd:id_bdd, color:color},
			success : function(data) {				
				
				featureTechniqueTrajectoireSource.addFeatures(format.readFeatures(data,  {dataProjection: strProjectionData, featureProjection: strProjection}));							
				
				var featureMultiPointSearch = featureTechniqueTrajectoireSource.getFeatureById("MultiPoint-" + id_bdd);				
				var arrayTrajectoire = trajectoireWFS2ARRAY(featureMultiPointSearch);
				
				
				//->Mise en couleur de l'onglet
				$("A[idtab='" + uuidContainer + "']").css({"border-bottom":"3px solid " + color});
				
				trajectoireToTable(arrayTrajectoire, uuidContainer);
				
				
				$('#chargement_'+ uuidContainer).remove();
				
				$.ajaxSetup({cache:true});
			}
		});		
	}
		
}

/*
* Permet de récupérer la zone d'affichage
* dans la projection donnée en parametre
*
*/
function getExtent2EPSG(map, projection){
	var extent = map.getView().calculateExtent(map.getSize());
	extent = ol.proj.transformExtent(extent, strProjection, strProjectionData);
	
	console.log(extent);
	
}


/*
* 
* Permer d'afficher le resultat d'une trajectoire dans un tableau
* 
*/
function trajectoireWFS2ARRAY(MultiPointFeature){
	var arrayDate = MultiPointFeature.get('ARRAY_DATE');
	
	var cpt = 0;
	var arrayTrajectoire = [];
	var color = "";
	
	$.each(MultiPointFeature.getGeometry().getCoordinates(), function(i, point) {
		var coord = ol.proj.transform(point, strProjection, strProjectionData);
		
				
		var position = {
					DATE:arrayDate[cpt],
					LON:coord[0],
					LAT:coord[1]				
				}; 	

		arrayTrajectoire.push(position);
		
		cpt++;
	});
	
	arrayTrajectoire.sort(function(a, b){ 
		var dateA=new Date(a.DATE), dateB=new Date(b.DATE)
		return dateA-dateB 
	})
	
	
	return arrayTrajectoire;
}


function trajectoireToTable(arrayTrajectoire, uuidContainer){	

		
	// var $containerTrajectoire = $("#" + uuidContainer + "_Historiques")
	// console.log(containerTrajectoire);
	
	
	$('#' + uuidContainer + '_Historiques').append('<label for="styletrajectoire_' + uuidContainer + '"></label>');
	$('#' + uuidContainer + '_Historiques label').append('Style<select id="styletrajectoire_' + uuidContainer + '" style="width:250px" class="form-control style"></select');
	$('#' + uuidContainer + '_Historiques label select ').append('<option value="classique">Classique</option>');
	$('#' + uuidContainer + '_Historiques label select ').append('<option value="orientation" selected="selected">Orientation</option>');
	$('#' + uuidContainer + '_Historiques label select ').append('<option value="capteur">Capteur</option>');
	$('#' + uuidContainer + '_Historiques label select ').append('<option value="information">Information</option>');
	
	$('#' + uuidContainer + '_Historiques').append('<table class="table"></table>');
	$('#' + uuidContainer + '_Historiques table').append('<tr></tr>');
	$('#' + uuidContainer + '_Historiques tr:last').append('<th></th>');
	$('#' + uuidContainer + '_Historiques tr:last').append('<th>DATE</th>');
	$('#' + uuidContainer + '_Historiques tr:last').append('<th>LON</th>');
	$('#' + uuidContainer + '_Historiques tr:last').append('<th>LAT</th>');
	
	$.each(arrayTrajectoire, function(i, enreg) {
				
		$('#' + uuidContainer + '_Historiques table').append('<tr></tr>');
		$('#' + uuidContainer + '_Historiques tr:last').append('<td><span style="cursor:pointer" class="ti-search"></span></td>');
		$('#' + uuidContainer + '_Historiques tr:last').append('<td>' + enreg.DATE + '</td>');
		$('#' + uuidContainer + '_Historiques tr:last').append('<td>' + (enreg.LON).toFixed(5) + '</td>');
		$('#' + uuidContainer + '_Historiques tr:last').append('<td>' + (enreg.LAT).toFixed(5) + '</td>');	
				
	});
	
	//EVENTS	
	//$('#' + uuidContainer + ' .ti-search').click(moveTrajectoire, removeSelectTrajectoire);
	
	$('#' + uuidContainer + ' .ti-search').click(function(){
		var $ligne = $(this).parent().parent();
	
		var lon = parseFloat($ligne.find("td:eq(2)").text());								
		var lat = parseFloat($ligne.find("td:eq(3)").text());
		
		var marker = new ol.Feature({
								geometry: new ol.geom.Point(ol.proj.transform([lon, lat], strProjectionData, strProjection))
							});
		
		selectMarker(marker);
		ol2d.getView().setCenter(ol.proj.transform([lon, lat], strProjectionData, strProjection));	
	})
	
	var styleSelect = $('#styletrajectoire_' + uuidContainer);
	
	styleSelect.on('change', function(e, ui){
		var uuidRessource = $(e.target).attr("id");
		var position = uuidRessource.indexOf("_") + 1;
		var uuidContainer = uuidRessource.substring(position);		
				
		var uuid = $("A[idtab='" + uuidContainer + "']").attr('layerparent');
		var idmarker = $("A[idtab='" + uuidContainer + "']").attr('idmarker');
		//-> common.js
		changeStyleTrajectoire(uuid, idmarker, $(e.target).val());
		
	});
	
}

function removeSelectTrajectoire(){
	if(featureTechniqueTrajectoireSelect != undefined){
		var source =  featureTechniqueTrajectoireSelect.getSource();
		source.clear();
	}
}

function moveTrajectoire(){
	var $ligne = $(this).parent().parent();
	
	var lon = parseFloat($ligne.find("td:eq(2)").text());								
	var lat = parseFloat($ligne.find("td:eq(3)").text());
	
	var marker = new ol.Feature({
							geometry: new ol.geom.Point(ol.proj.transform([lon, lat], strProjectionData, strProjection))
						});
	
	selectMarker(marker);
	ol2d.getView().setCenter(ol.proj.transform([lon, lat], strProjectionData, strProjection));	
	
}

/*
* Met en avant un objet sélectionné
*
*/
function selectMarker(feature){
		
	
		
	if(featureTechniqueTrajectoireSelect == undefined){
		featureTechniqueTrajectoireSelect = new ol.layer.Vector({
						id: 'selectmarker',
						categorie: 'technique',
						isquery: false,
						map: ol2d,
						source: new ol.source.Vector({
							features: new ol.Collection(),
							useSpatialIndex: false
						}),
						style: styleSelect
					});
	}
	
	// feature.setStyle(stylePoint);	
	var source =  featureTechniqueTrajectoireSelect.getSource();
	source.clear();
	source.addFeature(feature);	
}


/*
* Outils cartographique
* Permer de visualiser une zone au format WKT sur la map
* 
*/

function visualiserWKT(object){
	
	var wkt;
	
	console.log(typeof(object));
	
	if(typeof(object) == "string"){
		wkt = object;
	}else{
		wkt = object.data.wkt;
	}
	
		
	
	console.log(wkt);
		
	if(featureTechniqueForme == undefined){
		featureTechniqueForme = new ol.layer.Vector({
						id: 'visualiserForme',
						categorie: 'technique',
						isquery: false,
						map: ol2d,
						source: new ol.source.Vector({
							features: new ol.Collection(),
							useSpatialIndex: false
						}),
						style: styleForme
					});
					
					
	}
	
	var featureTechniqueFormeSource = featureTechniqueForme.getSource();
	featureTechniqueFormeSource.clear();
	
	var format = new ol.format.WKT();
	var feature = format.readFeature(wkt,{dataProjection: strProjectionData, featureProjection: strProjection});
	

	// ol2d.getView().setZoom(6);
	
	
	// ol2d.getView().setCenter(ol.proj.transform([lon, lat], strProjectionData, strProjection));
	
	featureTechniqueFormeSource.addFeature(feature);
	
	
}

/*
* Outils cartographique
* Dessine une forme sur la map et affiche le resultat au format wkt
*
*/
function createForme2WKT($container){
	var formatWKT = '';
	
	if(_interaction != false){
		ol2d.removeInteraction(_interaction);
		_interaction = false;
	}
	
	var interactionDraw = new ol.interaction.Draw({ 		
			type: 'Polygon',			
			style: styleSelect
		});
		
	_interaction = interactionDraw;
			
	_interaction.on('drawend', function(e){					
			var wkt = new ol.format.WKT();					
			var feature = e.feature;
			
			var clone = feature.clone();
			clone.getGeometry().transform(strProjection, strProjectionData);			
			$container.val(wkt.writeFeature(clone));
			
			console.log(wkt.writeFeature(feature));
			
			ol2d.removeInteraction(_interaction);		
											
		});
		
		
	ol2d.addInteraction(_interaction);
}


function zoom(){
	if(_interaction != false){
		ol2d.removeInteraction(_interaction);
		_interaction = false;
	}

	var zoom = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color:'#D3CA34'
			})
		});
	
	var interactionZoom = new ol.interaction.DragZoom({
		condition: ol.events.condition.always,
		style: zoom
	});	
	
	
	_interaction = interactionZoom;
	_interaction.on('boxend', function(e){
		if(_interaction != false){
			ol2d.removeInteraction(_interaction);
			_interaction = false;
		}		
	});
	ol2d.addInteraction(_interaction);
}

function exportPNG(){
	
	ol2d.once('postcompose', function(event){
		var canvas = event.context.canvas;
		
		if(navigator.msSaveBlob){
			console.log("1");
		}else{			
			canvas.toBlob(function(blob){
				var saveMap = saveAs(blob, 'map.png');
			});		
			
		}
		
	});
	
	ol2d.renderSync();
}




function selectElements(){
	if(_interaction != false){
		ol2d.removeInteraction(_interaction);
		_interaction = false;
	}
	
	var selectInteraction = new ol.interaction.DragBox({
		condition: ol.events.condition.always,
		style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color:[255,191,0,1]
				})
		})
	});
	
	_interaction = selectInteraction;
	_interaction.on('boxend', function(evt){
		var layers = ol2d.getLayers();
		
		var objLayer = getLayerCourant(layers); //common.js
		var box = _interaction.getGeometry().getExtent();		
		var type = objLayer.get("type");
		
		
		var box_4326  = ol.proj.transformExtent(box, strProjection, strProjectionData);
		
		
		switch(type){
			case "wms":
				var format = new ol.format.GeoJSON();
				
				var selectFeatures = new Array();
				var vectorSource = new ol.source.Vector({});
				
				var source = objLayer.getSource();
				var params = source.getParams();
					
				var requete = 	"wfs?" +
							"SERVICE=WFS&" +
							"VERSION=1.0.0&" +
							"REQUEST=GetFeature&" +
							"maxFeatures="+ nbrEnregMaxWMS + "&" +
							"typeNames=" + params.LAYERS + "&" +
							"outputFormat=application/json&" +
							"BBOX=" + box_4326;
							
				
				
				//-> Ajax synchrone			
				$.ajax({
					url: '' + urlGeoserver + requete + '',
					success: function(data){						
						vectorSource.addFeatures(format.readFeatures(data));
						
						arrayData = transformWFS2ARRAY(vectorSource);						
						arrayAttribute = listeAttribute(vectorSource);
						
												
						resultatSelection(arrayData, arrayAttribute, objLayer);
						
						if(_interaction != false){
							ol2d.removeInteraction(_interaction);
							_interaction = false;
						}
					},
					async: true
				});	
				
			break;
			
			case "vector":
				var mode= objLayer.get("mode");
				
				// if(mode == "cluster"){
					// selectFeaturesCluster(objLayer, box);
				// }else{
					// selectFeatures(objLayer, box);
				// }		

				selectionFeatures(objLayer, box, mode);
				
				if(_interaction != false){
					ol2d.removeInteraction(_interaction);
					_interaction = false;
				}
				
				
			break;
			
			default:
				if(_interaction != false){
					ol2d.removeInteraction(_interaction);
					_interaction = false;
				}
		}
		
		
				
		
		
	});
	
	
	ol2d.addInteraction(_interaction);
}


function selectionFeatures(objLayer, box, mode ){
	var arrayData = new Array();	
	var uuidObj = objLayer.get("id");
	
	switch(mode){
		case "cluster":
			var features = objLayer.getSource().getSource().getFeatures();
		break;
		
		case "normal":
			var features = objLayer.getSource().getFeatures();
		break;
	}
	
	
	
	var arrayAttribute = new Array();
	
	var ressource = objLayer.get('ressource');
	
	
	
	
	switch (ressource){
		case "requete":
			arrayAttribute = ["id_bdd", "t_stock", "id_stock", "IMO", "NOM", "LON", "LAT", "DATE"];	
		break;
		
		default:
			$.each(features[0].getKeys(), function(j, attribut) {
				if(attribut != "geometry")
					arrayAttribute.push(attribut);
			});
		break;
	}
	
	
		
	
	for(var j=0; j < features.length; j++){
		
		if(ol.extent.containsCoordinate(box, features[j].getGeometry().getCoordinates())){
			var objProperties = new Array();						
			
			for(var k=0; k < arrayAttribute.length; k++){							
				if( typeof features[j].get(arrayAttribute[k]) != 'object'){									
					
					//objProperties.push(features[j].get(arrayAttribute[k]));	
					objProperties[arrayAttribute[k]] = features[j].get(arrayAttribute[k]);					
				}
			}
			objProperties["id"] = uuidObj;
			
			
			arrayData.push(objProperties);
		}
	}
	
	
	
	
	resultatSelection(arrayData, arrayAttribute, objLayer);
}


function selectFeatures(objLayer, box){
	var arrayData = new Array();
				
	var features = objLayer.getSource().getFeatures();
	var arrayAttribute = new Array();
	
	
	
	$.each(features[0].getKeys(), function(j, attribut) {
		if(attribut != "geometry")
			arrayAttribute.push(attribut);
	});
		
	
	for(var j=0; j < features.length; j++){
		if(ol.extent.containsCoordinate(box, features[j].getGeometry().getCoordinates())){
			var objProperties = new Array();						
			
			for(var k=0; k < arrayAttribute.length; k++){							
				if( typeof features[j].get(arrayAttribute[k]) != 'object'){									
					//objProperties.push(features[j].get(arrayAttribute[k]));	
					objProperties[arrayAttribute[k]] = features[j].get(arrayAttribute[k]);
				}
			}
			
			arrayData.push(objProperties);
			
		}
	}
	
	resultatSelection(arrayData, arrayAttribute, objLayer);
}

function resultatSelection(arrayData, arrayAttribute, objLayer){
	
	var ressource = objLayer.get('ressource');
	
	
	//common.js
	var $resultat = $('#layerResultatSelection');
	$resultat.empty();
	
	$("<input>").attr("type", "text")
				.attr("class", "form-control")
				.attr("placeholder", "Search ..")
				.bind("keyup", {id: 'layerResultatSelection'}, filterTable).appendTo($resultat);
				
						
	
	
	
	var attributs = eval(JSON.stringify(arrayAttribute));
	
		
	var $table = $("<table>").attr('id', 'tableResultatSelection')
							 .attr('class', 'table')
							 .attr('cellpadding', '0')
							 .attr('cellspacing', '0')
							 .css('width', '100%')							 
							 .css('border', '0').appendTo($resultat);
							 
							 
	
	switch(ressource){
		case "requete":			
		
			//champs visible dans le tableau
			var listeAttributeView = ["IMO", "NOM", "LON", "LAT", "DATE"];
			
			//Entete
			var $entete = $("<tr>").appendTo($table);
			$.each(listeAttributeView, function(i, attribute){
				$("<th>").append(attribute).appendTo($entete);
			});
			
			//Information
			$.each(arrayData, function(i, ligne){
				var $ligne = $("<tr>").appendTo($table);
				
				$.each(listeAttributeView, function(i, attribute){					
					if(ligne[attribute] != undefined){
						$("<td>").append(ligne[attribute]).appendTo($ligne);
					}
				});	

				
				//liens vers la fiche navire
				$("<td>").append($("<a>").attr("class", "displayFiche"))
										 .bind("click", {information: ligne}, ficheNavire)
										 .appendTo($ligne);
				
			});		
			
			
		break;
		
		default:
			var $entete = $("<tr>").appendTo($table);
			$.each(attributs, function(i, attribut) {	
				$("<th>").append(attribut).appendTo($entete);						
			});
			
			$.each(arrayData, function(i, ligne){
				var $ligne = $("<tr>").appendTo($table);
				$.each(attributs, function(i, attribut) {
					$("<td>").append(ligne[attribut]).appendTo($ligne);
				});
				
				//liens vers le marker sur la map
				$("<td>").append($("<a>").attr("class", "displayFiche"))
										 .bind("click", { LON: ligne["LON"], LAT: ligne["LAT"]}, getPosition)
										 .appendTo($ligne);
				
			});
		
		break;
	}
	
	
	FenetreResultatSelection.open();
	
}





function listeAttribute(sourceWFS){
	var features = sourceWFS.getFeatures();
	var listeAttributs = new Array("LON", "LAT");
	
	//var objDonnees;
	
	if(features.length > 0){
		//Les attributs		
		$.each(features[0].getKeys(), function(i, attribut) {
				//objDonnees = new Object();	
				if(attribut != "geometry" && attribut != "bbox"){
					//objDonnees["sTitle"] = attribut;
					listeAttributs.push(attribut);
				}
									
		});
			
	}
	
	return listeAttributs;
}

function transformWFS2ARRAY(sourceWFS){
	var features = sourceWFS.getFeatures();
	var listeFeatures = new Array();
	
	var listeAttributs;
	
	
	var ligne = new Array();
	var coord;
	
	if(features.length > 0){
		//Les attributs
		listeAttributs = features[0].getKeys();
		
		$.each(features, function(i, feature) {
			ligne = new Array();
			
			coord = feature.getGeometry().getCoordinates();
			
			ligne["LON"] = coord[0];
			ligne["LAT"] = coord[1];
			
			$.each(listeAttributs, function(j, attribut) {
					
					if(attribut != "geometry" && attribut != "bbox")
						ligne[attribut]= feature.get(attribut);					
			});
			
			listeFeatures.push(ligne);
		});
	}
	
	return listeFeatures;	
}

function transformWFS2JSON(sourceWFS){
	var features = sourceWFS.getFeatures();
	var listeFeatures = new Array();
	var listeAttributs;
	
	
	var objDonnees;
	
	if(features.length > 0){
		//Les attributs
		listeAttributs = features[0].getKeys();
		
		$.each(features, function(i, item) {
			objDonnees = new Object();
			$.each(listeAttributs, function(i, attribut) {
					
					if(attribut != "geometry" && attribut != "bbox")
						objDonnees[attribut] = item.get(attribut);					
			});
			
			listeFeatures.push(objDonnees);
		});
	}
	
	return JSON.stringify(listeFeatures);	
	
}


/*
* Creation des etiquettes liés aux Markers
*
*/

function deleteLabel(feature, objLayer){
	var uuid = objLayer.get("id");
	
	var idMarker = feature.get("id_bdd");
	
	var sourceLabel = dictfeatureOverlayLabel[uuid].getSource();
	var featureLine = sourceLabel.getFeatureById("lineLabel-" + uuid + "_" + idMarker);	
	
	var featurePolygon = sourceLabel.getFeatureById("polygonLabel-" + uuid + "_" + idMarker);	
	
	var labelOverlay = ol2d.getOverlayById(uuid + "_" + idMarker);
	ol2d.removeOverlay(labelOverlay);
	
	
	if(featureLine != null){								
		sourceLabel.removeFeature(featureLine);
		sourceLabel.removeFeature(featurePolygon);
	}
	
	
	
}

function createLabel(feature, objLayer){
	
	
	var uuid = objLayer.get("id");
	
	
		
	//Creation de la couche vector pour les lignes entre le label et le marker si elle n'existe pas
	if(!dictfeatureOverlayLabel[uuid]){
		console.log("Creation de la couche vector label");
		
		var featureOverlayLabel = new ol.layer.Vector({
			id: 'label',
			categorie: 'technique',
			isquery: false,			
			source: new ol.source.Vector({
				features: new ol.Collection(),
				useSpatialIndex: false
			}),
			style: styleLabel //style.js
		});	
		
		dictfeatureOverlayLabel[uuid] = featureOverlayLabel;
		ol2d.addLayer(dictfeatureOverlayLabel[uuid]);
		
	}
	
	
	var source = dictfeatureOverlayLabel[uuid].getSource();
	drawLabel(feature, source, uuid);	
}

function drawLabel(feature, source, uuid){
	var lon =  feature.get("LON");
	var lat =   feature.get("LAT");
	
	var NOM =  feature.get("NOM");
	var NATION =  feature.get("NATION");
	var OTAN =  feature.get("TYPEOTAN");
	var DATE =  feature.get("DATE");
	
	var attributs = {
		LON:lon,
		LAT: lat,
		NOM: NOM,
		NATION: NATION,
		OTAN: OTAN,
		DATE: DATE
	};
 
		
	//id unique pour creer le lien entre le Marker et le label
	//id_bbd tetris
	var idMarker = feature.get("id_bdd");
	
	
	var overlay = ol2d.getOverlayById(uuid + "_" + idMarker);
	
	if(!overlay){	
		var labelElement;
		var attributElement;
		
		labelElement = document.createElement('div');
		
		attributElement = document.createAttribute('uuid');
		attributElement.value = uuid;		
		labelElement.setAttributeNode(attributElement);	
		
		attributElement = document.createAttribute('ident');
		attributElement.value = idMarker;		
		labelElement.setAttributeNode(attributElement);		
		
		attributElement = document.createAttribute('lon');
		attributElement.value = lon;		
		labelElement.setAttributeNode(attributElement);
		
		attributElement = document.createAttribute('lat');
		attributElement.value = lat;		
		labelElement.setAttributeNode(attributElement);		
		
		labelElement.className = 'tooltip tooltip-etiquette';
		
		
		var labelOverlay = new ol.Overlay({
							id: uuid + "_" + idMarker,
							element: labelElement,
							offset: [-5, -20],
							positioning: 'center-left'
						});
						
		
		//->Zone qui permet de gerer le deplacement du label
		var formatLabel = "<div style='height: 40px; width:120px; padding:2px; '>";
					// formatLabel += "<table>";
					// formatLabel += 		"<tr>";
					// formatLabel += 			"<td>" + NOM + "</td>";	
					// formatLabel += 			"<td><img height='12px' src='../img/pavillons/" + NATION + ".png'/></td>";	
					// formatLabel += 		"</tr>";
					// formatLabel += 		"<tr>";
					// formatLabel += 			"<td colspan='2'>" + DATE + "</td>";			
					// formatLabel += 		"</tr>";
					// formatLabel += "</table>";
				formatLabel += "</div>";
				
		
			
		labelElement.innerHTML = formatLabel;		
		
		//projection	
		labelOverlay.setPosition(ol.proj.fromLonLat([lon, lat], strProjection));
		
		
		
		var lineFeature = drawLineLabel((uuid + "_" + idMarker), ol.proj.fromLonLat([lon, lat], strProjection), ol.proj.fromLonLat([lon, lat],strProjection));				
		source.addFeature(lineFeature);
		
		
		var polygonFeature = drawPolygonLabel((uuid + "_" + idMarker), ol.proj.fromLonLat([lon, lat], strProjection), attributs);
		source.addFeature(polygonFeature);
		
		
		
		ol2d.addOverlay(labelOverlay);
		
		
	}
	
	//Mise en place des events pour le drag and drop
	moveLabel();
}

//Gestion du niveau de zoom
function checkLevelZoom(evt){
	var newZoomLevel = ol2d.getView().getZoom();
	
	if(newZoomLevel != currentZoomLevel){
		currentZoomLevel = newZoomLevel;
		
		//Redimmensionne les labels suivant le niveau de zoom
		redimLabel();
	}
}


//Redimmensionne l'ensemble des labels suivant le niveau de zoom
function redimLabel(){
	var attributs = {};
	
	//je cherche les labels dans chaque couche technique
	for (var key in dictfeatureOverlayLabel){		
		var source = dictfeatureOverlayLabel[key].getSource();		
		var features = source.getFeatures();
		
		for(var j=0; j < features.length; j++){
			
			if(features[j].getGeometry().getType() == "LineString"){
				var coordinate = features[j].getGeometry().getCoordinates()[1];				
				var idMarker = features[j].getId().replace('lineLabel-', '');
				
				//je supprime le polygon
				
				var featurePolygon = source.getFeatureById("polygonLabel-" + idMarker);		
			
				if(featurePolygon != null){	
					attributs = {};
					
					attributs["LON"] = featurePolygon.get('LON');
					attributs["LAT"] = featurePolygon.get('LAT');
					attributs["NOM"] = featurePolygon.get('NOM');
					attributs["NATION"] = featurePolygon.get('NATION');
					attributs["OTAN"] = featurePolygon.get('OTAN');
					attributs["DATE"] = featurePolygon.get('DATE');
					
					source.removeFeature(featurePolygon);
				}
				
				console.log(attributs);
				
				//je genere le nouveau polygon
				var polygon = drawPolygonLabel(idMarker, coordinate, attributs);				
				source.addFeature(polygon);
			}			
			
		}
		
	}	
}


function drawLineLabel(idMarker, positionDebut, positionFin){
	
	var label = new ol.Feature({			
			geometry: new ol.geom.LineString([positionDebut, positionFin ])
		});
		
		
	label.setId("lineLabel-" + idMarker);
		
	return label;
}

function drawPolygonLabel(idMarker, positionDebut, attributs){
	var LON = parseFloat(positionDebut[0]);
	var LAT = parseFloat(positionDebut[1]);
	
	var levelZoom = ol2d.getView().getZoom();
	
	console.log(levelZoom);
	
	var longueur = sizeLabel[levelZoom][0];
	var largeur = sizeLabel[levelZoom][1];
	
	
	var coordinatePolygone = [
		[LON, LAT],
		[LON + longueur , LAT],
		[LON + longueur, LAT + largeur],
		[LON, LAT + largeur]
	]		
	
			
	var polygon = new ol.Feature({			
			geometry: new ol.geom.Polygon([coordinatePolygone])
		});
		
	polygon.setProperties(attributs);
	polygon.setId("polygonLabel-" + idMarker);	
	
	
		
	return polygon;
}




/*
* Déplacement des etiquettes liés aux Markers
*
*/

function moveLabel(){
	var attributs = {};
	
	var mousedown = function(event) {
		
		
		if(eventDrag == false){
				
			
			console.log("Debut Drag");
			
			eventDrag = true; //parametre.js
					
			
			var uuid = $(this).children().attr("uuid");
			var ident = $(this).children().attr("ident");
			
			var sourceLabel = dictfeatureOverlayLabel[uuid].getSource();
			var featureLine = sourceLabel.getFeatureById("lineLabel-" + uuid + "_" + ident);	
			var featurePolygon = sourceLabel.getFeatureById("polygonLabel-" + uuid + "_" + ident);	
			

			$(this).css({"zIndex":9999});
			
			if(featureLine != null){								
				sourceLabel.removeFeature(featureLine);
			}
			
			if(featurePolygon != null){		
				attributs["LON"] = featurePolygon.get('LON');
				attributs["LAT"] = featurePolygon.get('LAT');
				attributs["NOM"] = featurePolygon.get('NOM');
				attributs["NATION"] = featurePolygon.get('NATION');
				attributs["OTAN"] = featurePolygon.get('OTAN');
				attributs["DATE"] = featurePolygon.get('DATE');
				
				sourceLabel.removeFeature(featurePolygon);
			}
			
			
			centerWidth = parseInt($(this).width()) / 2;
			centerHeight = parseInt($(this).height()) / 2;
			
			
			initEventPosition = [$(this).offset().top, $(this).offset().left];
			
			//Desactive l'event mousedown
			$('.ol-overlay-container').off("mousedown", mousedown);	
			
			//Active l'event mousemouve et mouseup
			$('.ol-overlay-container').on("mousemove", mousemove);
			$('.ol-overlay-container').on("mouseup", mouseup);
		}
	};
	
	var mousemove = function(event){		
		if(eventDrag == true){			
			$(this).offset({top: (event.pageY-centerHeight), left: (event.pageX - centerWidth) });			
		}
	};
	
	var mouseup = function(event){
		if(eventDrag == true){
			console.log("Fin Drag");
			
			
			var x = event.pageX;
			var y = event.pageY;
			
			var uuid = $(this).children().attr("uuid");
			var ident = $(this).children().attr("ident");
			var lon = parseFloat($(this).children().attr("lon"));
			var lat = parseFloat($(this).children().attr("lat"));
			
			var idMarker = uuid + "_" + ident;
					
			var overlay = ol2d.getOverlayById(idMarker); //parametre.js
			var elementOverlay = overlay.getElement();	
			
			var overlayCoordinate = overlay.getPosition();		
			var pixel = ol2d.getPixelFromCoordinate(overlayCoordinate);			
			
			var deltaY =  $(this).offset().top - initEventPosition[0];
			var deltaX =  $(this).offset().left - initEventPosition[1];			
			
			var x = pixel[0] + deltaX;
			var y = pixel[1] + deltaY;	
			
						
			var coordinate = ol2d.getCoordinateFromPixel([x, y]); //parametre.js							
			overlay.setPosition(coordinate);
			
			
			//la ligne entre le mobile et l'etiquette
			var linelFeature = drawLineLabel(idMarker, ol.proj.fromLonLat([lon, lat], strProjection), coordinate);	


			//Etiquette				
			var polygonFeature = drawPolygonLabel(idMarker, coordinate, attributs);		
			
			
			var sourceLabel = dictfeatureOverlayLabel[uuid].getSource();
			
			sourceLabel.addFeature(linelFeature);			
			sourceLabel.addFeature(polygonFeature);
								
		
			$('.ol-overlay-container').off("mousemove", mousemove);
			$('.ol-overlay-container').off("mouseup", mouseup);
			
			$('.ol-overlay-container').on("mousedown", mousedown);
			
			
			$(this).css({"zIndex":1});
			eventDrag = false;
		}
	};
	
	
	$('.ol-overlay-container').on("mousedown", mousedown);
}





