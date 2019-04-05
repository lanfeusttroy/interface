/*
* Ajoute un nouvel onglet pour afficher les informations
*
*/

function addTab(idContainer, title, idMarker = undefined, layerParent = undefined, lon = undefined, lat = undefined){
	var uuid = guid();
	var $objTab;
	var $objContent;
	
	var $navTab = $('#' + idContainer +' ul.nav-tabs:eq(0)');	
	var $tabContent = $('#' + idContainer + ' div.tab-content:eq(0)');
	
	if($('#' + idContainer +' ul.nav-tabs:eq(0) li').length == 0){
		
		var $onglet = $("<a>").attr("href", "#" + uuid)
													.attr("idtab", uuid)
													.attr("idmarker", idMarker)
													.attr("layerparent", layerParent)
													.attr("lon", lon)
													.attr("lat", lat)
													.attr("role", "tab")
													.attr("data-toggle", "tab")
													.text(title)
													.append(																					
														$("<span>").attr("class", "ti-close")
																   .css("margin-left", "5px")
																   .css("cursor", "pointer")
																   .bind('click', {idContainer: idContainer}, eventRemoveTab)
																																				
													);
		
		$("<li>").attr("class", "active").append($onglet).appendTo($navTab);
										
								
		$("<div>").attr("id", uuid)
				  .attr("class", "tab-pane active")
				  .attr("role", "tabpanel")
				  .css("padding", "5px").appendTo($tabContent);
				 
		
	
		
	}else{
		
		
		$navTab.find('li').removeClass('active');
		
		
		$tabContent.find('div.tab-pane').each(function(i){
			
			if($(this).parent().parent().attr("id") == "dialogueInformation"){
				$(this).removeClass('active');
			}
		});
		
		var $onglet = $("<a>").attr("href", "#" + uuid)
													.attr("idtab", uuid)
													.attr("idmarker", idMarker)
													.attr("layerparent", layerParent)
													.attr("lon", lon)
													.attr("lat", lat)
													.attr("role", "tab")
													.attr("data-toggle", "tab")
													.text(title)
													.append(																					
														$("<span>").attr("class", "ti-close")
																   .css("margin-left", "5px")
																   .css("cursor", "pointer")
																   .bind('click', {idContainer: idContainer}, eventRemoveTab)
																																				
													);
		
		$("<li>").attr("class", "active").append($onglet).appendTo($navTab);
										
										
		$("<div>").attr("id", uuid)
				  .attr("class", "tab-pane active")
				  .attr("role", "tabpanel")
				  .css("padding", "5px").appendTo($tabContent);
		
		
	}
	
	//$('#' + idContainer + ' a[href="#' + uuid + '"]').tab('show');	
	//$('#' + idContainer + ' a[idtab="' + uuid + '"] .ti-close').bind('click', { idContainer: idContainer }, eventRemoveTab);
	
	$onglet.on('show.bs.tab', function(e){
		if($(e.target).attr("lon") != undefined && $(e.target).attr("lat") != undefined){
			var lon = parseFloat($(e.target).attr("lon"));
			var lat = parseFloat($(e.target).attr("lat"));
			
			//->je position un marqueur sur la map
			var marker = new ol.Feature({
							geometry: new ol.geom.Point([lon, lat])
						});
						
			selectMarker(marker) //->outilsCartographique.js
			ol2d.getView().setZoom(6);
			
			
			ol2d.getView().setCenter([lon, lat]);
		}
	});
	
		
	return uuid;
}




/*
*	Action lors de la fermeture d'un onglet
*/
function eventRemoveTab(evt){
	evt.stopPropagation();
	
	var idContainer = evt.data.idContainer;
	
	
	
	var uuidObj = $(this).parent().attr('layerparent');
	var idMarker = $(this).parent().attr('idmarker');
	
		
	var idTab = $(this).parent().attr('idtab');
	
	
	$(this).parent().parent().remove();
	$('#' + idTab).remove();
	
	//supprime la trajectoire eventuelle lié à l'onglet
	if(uuidObj != "undefined"){
		
		
		//Cas d'une trajectoire
		if(dictfeatureVectorTrajectoire[uuidObj] != undefined){	
			
			console.log("event remove tab");
			
			var objLayer = dictfeatureVectorTrajectoire[uuidObj][idMarker];
			var featureTechniqueTrajectoireSource = objLayer.getSource();
			
			
			var features = featureTechniqueTrajectoireSource.getFeatures();
			featureTechniqueTrajectoireSource.clear();
			
			
			
			ol2d.removeLayer(objLayer);
			
			
			delete dictfeatureVectorTrajectoire[uuidObj][idMarker];		
			
			console.log("remove trajectoire");
			
				
		}
		
		
	}
	
	//Je purge ma couche technique - featureTechniqueTrajectoireSelect
	if(featureTechniqueTrajectoireSelect != undefined){	
		//var features = featureTechniqueTrajectoireSource.getFeatures();
		featureTechniqueTrajectoireSelect.getSource().clear();
	}
	
	//Je purge ma couche technique - featureTechniqueForme	
	if(featureTechniqueForme != undefined){
		var featureTechniqueFormeSource = featureTechniqueForme.getSource();
		featureTechniqueFormeSource.clear();
	}
	
	
	if($('#' + idContainer +' .nav-tabs:eq(0) li').length > 0){
		$('#' + idContainer +' a:first').tab('show');
	}
	
	//supprime l'evenement qui me permet de recuperer les coordonnees sur la map
	if(coordinate =! undefined)
		ol2d.un('click', coordinate);

	
	return false;
	
}


/*
* Fenetre lors de la creation d'une forme 
* layers "zoneLibre"
*/

function addFormZoneLibre(feature, objLayer){
	var uuidObj = objLayer.get("id");	
	var calqueID = dictRessources[uuidObj];
	
	var wkt = new ol.format.WKT();
	
	
	var strWkt = (wkt.writeFeature(feature,  {
											  dataProjection: strProjectionData,
											  featureProjection: strProjection
											}));
											
	//Creation de mon onglet
	var uuidOnglet = addTab('dialogueInformation', 'Forme', '', uuidObj);
	
	
	//->Formulaire d'information
	var url = urlApplication + "categories/ajaxaddforme";
	$.ajax({
		type: "POST",
		url: url ,	
		data: {id_bdd:calqueID.map.idressource, strWkt:strWkt, uuid:uuidOnglet, uuidObj:uuidObj},
		success: function(data){			
			$('#'+ uuidOnglet).append(data);			
		}
	});	
	
}

/*
* Fenetre lors de l'edition d'une forme 
* layers "zoneLibre"
*/

function editFormZoneLibre(feature, objLayer){
	var uuidObj = objLayer.get("id");	
	var calqueID = dictRessources[uuidObj];
	var formeID = feature.get('idmarker');
	
	var wkt = new ol.format.WKT();
	
	
	var strWkt = (wkt.writeFeature(feature,  {
											  dataProjection: strProjectionData,
											  featureProjection: strProjection
											}));
											
	
	//Creation de mon onglet
	var uuidOnglet = addTab('dialogueInformation', 'Forme');
	
	
	//->Formulaire d'information
	var url = urlApplication + "categories/ajaxeditforme";
	$.ajax({
		type: "POST",
		url: url ,	
		data: {id_bdd:calqueID.map.idressource, id_forme:formeID, strWkt:strWkt, uuid:uuidOnglet, uuidObj:uuidObj},
		success: function(data){
			
			$('#'+ uuidOnglet).append(data);			
		}
	});	
	
	
	
	
}





/*
* Recherche les informations disponibles sur une requete
*
*/
function searchInformationRequete(uuid, val){
	//recherche des informations sur la requete
	var url = "/" + nomDomaine + "/" + "requeteurs/ajaxinformationrequete";
	var idrequete = val.map.idressource;
	
			
	$.ajax({
		type : 'POST',
		url : url,
		data: "idrequete=" + idrequete,
		success : function(data) {	
			
			
			var uuidTab = addTab('dialogueInformation', val.libelle, '', '');
			
			
			$('#'+ uuidTab).append(data);
			
			
			
			//Gestion des events			
			$('#'+ uuidTab + ' .cluster').click(function(){
				
				//Chargement en cours
				$('#'+ uuidTab).prepend('<div id="chargement_' + uuidTab + '"><i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la requête</div>');
				
				//val.ID = uuidObj;	
				val.ID = idrequete + "_cluster";
				val.map.mode = "cluster";
								
				//ajout dans le dictionnaire des ressources disponibles
				//->common.js
				addRessourceDisponible(val.ID, val);
				
				//creation de la ressource
				createlayer(val.ID, uuidTab);	//common.js		
				
			});
			
			$('#'+ uuidTab + ' .normal').click(function(){
				//Chargement en cours
				$('#'+ uuidTab).prepend('<div id="chargement_' + uuidTab + '"><i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la requête</div>');
	
				
				
				val.map.mode = "normal";
				val.ID = idrequete + "_normal";
				
				
								
				//ajout dans le dictionnaire des ressources disponibles
				//->common.js
				addRessourceDisponible(val.ID, val);
				
				//creation de la ressource
				createlayer(val.ID, uuidTab);	//common.js	
				
			});
			
			
						
			$('#'+ uuidTab + ' .heatmap').click(function(){
				//var uuidObj = guid();
				
				//Chargement en cours
				$('#'+ uuidTab).prepend('<div id="chargement_' + uuidTab + '"><i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la requête</div>');
				
				//val.ID = uuidObj;	
				val.map.mode = "heatmap";
				val.ID = idrequete + "_heatmap";
								
				//ajout dans le dictionnaire des ressources disponibles
				//->common.js
				addRessourceDisponible(val.ID, val);
				
				//creation de la ressource
				createlayer(val.ID, uuidTab);	//common.js	
				
			});
		}
	});
	
	
}


