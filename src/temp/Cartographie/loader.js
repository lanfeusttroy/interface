function loadOpenlayer(){
	
	//->Chargement couche popup
	// var container = document.getElementById('popup');    
    // var closer = document.getElementById('popup-closer');
	
	
	// overlayPopup = new ol.Overlay.Popup({
						
						// popupClass : 'default',
						// positioning: 'auto',
						// autoPan: true,
						// autoPanAnimation: {duration: 250 }
		
					// });
					
	overlayPopup = new ol.Overlay.Popup (
		{	popupClass: "black", //"tooltips", "warning" "black" "default", "tips", "shadow",
			closeBox: true,
			// onshow: function(){ console.log("You opened the box"); },
			// onclose: function(){ console.log("You close the box"); },
			positioning: 'auto',
			autoPan: true,
			autoPanAnimation: { duration: 250 }
		});
		
		
		
	overlayPopupTrajectoire = new ol.Overlay.Popup (
		{	popupClass: "black", //"tooltips", "warning" "black" "default", "tips", "shadow",
			closeBox: true,
			// onshow: function(){ console.log("You opened the box"); },
			// onclose: function(){ console.log("You close the box"); },
			positioning: 'auto',
			autoPan: true,
			autoPanAnimation: { duration: 250 }
		});
	
		
	// overlayPopup = new ol.Overlay(({
			// element: container,
			// autoPan: true,
			// autoPanAnimation: {
				// duration: 250
			// }
		// })
	// );
	
	
	// closer.onclick = function() {
		// overlayPopup.setPosition(undefined);
		// closer.blur();
		// return false;
	// };
	
	
	ol2d = new ol.Map({
		projection:strProjection,
		controls: ol.control.defaults({
			attributionOptions: /** @type {olx.control.AttributionOptions} */ 
			({
				collapsible: false
			})
		}).extend([
			//scalelineControl
		]),
		layers: layersEnabled,
		renderer: 'canvas',
		overlays: [overlayPopup, overlayPopupTrajectoire],
		target: 'ol3',
		view: view
	});	
	
	
	var buttonsOutilsControl = new ol.control.outilsControl({"dialogue":"dialogueInformation", "pim":true, "noeud":14});   
    ol2d.addControl(buttonsOutilsControl);
	
	
	/*Ajout de la barre d'outils de gestion des formes*/
	var barreOutilsForme =  new ol.control.outilsForme({"dialogue":"dialogueInformation", 
														"strDataProjection":strProjectionData, 
														"strProjection": strProjection}); 
	ol2d.addControl(barreOutilsForme);
	
		
	
	function center(){
		console.log("center");
	}
	
		
	
	//-> Ajoute des coordonnees
	var mousePosition = new ol.control.MousePosition({
		coordinateFormat: function(coord){			
			return ol.coordinate.toStringHDMS(coord);
		},
		projection : projection,
		className: 'custom-mouse-position',
		target: undefined,
		undefinedHTML: '&nbsp;'
	});	
	ol2d.addControl(mousePosition);	
	
	
	//-> Ajoute la barre d'echelle
	var scaleline = new ol.control.ScaleLine({'units':'nautical'});
	ol2d.addControl(scaleline);
	
		
	//->Active les events sur la map	
	//->common.js
	ol2d.on('singleclick', mouseEventClickMap);		
	
	//->Chargement de niveau de zoom
	ol2d.on('moveend', checkLevelZoom);
	
	
	//->Charge le menu contextuel
	loadContextMenu();
}



