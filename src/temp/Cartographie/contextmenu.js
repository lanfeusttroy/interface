/*
* Gestion du menu contextuel
*
*/


var defaultMenu = [
	{
	  text: 'Zoom',   
	  //icon: '../img/zoom.png',
	  classname:'icon-context-zoom',
	  callback: zoom //outilsCartographique.js
	},
	{
	  text: 'Download MAP',   
	  //icon: '../img/important.png',
	  classname:'icon-context-download',
	  callback: exportPNG //->outilsCartographie.js 
	}	
]; 

/*
* Definition des differents elements du menu
*
*/

//Selection d'un element sur la map
var elementsSelect	= {
	text: 'Select',		  
	//icon: '../img/select.gif',
	classname:'icon-context-select',
	callback: selectElements //outilsCartographique.js
};

//Masque un element de la map		
var markerMask = {
	text: 'Masquer',
	//icon: '../img/delete.png',
	classname:'icon-context-masque',
	callback: maskMarker //contextmenu.js
};	
	
//Affiche la fiche d'information
var ficheDisplay = {
	text: 'Fiche',
	//icon: '../img/information.png',
	classname:'icon-context-fiche',
	callback: displayFiche
};


//Affiche l'etiquette
var etiquetteDisplay ={
	text: 'Label',
	//icon: '../img/etiquette.png',
	classname:'icon-context-label',
	callback: displayEtiquette
};
	
//Affiche la trajectoire
var trajectoireDisplay = {
	text: 'Trajectoire',
	classname:'icon-context-compas',
	callback: displayTrajectoire,		
};

/*
* Outils de creation de forme
*
*/

var point = {
	text: 'Point',
	icon: '../img/drawPoint.png',
	callback: createForm,
	data:{type:"Point"}
};

var circle = {
	text: 'Cercle',
	icon: '../img/drawPolygon.png',
	callback: createForm,
	data:{type:"Circle"}
};

var line = {
	text: 'Ligne',
	icon: '../img/drawLine.png',
	callback: createForm,
	data:{type:"LineString"}
};

var square = {
	text: 'Square',
	icon: '../img/drawPolygon.png',
	callback: createForm,
	data:{type:"Square"}
};

var polygone = {
	text: 'Polygone',
	icon: '../img/drawPolygon.png',
	callback: createForm,
	data:{type:"Polygon"}
};