/*
* Permet de recharger une couche de travail
*
*/
function resfreshLayerTravail(uuidObj){
	var listeLayers = ol2d.getLayers();
	var objLayer = getLayer(listeLayers, uuidObj);
	
	var source =  objLayer.getSource();
	var features = source.getFeatures();
	
	for(var j=0; j < features.length; j++){							
		source.removeFeature(features[j]);
	}
	
	var item = dictRessources[uuidObj];
	var url = urlApplication + "categories/resultatgeojson/" + item.map.idressource;
	
		
	$.ajax({
		type : 'POST',
		url : url,			
		success : function(data) {
			var format = new ol.format.GeoJSON({
				defaultDataProjection: strProjectionData				
			});
			source.addFeatures(format.readFeatures(data,  {dataProjection: strProjectionData, featureProjection: strProjection}));
		}
	});
	
}


/*
* Gére l'affichage de la trajectoire sur la cartographie
* ainsi que le détail dans un onglet
*/

function gestionTrajectoire(feature, objLayer){
	var nom = feature.get('NOM');
	var imo = feature.get('IMO');
	var id_bdd = feature.get('id_bdd');
	
	var uuidObj = objLayer.get("id");
	
	
	var createTab = false;
	
	//Creation de l'onglet
	if(!dictfeatureVectorTrajectoire[uuidObj]){
		createTab = true;		
	}else{
		if(!dictfeatureVectorTrajectoire[uuidObj][id_bdd]){
			createTab = true;
		}
	}
	
	if(createTab == true){
		console.log("creation onglet");
		var uuid = addTab('dialogueInformation', nom, id_bdd, uuidObj);
		
		//ajout du container trajectoire
		$('#' + uuid).append("<div id='" + uuid + "_Historiques'></div>");
				
		
		createTrajectoire(imo, uuidObj, id_bdd, uuid);
		
	}
	
	
}

/*
* Crée un outil pour les conversions suivant les projections
*
*/

function convertisseur(){
	var uuid = addTab('dialogueInformation', 'Convertisseur');
	var $uuid = $('#' + uuid);
	
	$.ajax({
		type: "POST",
		url: urlApplication + "cartographieoutils/ajaxconversion" ,	
		success: function(data){
			$uuid.append(data);
		}
	});	
	
}

function conversionCoordonnees(lon, lat , projectionSource, projectionDestination){
	return ol.proj.transform([lon, lat], projectionSource, projectionDestination);
	
}





/*
* Crée un outil pour sélectionner les makers dans une zone
*
*/

function outilSelection(){
	if(featureTechniqueForme == undefined){
		featureTechniqueForme = new ol.layer.Vector({
				id: 'forme',
				categorie: 'technique',
				isquery: false,	
				map:ol2d,
				source: new ol.source.Vector({
					features: new ol.Collection(),
					useSpatialIndex: false
				}),
				style: styleLabel //style.js
			});		
		
	}
	
		
	
	var uuid = addTab('dialogueInformation', 'Sélection');	
	createOutilSelection(uuid);
}

/*
* Permet de selection les élements d'une zone
* à partir d'une forme au format wkt
*/
function createOutilSelection(idContainer){
	
	
	// var ligne = 
				// '<a href="javascript:void(0)" class="btn btn-defaut"><span class="ti-marker-alt"></span></a>' + 
				// '<label>' +
					// 'Zone WKT(' + strProjectionData +  ')'+
				// '</label>' +
				// '<textarea class="form-control"></textarea>' +
				// '<a style="margin-top:10px" href="javascript:void(0)" class="pull-right btn btn-default">Filtre</a>' +
				// '<a style="margin-top:10px; margin-right:10px;" href="javascript:void(0)" class="pull-right btn btn-default">Afficher</a>' +				
				// '<div style="clear:both"></div>';
				
	var $container = $('#' + idContainer);
	
	$("<a>").attr("href", "javascript:void(0)")
			.attr("class","btn btn-defaut")
			.append(
				$("<span>").attr("class","ti-marker-alt")
			)
			.click(function(ev){				
				createForme2WKT($container.find('textarea').eq(0));
			})
			.appendTo($container);
			
	
	$("<label>").text('Zone WKT(' + strProjectionData +  ')').appendTo($container);
	$("<textarea>").attr("class", "form-control").appendTo($container);
	
	$("<a>").attr("href", "javascript:void(0)")
			.attr("class", "pull-right btn btn-default")
			.css("margin-top", "10px")
			.css("margin-right", "10px").text("Filtre")
			.click(function(ev){
				var wkt = $container.find('textarea').eq(0).val();
				if(wkt != "")
					filtreElementsBox(idContainer, wkt);
			})
			.appendTo($container);
			
			
	$("<a>").attr("href", "javascript:void(0)")
			.attr("class", "pull-right btn btn-default")
			.css("margin-top", "10px")
			.css("margin-right", "10px").text("Afficher")
			.click(function(ev){
				var wkt = $container.find('textarea').eq(0).val();
				if(wkt != "")
					visualiserWKT(wkt); //->OutilsCartographique.js
			})
			.appendTo($container);
	
	$("<div>").css("clear", "both").appendTo($container);
	
				
		
}

/*
* Recherche multi-calques des elements appartenant à une zone
* 
*/
function filtreElementsBox(idContainer, wkt){
	visualiserWKT(wkt);
	
	if($('#' + idContainer + ' .resultatFiltre').length == 0){
		$('#' + idContainer).append('<div class="resultatFiltre"></div>');
	}else{
		$('#' + idContainer + ' .resultatFiltre').empty();
	}
	
		
	
	var layers = ol2d.getLayers();
	var nbrLayers = layers.getLength();
	var objLayer;
	
	var arrayData = [];
	var arrayAttribute = ["IMO", "NOM", "NATION", "TYPEOTAN", "LON", "LAT"];
	
	for(var i=1; i <= nbrLayers; i++){
		objLayer = layers.item(nbrLayers - i);	
		if(objLayer.get('ressource') == 'requete'){
			console.log(objLayer);
			
			var mode= objLayer.get("mode");
			
			var format = new ol.format.WKT();		
			var feature = format.readFeature(wkt,{dataProjection: strProjectionData, featureProjection: strProjection});
			
			
			var box = feature.getGeometry().getExtent();
			
			//filtre
			var features = [];
			switch(mode){
				case "normal":
					features = objLayer.getSource().getFeatures();
				break;
				
				case "cluster":
					features = objLayer.getSource().getSource().getFeatures();
				break;
			}
			
			
			for(var j=0; j < features.length; j++){
			
				if(ol.extent.containsCoordinate(box, features[j].getGeometry().getCoordinates())){
					var objProperties = [];						
					
					for(var k=0; k < arrayAttribute.length; k++){							
						
						
						if( typeof features[j].get(arrayAttribute[k]) != 'object'){									
							
							//objProperties.push(features[j].get(arrayAttribute[k]));	
							objProperties[arrayAttribute[k]] = features[j].get(arrayAttribute[k]);							
						}
					}
									
					arrayData.push(objProperties);
				}
			}
			
		}
	}
	
	if(arrayData.length > 0)
		resultatFiltre($('#' + idContainer + ' .resultatFiltre'), arrayData, arrayAttribute);
	
	
	
	/*
	if(layers.getLength() > 0){
	
		var objLayer = getLayerCourant(layers); //common.js
		var mode= objLayer.get("mode");
		
		
		
		
		//Liste des layers 
		
		
				
		var format = new ol.format.WKT();		
		var feature = format.readFeature(wkt,{dataProjection: strProjectionData, featureProjection: strProjection});
		
		
		var box = feature.getGeometry().getExtent();
		
		//filtre
		var features = [];
		switch(mode){
			case "normal":
				features = objLayer.getSource().getFeatures();
			break;
			
			case "cluster":
				features = objLayer.getSource().getSource().getFeatures();
			break;
		}
		
		
		
		var arrayData = [];
		var arrayAttribute = ["IMO", "NOM", "NATION", "TYPEOTAN", "LON", "LAT"];
		
					
		
		for(var j=0; j < features.length; j++){
			
			if(ol.extent.containsCoordinate(box, features[j].getGeometry().getCoordinates())){
				var objProperties = [];						
				
				for(var k=0; k < arrayAttribute.length; k++){							
					
					
					if( typeof features[j].get(arrayAttribute[k]) != 'object'){									
						
						//objProperties.push(features[j].get(arrayAttribute[k]));	
						objProperties[arrayAttribute[k]] = features[j].get(arrayAttribute[k]);
						
						
					}
				}
								
				arrayData.push(objProperties);
			}
		}
		
		if(features.length > 0)
			resultatFiltre($('#' + idContainer + ' .resultatFiltre'), arrayData, arrayAttribute);
	}
	*/	
}

/*
* Affiche le résultat d'une recherche dans une zone dans un tableau
* 
*/
function resultatFiltre($container, arrayData, arrayAttribute){
	
		
	//var data = eval(JSON.stringify(arrayData));
	//var attributs = eval(JSON.stringify(arrayAttribute));
	
	
	var $resultatFiltre = $("<table>").attr("class","table")
									  .attr("cellpadding","0")
									  .attr("cellspacing","0")
									  .css("width","100%")
									  .css("font-size","10px").appendTo($container);
									  
	//Entete
	var $entete = $("<tr>").appendTo($resultatFiltre);
	$.each(arrayAttribute, function(i, attribut) {			
		$("<th>").text(attribut).appendTo($entete);			
	});
	$("<th>").text("").appendTo($entete);	
	
	var nbrLigne = 1;
	
	console.log(arrayData);
	
	$.each(arrayData, function(i, ligne) {
		var $ligne = $("<tr>").appendTo($resultatFiltre);
		
		$.each(arrayAttribute, function(i, attribut) {			
			$("<th>").text(ligne[attribut]).appendTo($ligne);					
		});
				
	
		
		$("<td>").append(
					$("<a>").attr("rel", nbrLigne)
					.append("<span>").attr("class", "ti-search")
									 .css("class", "ti-search")
									 .css("cursor", "pointer")
									 .bind("click", { LON: ligne["LON"], LAT: ligne["LAT"]}, getPosition)
				).appendTo($ligne);
		
		nbrLigne++;	
	});
	
	$container.prepend('Nombre d\'enregistrement : ' + (nbrLigne - 1) );								  
	
		
}



/*
* Creation d'une forme à partir des coordonnées DMS
*
*/

function dialoguePositionDMS(){
	//visualiser la forme sur la carto
	//couche technique
	// if(featureTechniqueForme == undefined){
		// featureTechniqueForme = new ol.layer.Vector({
				// id: 'forme',
				// categorie: 'technique',
				// isquery: false,	
				// map:ol2d,
				// source: new ol.source.Vector({
					// features: new ol.Collection(),
					// useSpatialIndex: false
				// }),
				// style: styleEdition //style.js
			// });		
		
	// }
	
	// var featureTechniqueFormeSource = featureTechniqueForme.getSource();
	// featureTechniqueFormeSource.clear();
	
		
	var uuid = addTab('dialogueInformation', 'DMS');	
	var $uuid = $('#' + uuid);
	
	// $("<div>").attr("class", "addPoint")
			  // .css("margin-top","10px").appendTo($uuid);
			  
	// $("<div>").attr("class", "bilanPoint")
			  // .css("height","140px")
			  // .css("overflow-x","auto")
			  // .css("margin-top","10px").appendTo($uuid);
			  
	
	// $("<div>").attr("class", "bilanForme")
			  // .css("margin-top","10px").appendTo($uuid);
			  
			  
	// addPositionDMS(uuid);
	
	
	
	$.ajax({
		type: "POST",
		url: urlApplication + "cartographieoutils/ajaxaddpoint" ,	
		success: function(data){
			$uuid.append(data);
		}
	});	
	
}

function addPositionDMS(idContainer){
	
	
	//->formulaire addPoint
	// $.ajax({
		// type: "POST",
		// url: urlApplication + "cartographieoutils/ajaxaddpoint" ,	
		// success: function(data){
			// $container.append(data);
		// }
	// });	
	
				
	
		
	// var point = '<form id="formAddDMS">' +
					// '<div class="message_error alert alert-warning"></div>' +
					// '<table class="table">' +						
						// '<tr>' +
							// '<th></th>' +
							// '<th>Deg</th>' +
							// '<th>Min</th>' +
							// '<th>Sec</th>' +
							// '<th></th>' +
						// '</tr>' +
						// '<tr>' +
							// '<td>Lattitude</td>' +							
							// '<td>' +
								// '<input id="degres" name="degres" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<input id="minutes" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<input id="secondes" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<select id="angle" class="form-control" style="width:70px">' +
									// '<option value="N">N</option>' +
									// '<option value="S">S</option>' +
								// '</select>' +
							// '</td>' +
						// '</tr>' +
						// '<tr>' +
							// '<td>Longitude</td>' +							
							// '<td>' +
								// '<input id="degres" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<input id="minutes" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<input id="secondes" type="text" class="form-control" style="width:50px" value="">' +
							// '</td>' +
							// '<td>' +
								// '<select id="angle" class="form-control" style="width:70px">' +
									// '<option value="E">E</option>' +
									// '<option value="W">O</option>' +
								// '</select>' +
							// '</td>' +
						// '</tr>' +
						// '<tr>' +
							// '<td colspan="5">' +
								// '<input type="submit" class="pull-right btn btn-default" value="Valider">' + 
								
							// '</td>' +
						// '</tr>' +
					// '</table>' +
				// '</form>';
					
	
	// $('#' + idContainer + ' .addPoint').empty();
	// $('#' + idContainer + ' .addPoint').append(point);
	
	
	/*
	var test = $("#formAddDMS").validate({
		errorPlacement: function(error, element) {
			console.log("error");
			$(".message_error").empty();	
			$(".message_error").append(error);
			$(".message_error").css({"display":"block"});
		},
		submitHandler: function(form) {
			console.log("valide");
			validateDMS(idContainer);
			//$(".message_error").css({"display":"none"});
		},
		rules: {
			degres: {
				required: true				
			}
		}
	});
	*/
	

}


/*
function validateDMS(idContainer){		
	//lattitude
	var degresLat = parseInt($('#' + idContainer + ' .addPoint tr:eq(1) input:eq(0)').val());
	var minutesLat = parseInt($('#' + idContainer + ' .addPoint tr:eq(1) input:eq(1)').val());
	var secondesLat = parseInt($('#' + idContainer + ' .addPoint tr:eq(1) input:eq(2)').val());
	var angleLat = $('#' + idContainer + ' .addPoint tr:eq(1) select:eq(0)').val();
	
	var lattitudeDecimal = DMS2Decimal(degresLat, minutesLat, secondesLat, angleLat);
	
	
	//Longitude
	var degresLon = parseInt($('#' + idContainer + ' .addPoint tr:eq(2) input:eq(0)').val());
	var minutesLon = parseInt($('#' + idContainer + ' .addPoint tr:eq(2) input:eq(1)').val());
	var secondesLon = parseInt($('#' + idContainer + ' .addPoint tr:eq(2) input:eq(2)').val());
	var angleLon = $('#' + idContainer + ' .addPoint tr:eq(2) select:eq(0)').val();
	
	var longitudeDecimal = DMS2Decimal(degresLon, minutesLon, secondesLon, angleLon);
	
	var ligne = '<table class="table">' +
					'<tr>' +
						'<th>' +
							'<a style="margin-right:5px;" class="searchPoint" href="javascript:void(0)"><span class="ti-search"></span></a>' + 
							'<a class="removePoint" href="javascript:void(0)"><span class="ti-trash"></span></a>' + 							
						'</th>' +
						'<th>Type</th>' +
						'<th>Lattitude / Y</th>' +
						'<th>Longitude / X</th>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' + 
						'<td>Degrees Minutes Seconds (DMS)</td>' + 
						'<td>' + degresLat + '° ' + minutesLat + '\' ' + secondesLat + '" ' + angleLat + '</td>' +
						'<td>' + degresLon + '° ' + minutesLon + '\' ' + secondesLon + '" ' + angleLon + '</td>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' + 
						'<td>Decimal Degrees (DD)</td>' + 
						'<td>' + lattitudeDecimal + '</td>' +
						'<td>' + longitudeDecimal  + '</td>' +
					'</tr>' +
				'</table>';
	
	
	$('#' + idContainer + ' .bilanPoint').append(ligne);
	
		
	
	$('#' + idContainer + ' .removePoint').bind('click', { idContainer: idContainer }, removePoint);
	$('#' + idContainer + ' .searchPoint').on("click",searchPoint);
	
	createFormeWKT(idContainer);
	
}
*/

// function removePoint(evt){	
	// var idContainer = evt.data.idContainer;
	
	// $(this).parent().parent().parent().parent().remove();		
	// createFormeWKT(idContainer);
// }

// function searchPoint(){
	// var $table = $(this).parent().parent().parent().parent();	
	
	// var lat = parseFloat($table.find('tr:eq(2) td:eq(2)').text());
	// var lon = parseFloat($table.find('tr:eq(2) td:eq(3)').text());
	// console.log(lon + " " + lat);
	
	
	// ol2d.getView().setCenter(ol.proj.transform([lon, lat], strProjectionData,strProjection));
// }