function loadContextMenu(){
	contextmenu = new ContextMenu({
		width: 170,
		defaultItems: false, // defaultItems are (for now) Zoom In/Zoom Out
		items: defaultMenu
	});
	ol2d.addControl(contextmenu); //lien avec openlayers	
	
	
	contextmenu.on('open', function(evt){
		var layers = ol2d.getLayers();
		console.log("event open contextmenu");
					
				
		//Controle la presence d'un element sur la map		
		var eventElement = ol2d.forEachFeatureAtPixel(evt.pixel, function(ft, l){
			return [ft, l];
		});
		
		var mode;
		var ressource;
		var categorie;
		
		var marker;
		var objLayer;	
		
		
		if (eventElement) {	
		
			contextmenu.clear();
		
			//menu par defaut
			$.each(defaultMenu, function(i, item) {				
				contextmenu.push(item);
			});
			
			mode = eventElement[1].get("mode");
			ressource = eventElement[1].get("ressource");
			categorie = eventElement[1].get("categorie");
			
					
			if(categorie == undefined){
				//affiche un menu suivant le type de ressource
				//(requete | zoneLibre)
								
				switch(ressource){
					case "requete":
						//affiche le menu suivant le type d'affichage
						//(cluster | normal)
						switch(mode){
							case "cluster":
								if(eventElement[0].get('features').length == 1){
									marker = eventElement[0].get('features')[0];
									objLayer = eventElement[1];
									
									//ajout des elements du menu contextuel
									//->Separateur
									contextmenu.push('-');
								}
							break;
							
							case "normal":
								
							
								marker = eventElement[0];
								objLayer = eventElement[1];
								
								//ajout des elements du menu contextuel								
								//->Separateur
								contextmenu.push('-');
								
								//->Masque l'element								
								markerMask.data = {
									marker: marker,
									objLayer: objLayer
								};
								contextmenu.push(markerMask);
								
								//->Affiche la fiche
								ficheDisplay.data = {
									marker: marker,
									objLayer: objLayer
								};						
								contextmenu.push(ficheDisplay);
								
								//->Affiche ou Masque l'etiquette
								etiquetteDisplay.data = {
									marker: marker,
									objLayer: objLayer
								};						
								contextmenu.push(etiquetteDisplay);
								
								//->Affiche la trajectoire
								trajectoireDisplay.data = {
									marker: marker,
									objLayer: objLayer
								};						
								contextmenu.push(trajectoireDisplay);							
								
								//->Separateur
								contextmenu.push('-');
								
								//->Selectionne plusieurs elements sur la map
								contextmenu.push(elementsSelect);
								
								
							break;
						}
						
					break;
					
					case "zoneLibre":
						console.log("contexte menu - zone libre");
					break;
				}				
			}
		}
		
		
	});
	
	contextmenu.on('beforeopen', function(evt){
		console.log("event beforeopen contextmenu");
		var layers = ol2d.getLayers();						
		var objLayer = getLayerCourant(layers); //->common.js	
		
		var isquery;
		var ressource;
		
		contextmenu.clear();
		
		//menu par defaut
		$.each(defaultMenu, function(i, item) {				
			contextmenu.push(item);
		});
		
		if(objLayer != false){			
			
			isquery = objLayer.get("isquery");
			ressource = objLayer.get("ressource");	

			//si le layer contient des informations
			if(isquery == true){
				//->Separateur
				contextmenu.push('-');
				contextmenu.push(elementsSelect);
			}
			
			
			/*
			switch(ressource){
				case "zoneLibre":
					//->Menu de creation de forme
					contextmenu.push('-');
					contextmenu.push(point);	
					contextmenu.push(line);	
					contextmenu.push(square);	
					//contextmenu.push(circle);	
					contextmenu.push(polygone);
				break;
			}
			*/
		}
		
	});
}

/*
* Function du contextmenu
*
*/

//Outils de creation de forme
function createForm(obj){			
	console.log(obj.data);
	//drawForm(obj.data.type); //->outilsCartographique.js	
};



//Masquer un element sur la map
function maskMarker(obj){
	console.log("ok");			
	var objLayer = obj.data.objLayer;
	var uuid = objLayer.get('id');		

	var collectionMarker = dictLayersMarkers[objLayer.get('id')];

	if(!dictLayersMarkers[objLayer.get('id')]){
		collectionMarker = new ol.Collection();
	}

	collectionMarker.push(obj.data.marker);
	dictLayersMarkers[objLayer.get('id')] = collectionMarker;


	//Masque le label si il existe
	var idMarker = (obj.data.marker).get("id_bdd");	
	var overlay = ol2d.getOverlayById(uuid + "_" + idMarker);
	if(overlay){
		var overlayElement = overlay.getElement();
		overlayElement.style.display = 'none';
		
					
		var layerLabel =  dictfeatureOverlayLabel[uuid];
		var sourceLineLabel = dictfeatureOverlayLabel[uuid].getSource();
		var featureLine = sourceLineLabel.getFeatureById("lineLabel-" + uuid + "_" + idMarker);	
		
		featureLine.setStyle(styleLabelHidden);//hidden			
		
		
	}		

	objLayer.getSource().removeFeature(obj.data.marker);		
	
};

//Affiche la fiche de l'element selectionne
function displayFiche (obj){			
	ficheElement(obj.data.marker, obj.data.objLayer); //->common.js
};


//Affiche l'etiquette
function displayEtiquette (obj){	
	var idMarker = (obj.data.marker).get("id_bdd");	
	var uuid = (obj.data.objLayer).get('id');	
	
	var overlay = ol2d.getOverlayById(uuid + "_" + idMarker);

	if(!overlay){
		createLabel(obj.data.marker, obj.data.objLayer); //outilsCartographique.js
	}else{
		deleteLabel(obj.data.marker, obj.data.objLayer); // outilsCartographique.js
	}		
};


//Affiche la trajectoire
function displayTrajectoire(obj){	
	
	console.log("Debut trajectoire");		
	gestionTrajectoire(obj.data.marker, obj.data.objLayer); // common.js
			
};