// function createFormeWKT(idContainer){
	// var pointArray = new Array();
	// var point;
	// var formeWKTArray = new Array();
	
	// $('#' + idContainer + ' .bilanPoint table').each(function(){
			// point = new Object();
			// point.lat = parseFloat($(this).find('tr:eq(2) td:eq(2)').text());
			// point.lon = parseFloat($(this).find('tr:eq(2) td:eq(3)').text());
			
			
			// point.lon  =  ol.proj.transform([point.lon, point.lat], strProjectionData,strProjection)[0];
			// point.lat  =  ol.proj.transform([point.lon, point.lat], strProjectionData,strProjection)[1];
			
			// pointArray.push(point);
	// });
	
		
	// for(var i=0; i < pointArray.length; i++){
		// formeWKTArray.push(pointArray[i]["lon"] + ' ' + pointArray[i]["lat"]);		
	// }
	
	// var ligne = '<table class="table">' +
					// '<tr>' +
						// '<th>Forme</th>' +
						// '<th>WKT</th>' +
					// '</tr>';
	
	// if(formeWKTArray.length == 1){
		// ligne += '<tr>' +
					// '<td>' +
						// 'POINT' +
						// '<a style="margin-top:5px; margin-left:10px;" href="javascript:visualiserWKT(\'POINT(' + formeWKTArray.join() + ')\')"><span class="ti-eye"></span></a>' + 
					// '</td>' + 
					// '<td><textarea class="form-control">POINT(' + formeWKTArray.join() + ')</textarea></td>' +						
				// '</tr>';
	// }
	
	
	// if(formeWKTArray.length >= 2){
		// ligne += '<tr>' +
					// '<td>' +
						// 'MULTIPOINT' +
						// '<a style="margin-top:5px; margin-left:10px;" href="javascript:visualiserWKT(\'MULTIPOINT(' + formeWKTArray.join(", ") + ')\')"><span class="ti-eye"></span></a>' + 
					// '</td>' + 
					// '<td><textarea class="form-control">MULTIPOINT(' + formeWKTArray.join(", ") + ')</textarea></td>' +						
				// '</tr>';
				
		// ligne += '<tr>' +
					// '<td>' +
						// 'LINESTRING' +
						// '<a style="margin-top:5px; margin-left:10px;" href="javascript:visualiserWKT(\'LINESTRING(' + formeWKTArray.join(", ") + ')\')"><span class="ti-eye"></span></a>' + 
					// '</td>' + 
					
					// '<td><textarea class="form-control">LINESTRING(' + formeWKTArray.join(", ") + ')</textarea></td>' +						
				// '</tr>';
	// }
	
	// if(formeWKTArray.length >= 3){
		// ligne += '<tr>' +
					// '<td>' +
						// 'POLYGON' +
						// '<a style="margin-top:5px; margin-left:10px;" href="javascript:visualiserWKT(\'POLYGON((' + formeWKTArray.join(", ") + '))\')"><span class="ti-eye"></span></a>' + 
						
					// '</td>' + 				
					// '<td><textarea class="form-control">POLYGON((' + formeWKTArray.join(", ") + '))</textarea></td>' +						
				// '</tr>';
	// }
	
	// ligne += '</table>';
	
				
	// $('#' + idContainer + ' .bilanForme').empty();
	// $('#' + idContainer + ' .bilanForme').append(ligne);
		
// }





function DMS2Decimal(deg, min, sec, angle){
	decimal = deg + (min / 60) + (sec /3600);
		
	if(angle == "S" || angle == "W")
		decimal = - decimal;
		
	return decimal.toFixed(4);
}

/*
* Affiche la fiche navire
*/

function ficheElement(feature, objLayer){
	var id_bdd = feature.get("id_bdd");
	var nom  = feature.get("NOM");
	var imo = feature.get('IMO');
	
	var uuidObj = objLayer.get("id");
	var coord = feature.getGeometry().getCoordinates();
	
		
	var uuid = addTab('dialogueInformation', nom, id_bdd, uuidObj, coord[0], coord[1]);	
	
	
	
	
	var id_stock = feature.get("id_stock");
	var t_stock = feature.get("t_stock");
	
	//Chargement en cours
	$('#'+ uuid).append('<div id="chargement_' + uuid + '"><i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la fiche navire</div>');
	
	
	//Creation de la fiche
	$.ajax({
		type: "POST",
		url: urlApplication + "navirecivils/details" ,	
		data: {id_bdd:id_bdd, uuid:uuid, id_stock:id_stock, t_stock:t_stock},
		success: function(data){
			$('#'+ uuid).append(data);
			
			$('#chargement_'+ uuid).empty();
			$('#chargement_'+ uuid).append('<i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la trajectoire');
			
			//Creation de la trajectoire ->OutilsCartographique
			createTrajectoire(imo, uuidObj, id_bdd, uuid);
			
			//->je position un marqueur sur la map
			var marker = new ol.Feature({
							geometry: new ol.geom.Point(coord)
						});
						
			selectMarker(marker) //->outilsCartographique.js
			ol2d.getView().setZoom(9);
			
			
			ol2d.getView().setCenter(coord);
			
			
		}
	});	
	
}



//Lie au tableau lors d'une selection multiple
function ficheNavire(ev){
	
	var lon = parseFloat(ev.data.information["LON"]);
	var lat = parseFloat(ev.data.information["LAT"]);
	
	var id_bdd = ev.data.information["id_bdd"];
	var id_stock = ev.data.information["id_stock"];
	var t_stock = ev.data.information["t_stock"];
	
	var imo = ev.data.information["IMO"];
	var uuidObj = ev.data.information["id"];
	
	var coord = ol.proj.transform([lon, lat], strProjectionData, strProjection);
	
	var uuid = addTab('dialogueInformation', ev.data.information["NOM"], id_bdd, uuidObj, coord[0], coord[1]);	
	
	
	
	//Chargement en cours
	$('#'+ uuid).append('<div id="chargement_' + uuid + '"><i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la fiche navire</div>');
	
	
	$.ajax({
		type: "POST",
		url: urlApplication + "navirecivils/details" ,	
		data: {id_bdd:id_bdd, uuid:uuid, id_stock:id_stock, t_stock:t_stock},
		success: function(data){
			$('#'+ uuid).append(data);			
			$('#chargement_'+ uuid).empty();
			
			$('#chargement_'+ uuid).append('<i style="margin:5px" class="fa fa-spinner fa-spin"></i>Chargement de la trajectoire');
			createTrajectoire(imo, uuidObj, id_bdd, uuid);
			
			
			
			//->je position un marqueur sur la map
			var marker = new ol.Feature({
							geometry: new ol.geom.Point(coord)
						});
						
			selectMarker(marker) //->outilsCartographique.js
			ol2d.getView().setZoom(6);
			
			
			ol2d.getView().setCenter(coord);
				
					
		}
	});	
}






/*
* Supprime une ressource du dictionnaire de ressources
*/

function deleteRessourceDisponible(uuid){	
	delete dictRessources[uuid];
}

/*
* Ajoute une ressource au dictionnaire de ressources
*/
function addRessourceDisponible(uuid, item){	
	dictRessources[uuid] = item;	
}





function removeLayer(uuid){
	var undefined;
	var layers = ol2d.getLayers();	
	var objLayer = getLayer(layersRessource,  uuid);
	
	var item = dictRessources[uuid];
	
	
	//->Suppression dans l'interface de gestion
	$('#ressource_' + uuid).parent().remove();
	
	
		
	//->Suppression des Markers masqués
	delete dictLayersMarkers[uuid];
	
	//->Suppression des overlay	
	//->Suppression de la couche technique pour les lignes entre le marker et le label		
	if(dictfeatureOverlayLabel[uuid]){
		var sourceLineLabel = dictfeatureOverlayLabel[uuid].getSource();
	
		var idMarker;
		var overlayElement;
		var featureLine;
		
		var featuresLabel = sourceLineLabel.getFeatures();
		for(var i=0; i < featuresLabel.length; i++){
			
			//idMarker = features[i].get('id_bdd');
			idMarker = (featuresLabel[i].getId()).replace("lineLabel-","");			
			var overlay = ol2d.getOverlayById(idMarker);
			ol2d.removeOverlay(overlay);
			
		}
		
				
		ol2d.removeLayer(dictfeatureOverlayLabel[uuid]);
		delete dictfeatureOverlayLabel[uuid];		
		
	}	
	
	//->Suppression de la couche technique pour les trajectoires et des onglets
	if(dictfeatureVectorTrajectoire[uuid]){		
		
		for(imo in dictfeatureVectorTrajectoire[uuid]){
			var featuresTrajectoireSource = dictfeatureVectorTrajectoire[uuid][imo].getSource();
			featuresTrajectoireSource.clear();
			
			ol2d.removeLayer(dictfeatureVectorTrajectoire[uuid][imo]);			
			delete dictfeatureVectorTrajectoire[uuid][imo];
			
			removeTab2Marker(imo);
		}
		
		delete dictfeatureVectorTrajectoire[uuid];
	
				
	}
	
		
	
	layersRessource.remove(objLayer);
	layers.remove(objLayer);
	
	//Suivant la position du calque je supprime les outils de forme
	console.log(objLayer.get('id'));
	
	//Controle le type de calque en haut de la pile
	var uuidRessource =$('#layersActif fieldset').eq(0).attr('id');	
	var position = uuidRessource.indexOf("_") + 1;
	var uuid = uuidRessource.substring(position);
	
	var objLayer = getLayer(layersRessource, uuid);
	
	//si le type est de type zoneLibre j'affiche les outils de creation de forme
	if(objLayer.get("ressource") == "zoneLibre"){
		$('.conteneur-outilsForme').css('display','block');
	}else{
		$('.conteneur-outilsForme').css('display','none');
	}
	
	
	
}

/*
*	Retourne l'iD d'un onglet
*   parametre id du marker
*/

function removeTab2Marker(idMarker){
	var idTab;
	$('#dialogueInformation .nav-tabs').first().find('a').each(function(){
		if($(this).attr('idmarker') ==  idMarker){
			idTab = ($(this).attr('href')).replace('#', '');
			$(this).parent().remove();
			$('#' + idTab).remove();
		}
	});
	
}


/*
* Creation d'un layer
*/

function createlayer(uuid , uuidTab = undefined){
	var layers = ol2d.getLayers();
	var item = dictRessources[uuid];
	
	
	
	switch(item.source){
		case "requete":
			ressouceRequete(uuid, item, uuidTab);
		break;
		
		case "geoserver":
			ressourceWMS(uuid, item);
		break;	

		case "zoneLibre":
			ressouceZoneLibre(uuid, item);			
		break;
	}
		
		
	var objLayer = getLayer(layersRessource, uuid);
	createLayerEnabled(uuid, item);
	
	layers.push(objLayer);
	
	//si le type est de type zoneLibre j'affiche les outils de creation de forme
	if(objLayer.get("ressource") == "zoneLibre"){
		$('.conteneur-outilsForme').css('display','block');
	}else{
		$('.conteneur-outilsForme').css('display','none');
	}
	
}

function ressouceZoneLibre(uuid, item){
	var urlgeojson = urlApplication + "categories/resultatgeojson/" + item.map.idressource;	
	
	var layerTravail =  new ol.layer.Vector({
					id: uuid,
					title: item.map.nom,					
					visible: true,					
					actif: true,
					isquery: item.map.isquery,
					isedit: item.map.isedit,
					ressource: item.source,
					callback: false,
					type: 'vector',	
					mode:'', 
					source: new ol.source.Vector({
					  url: urlgeojson,
					  format: new ol.format.GeoJSON({})
				   }),
					style: styleTravail
				  });
				  
	layersRessource.push(layerTravail);
}



function ressouceRequete(uuid, item, uuidTab = undefined){
	//zone d'affichage
	//getExtent2EPSG(ol2d, strProjectionData);

	
	//chargement des donnees	
	var urlgeojson = urlApplication + "requeteurs/resultatgeojson/" + item.map.idressource;		
	
	switch(item.map.mode){
		case "normal":
			var vector =  new ol.layer.Vector({
					id: uuid,
					title: item.map.nom,	
					visible: true,					
					actif: true,
					isquery: item.map.isquery,
					isedit: item.map.isedit,
					ressource: item.source,
					callback: false,
					type: 'vector',	
					mode:'normal',
					source: new ol.source.Vector({
						url: urlgeojson,
						format: new ol.format.GeoJSON({dataProjection: strProjectionData, featureProjection: strProjection})
					}),										
					style: styleRTE
				  });
			layersRessource.push(vector);
			
			var source = vector.getSource();
			
			source.on("change", function(){
				if(source.getState() == "ready"){
					
					$('#chargement_'+ uuidTab).remove();
				}
			});
		
		break;
		
		
		case "cluster":
			// Cluster Source
			var clusterSource=new ol.source.Cluster({
				distance: distanceCluster,
				source: new ol.source.Vector({
				  url: urlgeojson,
				  format: new ol.format.GeoJSON({dataProjection: strProjectionData, featureProjection: strProjection})
			   })
			});
			
			
			
			
			// Animated cluster layer
			var clusterLayer = new ol.layer.AnimatedCluster({	
				id: uuid,
				title: item.map.nom,					
				visible: true,					
				actif: true,
				isquery: item.map.isquery,
				isedit: item.map.isedit,
				ressource: item.source,
				callback: false,
				type: 'vector',	
				mode:'cluster',
				source: clusterSource,
				animationDuration:  700,
				// Cluster style
				style: getStyle
			});
			
			layersRessource.push(clusterLayer);
			
			
			
			clusterSource.on("change", function(){				
				if(clusterSource.getState() == "ready"){					
					$('#chargement_'+ uuidTab).remove();
				}
			});
		
		break;
		
		
		
		case "heatmap":
			var vectorHeatMap = new ol.layer.Heatmap({
				id: uuid,
				title: item.map.nom,				
				visible: true,					
				actif: true,
				isquery: false,
				isedit: false,
				ressource: item.source,
				callback: false,
				mode:'heatmap',
				source: new ol.source.Vector({
					  url: urlgeojson,
					  format: new ol.format.GeoJSON({dataProjection: strProjectionData, featureProjection: strProjection})
				   }),
				blur: 15,
				radius: 5
			});
			
			var source = vectorHeatMap.getSource();
			
			source.on("change", function(){
				if(source.getState() == "ready"){
					$('#chargement_'+ uuidTab).remove();
				}
			});
			
			layersRessource.push(vectorHeatMap);
		break;
	}	
		
}

function ressourceWMS(uuid, item){
	//->fond de carte 
	var mapdefault = false;
	
	
	if(item.map.mapdefault){
		mapdefault = item.map.mapdefault;
	}
	
	var layer = new ol.layer.Tile({
					id:  uuid,
					title: item.map.nom,			
					visible: true,
					actif: true,
					mapdefault: mapdefault,
					isquery: item.map.isquery,
					isedit: item.map.isedit,
					ressource: item.source,
					callback: false,
					type: 'wms',	
					mode:'',
					source: new ol.source.TileWMS({	
						preload: Infinity,
						url: item.map.url,
						serverType: 'geoserver',
						crossOrigin: 'null',
						params: {
							'LAYERS': item.map.layers,						
							'FORMAT': item.map.format,
							'TRANSPARENT': true,
							'VERSION': '1.1.1',
							'TILED':true
						}
					})
				});
				
				
	layersRessource.push(layer);
}

/*
* Interface de gestion des ressources actives
*/
function createLayerEnabled(uuid, item){
	var objRessource;	
		
	switch(item.source){
		
		case "requete":
			
			switch (item.map.mode){
				case "heatmap":
					objRessource = 
						'<li>' +
							'<i class="nodeGestion fa fa-plus-square-o"></i>' +							
							'<span class="' + item.map.mode + '"  alt="' + item.map.nom  + '">' + item.map.nom + '</span>' +							
							'<i class="pull-right deleteLayerActif fa fa-trash-o"></i>' +
							'<fieldset id="ressource_' + uuid + '" style="display: none;" mode="' + item.map.mode + '">' +																	
							'</fieldset>' +								
						'</li>';
				break;
				
				default:
				
					objRessource = 
						'<li>' +
							'<i class="nodeGestion fa fa-plus-square-o"></i>' +							
							'<span class="' + item.map.type + '"  alt="' + item.map.nom  + '">' + item.map.nom + '</span>' +
							'<i  id="information_' + uuid + '" class="information fa fa-info-circle" style="margin-left:5px" />' +
							'<i class="pull-right deleteLayerActif fa fa-trash-o"></i>' +
							'<fieldset id="ressource_' + uuid + '" style="display: none;" mode="' + item.map.mode + '">' +										
									'<label>opacity</label>' +									
									'<input class="opacity" value="1" type="range" min="0" max="1" step="0.01">' +
									
									'<label  for="style_' + uuid + '">Style' +
										'<select id="style_' + uuid + '" style="width:250px" class="form-control style">' + 
											'<option value="pavillon">Pavillons</option>' +
											'<option value="etiquette">Etiquettes</option>' +
											'<option value="route" selected="selected">Routes</option>' +
											'<option value="point">Points</option>' +
										'</select>' +										
									'</label>' +
									
									'<label class="checkbox" for="visible_' + uuid + '">' +
										'<input id="visible_' + uuid + '" class="visible" checked = "checked"  type="checkbox">Visible' +
									'</label>' +
									'<label class="checkbox" for="labelvisible_' + uuid + '">' +
										'<input id="labelvisible_' + uuid + '" class="labelvisible" checked = "checked"  type="checkbox">Label' +
									'</label>' +									
									
									
							'</fieldset>' +								
						'</li>';
				
				break;
			}
			
		
		break;
		
		default:
			objRessource = 
				'<li>' +
					'<i class="nodeGestion fa fa-plus-square-o"></i>' +							
					'<span class="' + item.map.type + '"  alt="' + item.map.nom  + '">' + item.map.nom + '</span>' +
					'<i class="pull-right deleteLayerActif fa fa-trash-o"></i>' +
					
					'<fieldset id="ressource_' + uuid + '" style="display: none;">' +	
						'<label>opacity</label>' +
							'<input class="opacity" value="1" type="range" min="0" max="1" step="0.01">' +
							
							'<label class="checkbox" for="visible_' + uuid + '">' +
								'<input id="visible_' + uuid + '" class="visible" checked = "checked"  type="checkbox">Visible' +
							'</label>' +							
					'</fieldset>' +								
				'</li>';
		
		break;
		
	}
	
				
	$('#' + treeviewLayersEnabled + ' ul').prepend(objRessource);
	
	eventLayerEnabled(uuid, item);	
}



function getInformationLayer(uuid, page){
	
		
	var collectionMarker = dictLayersMarkers[uuid];
	
	//liste des markers présent sur le layers	
	var objLayer = getLayer(layersRessource,  uuid);
	var mode= objLayer.get("mode");
	
	
	var viewAttribut = ["IMO", "NOM", "DATE"];
	
	var uuidOnglet = addTab('dialogueInformation', objLayer.get("title"));	
	
		
	var $view = $('#' + uuidOnglet);
			
			
	switch(mode){
		case "cluster":			
			var features = objLayer.getSource().getSource().getFeatures();
		break;
		
		default:
			var features = objLayer.getSource().getFeatures();
		break;
	}
	
	$("<span>").css('display', 'block')
			   .css('margin-top', '10px')
			   .css('margin-bottom', '10px')
			   .append("Liste des données du calque - " +  features.length +  " élément(s)").appendTo($view);
	
	
	
	$("<input>").attr("type", "text")
				.attr("class", "form-control")
				.attr("placeholder", "Search ..")
				.bind("keyup", {id: uuidOnglet}, filterTable).appendTo($view);	
				
	
	var $container = $("<div>").css("height", "60vh")
							   .css("overflow-x", "auto")
							   .appendTo($view);
							   
	
	
	var $export = $("<div>").css("height", "10vh")
							.css("overflow-x", "auto")
							.css("margin-top", "20px")
							.appendTo($view); 

	
	var $listeExport = $("<ul>").attr("class", "list-inline").appendTo($export);
	
	//CSV
	var $exportCSV = $("<a>").attr("target", "_blank")
							 .attr("download", "export-sample.csv")
							 .css("margin-left","10px")	
							 .css("cursor","pointer")	
							 .text("CSV");	
	
	
	//->Creation du CSV
	exportCSV($exportCSV, uuid);
	
	//$exportCSV.bind("click",  {uuid: uuid, type: "csv"}, exports); //->exports.js
	
	$("<li>").attr("class", "list-group-item")
			 .append($("<span>").attr("class", "glyphicon fa fa-envelope-o"))
			 .append($exportCSV)
			 .appendTo($listeExport);
			 

			
								
	
	//OTHTGOLD
	var $exportOTHTGOLD = $("<a>").attr("target", "_blank")
							 .css("margin-left","10px")
							 .css("cursor","pointer")
							 .text("OTHTGOLD");	
							 
	exportOTHTGOLD($exportOTHTGOLD, uuid);
							 
	//$exportOTHTGOLD.bind("click",  {uuid: uuid, type: "othtgold"}, exports); //->exports.js
							 
	$("<li>").attr("class", "list-group-item")
			 .append($("<span>").attr("class", "glyphicon fa fa-envelope-o"))
			 .append($exportOTHTGOLD)
			 .appendTo($listeExport);
	
	
				
	
	var $table = $("<table>").attr("class", "table").appendTo($container);
	
	var $entete = $("<tr>").appendTo($table);
	$.each(viewAttribut, function(i, attribute){
		$("<th>").append(attribute).appendTo($entete);
	});
	
	
	//liste des markers masqués - début de tableau 	
	if(collectionMarker){
		for(var i=0; i < collectionMarker.getLength(); i++){
			var $ligne = $("<tr>").appendTo($table);
			
			$.each(viewAttribut, function(j, attribute){
				$("<td>").append(collectionMarker.item(i).get(attribute)).appendTo($ligne);
			});
			
			//Icon masque
			$("<td>").append($("<a>").append(
												$("<span>").attr("class", "marque ti-eye")
														   .attr("attr", i)
											)
									 .bind("click", {uuid: uuid, idx_collectionMarker: i}, enabledMarker)
							
							).appendTo($ligne);			
		}
	}
	
	
	//chargement des informations
	for(var cpt = 0; cpt < features.length; cpt ++){
		var $ligne = $("<tr>").appendTo($table);
		$.each(viewAttribut, function(i, attribute){
			$("<td>").append(features[cpt].get(attribute)).appendTo($ligne);
		});		
		$("<td>").append($("<a>").append(
											$("<span>").attr("class", "search ti-search")
													   .css("cursor", "pointer")
										)
								 .bind("click", {LON: features[cpt].get("LON"), LAT: features[cpt].get("LAT")}, getPosition)
								 
						).appendTo($ligne);
	}
	
	
	
	// var entete = $("<tr>").
	
	// var ligne = '<tr>' +
					// '<th>IMO</th>' +
					// '<th>Nom</th>' +
					// '<th>Date</th>' +
				// '</tr>';
	
	//if(collectionMarker){		
		//Liste des Markers masqués en début de tableau
		// for(var i=0; i < collectionMarker.getLength(); i++){
			// ligne = ligne +
					// '<tr>' +						
						// '<td>' + collectionMarker.item(i).get("IMO") + '</td>' +
						// '<td>' + collectionMarker.item(i).get("NOM") + '</td>' +
						// '<td>' + collectionMarker.item(i).get("DATE") + '</td>' +
						// '<td><span class="masque ti-eye" attr="' + i + '"></span></td>' +
					// '</tr>';
			
			
			
		// }
	//}
	
	//liste des markers présent sur le layers	
	// var objLayer = getLayer(layersRessource,  uuid);
	// var mode= objLayer.get("mode");
	
	
	//Ajout d'un onglet
	// var uuidOnglet = addTab('dialogueInformation', objLayer.get("title"));
	
			
	// switch(mode){
		// case "cluster":
			//cluster
			// var features = objLayer.getSource().getSource().getFeatures();
		// break;
		
		// default:
			// var features = objLayer.getSource().getFeatures();
		// break;
	// }
	
	
	// var elementDebut = nbrElementsPage * page;
	// var elementFin = elementDebut + nbrElementsPage;
	
	// if(elementFin > features.length)
		// elementFin= features.length;
	
	
	// var nbrPage = Math.ceil(features.length / nbrElementsPage);
	
	// for(var j=elementDebut; j < elementFin; j++){
		// ligne = ligne +
					// '<tr>' +						
						// '<td>' + features[j].get("IMO") + '</td>' +
						// '<td>' + features[j].get("NOM") + '</td>' +
						// '<td>' + features[j].get("DATE") + '</td>' +
						// '<td><a href="javascript:getPosition(\'' + features[j].get("LON") + '\',\'' + features[j].get("LAT") +  '\')" ><span class="search ti-search"></span></a></td>' +
					// '</tr>';
			
		
	// }
	
	//Filter
	// $('#' + uuidOnglet).append('<input type="text" class="form-control" onkeyup="javascript:filterTable(\'' + uuidOnglet +  '\')" placeholder="Search ..">');	
	
	// $('#' + uuidOnglet).append('<div style="height:350px; overflow-x:auto" ></div');
	
	
	// $('#' + uuidOnglet + ' div').append('<table class="table" ></table');
	// $('#' + uuidOnglet + ' table').append(ligne);
	
	
	// $('#' + uuidOnglet).append(pagination(nbrPage, uuid));
	
	
	/*	
	
	$('#' + uuidOnglet + ' .masque').on('click', function(e, ui){
		var index = $(this).attr("attr");
						
		var objLayer = getLayer(layersRessource,  uuid);
		var mode= objLayer.get("mode");
		
		var collectionMarker = dictLayersMarkers[uuid];
		
		switch(mode){
			case "cluster":
				var source = objLayer.getSource().getSource();				
			break;
			
			default:
				var source = objLayer.getSource();
			break;
		}
		
		$(this).parent().parent().remove();
		source.addFeature(collectionMarker.item(index));
		
		//affiche le label si il existe déjà
		var idMarker = collectionMarker.item(index).get("id_bdd");			
		var overlay = ol2d.getOverlayById(uuid + "_" + idMarker);
		if(overlay){
			var overlayElement = overlay.getElement();
			overlayElement.style.display = 'block';
			
			var layerLabel =  dictfeatureOverlayLabel[uuid];
			var sourceLineLabel = dictfeatureOverlayLabel[uuid].getSource();
			var featureLine = sourceLineLabel.getFeatureById("lineLabel-" + uuid + "_" + idMarker);	
			
			featureLine.setStyle(styleLabel);//visible	
		}
		
		//a revoir
		collectionMarker.removeAt(index);
		dictLayersMarkers[uuid] = collectionMarker;
		
		
		
		
	})
	*/
}

function enabledMarker(e){
	var uuid = e.data.uuid;
	var idx_collectionMarker = e.data.idx_collectionMarker;
	
	
	
	var objLayer = getLayer(layersRessource,  uuid);
	var mode= objLayer.get("mode");
	
	
	
	switch(mode){
		case "cluster":
			var source = objLayer.getSource().getSource();				
		break;
		
		default:
			var source = objLayer.getSource();
		break;
	}
		
	var collectionMarker = dictLayersMarkers[uuid];	
		
	//ajout du marker sur le calque
	source.addFeature(collectionMarker.item(idx_collectionMarker));
	
		
	//affiche le label éventuel
	var idMarker = collectionMarker.item(idx_collectionMarker).get("id_bdd");	
	
	var overlay = ol2d.getOverlayById(uuid + "_" + idMarker);
	if(overlay){
		var overlayElement = overlay.getElement();
		overlayElement.style.display = 'block';
		
		var layerLabel =  dictfeatureOverlayLabel[uuid];
		var sourceLineLabel = dictfeatureOverlayLabel[uuid].getSource();
		var featureLine = sourceLineLabel.getFeatureById("lineLabel-" + uuid + "_" + idMarker);	
		
		featureLine.setStyle(styleLabel);//visible	
	}
	
	collectionMarker.removeAt(idx_collectionMarker);	
	
	
}

function getPosition(e){
	
	
	var lon = parseFloat(e.data.LON);								
	var lat = parseFloat(e.data.LAT);
	
		
	var marker = new ol.Feature({
							geometry: new ol.geom.Point(ol.proj.transform([lon, lat], strProjectionData, strProjection))
						});
						
	selectMarker(marker) //->outilsCartographique.js
	ol2d.getView().setZoom(8);
	
	
	ol2d.getView().setCenter(ol.proj.transform([lon, lat], strProjectionData, strProjection));	
}


function filterTable(e){	
	var ID = e.data.id;
	
	console.log(ID);
	
	var $input = $('#' + ID + ' input');
	var filter = ($input.val()).toUpperCase();
	
	
	
	$table = $('#' + ID + ' table tr').hide();
	
	
	$('#' + ID + ' table td:contains("' +  filter +  '")').each(function(){
		$(this).parent().show();
	});
	
		
}

function hiddenLabel(uuid){	
	if(dictfeatureOverlayLabel[uuid]){
		var sourceLabel = dictfeatureOverlayLabel[uuid].getSource();
	
		var idMarker;
		var overlayElement;
		var featureLine;
		
		var features = sourceLabel.getFeatures();
		for(var i=0; i < features.length; i++){			
			
			idMarker = (features[i].getId()).replace("lineLabel-","");
			
			var overlay = ol2d.getOverlayById(idMarker);
			if(overlay){
				overlayElement = overlay.getElement();
				overlayElement.style.display = 'none';	

				featureLine = sourceLabel.getFeatureById("lineLabel-" + idMarker);			
				featureLine.setStyle(styleLabelHidden);	
				
				featurePolygon = sourceLabel.getFeatureById("polygonLabel-" + idMarker);
				featurePolygon.setStyle(styleLabelHidden);	
			}
			
		}
		
	}
	
}

function changeStyle(uuid, style){
	var objLayer = getLayer(layersRessource, uuid);	
	
	switch(style){
		
		case "pavillon":
			objLayer.setStyle(stylePavillon);
		break;

		case "etiquette":
			objLayer.setStyle(stylePavillonLabel);			
		break;
		
		case "point":
			objLayer.setStyle(stylePoint);
		break;
		
		case "route":
			objLayer.setStyle(styleRTE);
		break;
		
	}
	
	
}

function changeStyleTrajectoire(uuid, idmarker, style){
	var objLayer = dictfeatureVectorTrajectoire[uuid][idmarker];
	
	switch(style){
		
		case "classique":
			objLayer.setStyle(styleTrajectoireClassique);
		break;

		case "capteur":
			objLayer.setStyle(styleTrajectoireCapteur);			
		break;
		
		case "orientation":
			objLayer.setStyle(styleTrajectoireOrientation);			
		break;
		
		case "information":
			objLayer.setStyle(styleTrajectoireInformation);
		break;
		
	}

}

function displayLabel(uuid){
	if(dictfeatureOverlayLabel[uuid]){
		var sourceLabel = dictfeatureOverlayLabel[uuid].getSource();
	
		var idMarker;
		var id_bdd;
		var overlayElement;
		var featureLine;
		var featurePolygon;
		
		var features = sourceLabel.getFeatures();
		var featureMasque;
		var visible;
		for(var i=0; i < features.length; i++){
			
			//idMarker = features[i].get('id_bdd');
			idMarker = (features[i].getId()).replace("lineLabel-","");
			id_bdd = idMarker.split('_')[1];
			
			
			var overlay = ol2d.getOverlayById(idMarker);
			if(overlay){
				overlayElement = overlay.getElement();
				
				//attention au element masqué sciemment
				visible = true; 
				if(dictLayersMarkers[uuid]){
					featureMasque = getFeatureCollectionMasque(dictLayersMarkers[uuid], id_bdd );
					
					visible = false;
					if(!featureMasque){
						visible = true;
					}
						
				}
				
				
				if(visible == true){
					overlayElement.style.display = 'block';	
					
					featureLine = sourceLabel.getFeatureById("lineLabel-" + idMarker);			
					featureLine.setStyle();//visible	
					
					featurePolygon = sourceLabel.getFeatureById("polygonLabel-" + idMarker);
					featurePolygon.setStyle();
				}
			}
			
		}
	}
}


function pagination(nbrPage, uuid){
	
	var pages = '';
	for(var i=0; i<nbrPage; i++){
		pages = pages + '<li>' +
							'<a href="javascript:getInformationLayer(\'' + uuid + '\', ' + i + ')">' + (i+1) + '</a>' +
						'</li>';
	}
	
	var pagination = '<nav>' +
						'<ul class="pagination pagination-sm">' +														
							pages +							
						'</ul>' +
					 '</nav>';
					 
	return pagination;
}

/*
* Mini fiche d'information
* dans le cas d'un calque de wms
*/

function ficheInformationWMS(evt, objLayer){
	var undefined;
	var coord = evt.coordinate;		
	var content = document.getElementById('popup-content');
	
	var url = objLayer.getSource().getGetFeatureInfoUrl(
									evt.coordinate, 
									view.getResolution(), 
									view.getProjection(),
									{'INFO_FORMAT':'text/html'}
								);
								
	
	
	$.ajax({
		type: "GET",
		url: url ,			
		success: function(data){			
			
			$data = $(data);			
			if($data.find('tr').length){
				$entete = $data.find("tr:eq(0)");
				$corps = $data.find("tr:eq(1) td:gt(1)");
				
				var $information = $("<table></table>")
														.attr("class", "table")					  
														.css("margin-top", "10px"); 
														
				
				
				
				$entete.find("th:gt(1)").each(function(i){
					
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<th></th>').text($(this).text()).appendTo($ligne);
					
					$('<td></td>').text($($corps[i]).text()).appendTo($ligne);
					
				});
				
				overlayPopup.show(coord, $information);
				
			}		
			
		}
	});	
}

/*
* Mini fiche d'information
* dans le cas d'un calque de type vector
*/
function ficheInformationVector(evt){
	var undefined;
	var coord = evt.coordinate;		
	var content = document.getElementById('popup-content');
	
	var mode = "vector";
	
	var feature = ol2d.forEachFeatureAtPixel(evt.pixel,
				function(feature, layer) {
				return feature;
			});	
	
	
	
	if (feature) {
		
		// mode cluster
		if(feature.getProperties().features != undefined){
			mode = "cluster";
		}
		
		
		switch (mode){
			case "vector":
				if(feature.get("markers") != undefined){			
					switch(feature.get("markers")){
						case "position":
							var $information = $("<table></table>")
													.attr("class", "table")					  
													.css("margin-top", "10px"); 
													
							//PAVILLON + NOM
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').css('width', '20px').append(
																		$('<img>').css('width', '20px')
																			  .attr('src', '../img/pavillons/' + feature.get('NATION') +  '.png')
																	).appendTo($ligne);
																	
							$('<td></td>').text(feature.get('NOM') + ' (' + feature.get('NATION') +  ') ').appendTo($ligne);
							
							
							//IMO
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('IMO').appendTo($ligne);
							$('<td></td>').text(feature.get('IMO')).appendTo($ligne);
							
							//MMSI
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('MMSI').appendTo($ligne);
							$('<td></td>').text(feature.get('MMSI')).appendTo($ligne);
							
							//OTAN
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('OTAN').appendTo($ligne);
							$('<td></td>').text(feature.get('TYPEOTAN')).appendTo($ligne);
							
							//DATE
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('DATE').appendTo($ligne);
							$('<td></td>').text(feature.get('DATE')).appendTo($ligne);
							
							//CAPTEUR
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('CAPTEUR').appendTo($ligne);
							$('<td></td>').text(feature.get('CAPTEUR')).appendTo($ligne);
							
												
							overlayPopup.show(coord, $information);
							
											
											
						break;
						
						
						case "trajectoire":				
												
							var $information = $("<table></table>")
													.attr("class", "table")					  
													.css("margin-top", "10px"); 
							
							
							//CAPTEUR
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('CAPTEUR').appendTo($ligne);
							$('<td></td>').text(feature.get('CAPTEUR')).appendTo($ligne);
							
							//DATE
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('DATE').appendTo($ligne);
							$('<td></td>').text(feature.get('DATE')).appendTo($ligne);
							
							
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>')								
										.text('PROJECTION').appendTo($ligne);
							$('<td></td>')								
										.text(strProjectionData).appendTo($ligne);
							
							//Coordonnees DMS
							var $ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').text('DMS').appendTo($ligne);
							$('<td></td>').text(ol.coordinate.toStringHDMS(ol.proj.transform(coord, strProjection, strProjectionData))).appendTo($ligne);
							
							overlayPopupTrajectoire.show(coord, $information);
											
						break;
					}				
						
				}
			
			break;
			
			case "cluster":
				var features = feature.getProperties().features;
				
				var $information = $("<table></table>")
											.attr("class", "table")					  
											.css("margin-top", "10px"); 
				
				if(features.length > 1){				
					
					//si le cluster est trop important pas de traitement
					if(features.length < 10){
					
						var $ligne;
						
						//Entete
						$ligne = $('<tr></tr>').appendTo($information);
						$('<th></th>').text('').appendTo($ligne);
						$('<th></th>').text('DATE').appendTo($ligne);
						$('<th></th>').text('IMO').appendTo($ligne);
						$('<th></th>').text('NOM').appendTo($ligne);
						
						features.forEach(function(feature){
							$ligne = $('<tr></tr>').appendTo($information);
							
							$('<td></td>').css('width', '20px').append(
																	$('<img>').css('width', '20px')
																		  .attr('src', '../img/pavillons/' + feature.get('NATION') +  '.png')
																).appendTo($ligne);
																
							$('<td></td>').text(feature.get('DATE')).appendTo($ligne);
							$('<td></td>').text(feature.get('IMO')).appendTo($ligne);																		
							$('<td></td>').text(feature.get('NOM') + ' (' + feature.get('NATION') +  ') ').appendTo($ligne);
											
						});
						
						
					}else{
						//Statistique par pavillon
						
						
											
						
						var statistiquePavillon = [];
						features.forEach(function(feature){
							if(statistiquePavillon[feature.get('NATION')]){
								statistiquePavillon[feature.get('NATION')] = statistiquePavillon[feature.get('NATION')] + 1;
							}else{
								statistiquePavillon[feature.get('NATION')] = 1;
							}
						});
						
						var longueurBarre = 500;
						var longueur;
						
						var percent = 0;
						(Object.keys(statistiquePavillon)).forEach(function(pavillon){
							//percent = (100 * parseInt(statistiquePavillon[pavillon]) / longueurBarre);
							
							percent = parseInt((100 * parseInt(statistiquePavillon[pavillon])) / features.length);
							
							console.log(parseInt(statistiquePavillon[pavillon]));
							console.log(percent);
							
							
							$ligne = $('<tr></tr>').appendTo($information);
							$('<td></td>').css('width', '20px').append(
																	$('<img>').css('width', '20px')
																		  .attr('src', '../img/pavillons/' + pavillon +  '.png')
																).appendTo($ligne);
							
														
							longueur  = (300 * percent) / 100;
							
							$('<td></td>').append(
													$('<div>').css({'width': longueur + 'px', 'height':'20px', 'line-height':'20px', 'padding-left':'5px', 'font-size':'0.8em', 'background-color':'#D8D8D8', 'color':'#000'}).text(percent + '%')													  
												).appendTo($ligne);
						});
						
						
					
						
						
						
						//x = (100 * valeur) / longeurBarre
					}
					
					overlayPopup.show(coord, $information);
				}else{
					
					feature = features[0];
					var $information = $("<table></table>")
													.attr("class", "table")					  
													.css("margin-top", "10px"); 
													
					//PAVILLON + NOM
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').css('width', '20px').append(
																$('<img>').css('width', '20px')
																	  .attr('src', '../img/pavillons/' + feature.get('NATION') +  '.png')
															).appendTo($ligne);
															
					$('<td></td>').text(feature.get('NOM') + ' (' + feature.get('NATION') +  ') ').appendTo($ligne);
					
					
					//IMO
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').text('IMO').appendTo($ligne);
					$('<td></td>').text(feature.get('IMO')).appendTo($ligne);
					
					//MMSI
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').text('MMSI').appendTo($ligne);
					$('<td></td>').text(feature.get('MMSI')).appendTo($ligne);
					
					//OTAN
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').text('OTAN').appendTo($ligne);
					$('<td></td>').text(feature.get('TYPEOTAN')).appendTo($ligne);
					
					//DATE
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').text('DATE').appendTo($ligne);
					$('<td></td>').text(feature.get('DATE')).appendTo($ligne);
					
					//CAPTEUR
					var $ligne = $('<tr></tr>').appendTo($information);
					$('<td></td>').text('CAPTEUR').appendTo($ligne);
					$('<td></td>').text(feature.get('CAPTEUR')).appendTo($ligne);
					
					overlayPopup.show(coord, $information);
				}			
				
				
				
			break;
		}
		
		
		
	}
	
}

/*
* Gestion de l'event click sur la map
* Affiche une mini fiche d'information
*/
function mouseEventClickMap(evt){
	
	
	
	var layers = ol2d.getLayers();						
	var objLayer = getLayerCourant(layers); //->common.js	
	
	var isquery = objLayer.get("isquery");
	
	if(isquery == true){
		switch(objLayer.get("type") ){			
			case "wms":
				ficheInformationWMS(evt, objLayer);
			break;
			
			case "vector":
				ficheInformationVector(evt);			
			break;
		}		
	}

}



function eventLayerEnabled(uuid, item){
	var opacityInput = $('#ressource_' + uuid + ' input.opacity');
	var visibilityInput = $('#ressource_' + uuid + ' input.visible');
	var visibilityLabelInput = $('#ressource_' + uuid + ' input.labelvisible');	
	
	var styleSelect = $('#ressource_' + uuid + ' select.style');

	styleSelect.on('change', function(e, ui){
		var uuidRessource = $(e.target).attr("id");
		var position = uuidRessource.indexOf("_") + 1;
		var uuid = uuidRessource.substring(position);
		
				
		changeStyle(uuid, $(e.target).val());
		console.log($(e.target).val());
	});
	
	var information = $('#information_' + uuid);
	
	information.on('click', function(e, ui){
		getInformationLayer(uuid, 0);
			
	});	
	
	var objLayer = getLayer(layersRessource, uuid);
	
	visibilityLabelInput.on('change', function(e, ui){	
		var uuidRessource = $(e.target).attr("id");
		var position = uuidRessource.indexOf("_") + 1;
		var uuid = uuidRessource.substring(position);
		
		if(this.checked == false){							
			hiddenLabel(uuid);
		}else{			
			displayLabel(uuid);
		}
		
	});
	
	visibilityInput.on('change', function(e, ui){			
		var uuidRessource = $(e.target).attr("id");
		var position = uuidRessource.indexOf("_") + 1;
		var uuid = uuidRessource.substring(position);
		
		var objLayer = getLayer(layersRessource, uuid);
		var opacityInput = $('#ressource_' + uuid + ' input.opacity');
		
		switch(objLayer.get("type") ){			
			case "wms":
				objLayer.setVisible(this.checked);
				objLayer.setOpacity(opacityInput.val());
			break;
			
			case "vector":
				if(this.checked == false){
					objLayer.setOpacity(0);					
					hiddenLabel(uuid);
				}else{
					objLayer.setOpacity(opacityInput.val());
					displayLabel(uuid);
				}
				
			break;
		}			
	});	
	
	opacityInput.on('change', function(e, ui){
		var uuidRessource = $(e.target).parent().attr("id");
		var position = uuidRessource.indexOf("_") + 1;
		var uuid = uuidRessource.substring(position);
		
		var objLayer = getLayer(layersRessource, uuid);
		var visibilityInput = $('#ressource_' + uuid + ' input.visible');
		
		if(visibilityInput.prop('checked'))
			objLayer.setOpacity(parseFloat(this.value));
	});
	
	
	
	
	
	var deleteNode = $('#ressource_' + uuid).parent().find(".deleteLayerActif");	
	deleteNode.on("click", eventNodeDelete);
	
	//Evenement sur le node
	var treeviewNode = $('#ressource_' + uuid).parent().find(".nodeGestion");	
	treeviewNode.on("click", eventTreeviewEnabled);
}

function eventNodeDelete(){
	var uuidRessource = $(this).parent().find("fieldset").attr("id");
	
	//var uuidRessource = $(this).parent().attr("id");
	var position = uuidRessource.indexOf("_") + 1;
	var uuid = uuidRessource.substring(position);
	
	//checked = false dans le treeview des ressources
	
	$('#' + uuid).find('input').prop('checked', false);
	removeLayer(uuid);
}

function eventTreeviewEnabled(){	
	if($(this).hasClass("fa-plus-square-o")){
		$(this).removeClass("fa-plus-square-o");
		$(this).addClass("fa-minus-square-o");
		$(this).parent().find("fieldset").css({"display":"block"});
	}else{
		$(this).removeClass("fa-minus-square-o");
		$(this).addClass("fa-plus-square-o");
		$(this).parent().find("fieldset").css({"display":"none"});
	}
}

function eventSortableLayers(e, ui){
	var idTreeview = $(e.target).parent().attr("id");
	var layersCollection = ol2d.getLayers();
	
	var uuidRessource;
	var position;
	var uuid;
	var objLayer;
	
	console.log("event drag and drop menu");
	
	var listeLayers = [];
	$('#' + idTreeview + ' fieldset').each(function(i){
		uuidRessource = $(this).attr("id");
		position = uuidRessource.indexOf("_") + 1;
		uuid = uuidRessource.substring(position);		
			
			
		
		objLayer = getLayer(layersRessource, uuid);		
		listeLayers.push(objLayer);
		
		layersCollection.remove(objLayer);
	});
	
	
	//calque technique
	var layersTechnique = new ol.Collection();			
	ol2d.getLayers().getArray().slice(0).forEach(function(layerTechnique){
		layersTechnique.push(layerTechnique);		
	});
	
	ol2d.getLayers().clear();	
	
	
	for(var i = (listeLayers.length - 1); i >= 0; i--){
		layersCollection.push(listeLayers[i]);	
	}	
	
	for(var i = layersTechnique.getLength() - 1; i >= 0 ; i--){		
		layersCollection.push(layersTechnique.item(i));		
	}
	
	//Controle le type de calque en haut de la pile
	uuidRessource =$('#' + idTreeview + ' fieldset').eq(0).attr('id');
	
	position = uuidRessource.indexOf("_") + 1;
	uuid = uuidRessource.substring(position);	
	objLayer = getLayer(layersRessource, uuid);
	
	//si le type est de type zoneLibre j'affiche les outils de creation de forme
	if(objLayer.get("ressource") == "zoneLibre"){
		$('.conteneur-outilsForme').css('display','block');
	}else{
		$('.conteneur-outilsForme').css('display','none');
	}
	
	
}

/*
* Return un objet feature d'une collection à partir de son ID
* Objet masqué
*/
function getFeatureCollectionMasque(collectionMarker, id){	

	var exist = false;
	var cpt = 0;
	while ( cpt < collectionMarker.getLength() && exist == false){
		
		if(collectionMarker.item(cpt).get('id_bdd') == id){
			feature = collectionMarker.item(cpt);
			exist = true;			
		}						
		cpt++;
	}	
	
	if(exist)
		return feature;
	else
		return false;
}


/*
* Return un objet layer d'une collection à partir de son ID
* 
*/
function getLayer(collectionLayers, id){	
	var exist = false;
	var cpt = 0;
	while ( cpt < collectionLayers.getLength() && exist == false){
		if(collectionLayers.item(cpt).get('id') == id){
			layer = collectionLayers.item(cpt);
			exist = true;			
		}						
		cpt++;
	}	
	
	if(exist)
		return layer;
	else
		return false;
}


/*
*
*
*/

function boolContextMenu(layers){
	var nbrLayers = layers.getLength();
	var layerCourant = layers.item(nbrLayers - 1); 
	
	if(layerCourant.get('categorie') != 'technique'){
		return true;
	}else{
		return false;
	}
}


/*
* Return l'objet layer affiché sur la map
* 
*/
function getLayerCourant(layers){
	
	var nbrLayers = layers.getLength();
	var trouve = false;
	var layerCourant;
	
	
	var i = 1;
		
	while(trouve === false && i <= nbrLayers){
		
		layerCourant = layers.item(nbrLayers - i); 
				
		if(layerCourant.get('categorie') != 'technique'){
			console.log("layer courant : " + layerCourant.get('id'));
			trouve = true;			
		}
		
		i++;
	}		  
	
	if(trouve == true)
		return layerCourant;
	else
		return false;
}

/*
* Creation d'une couleur aleatoire
*
*
*
*/
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


/*
* Creation d'un ID unique
*
*/

function guid() {    
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