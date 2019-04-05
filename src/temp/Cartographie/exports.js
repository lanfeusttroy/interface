
function exportCSV($obj, uuid){
	
	var objLayer = getLayer(layersRessource,  uuid);
	var mode= objLayer.get("mode");
	
	switch(mode){
		case "cluster":			
			var features = objLayer.getSource().getSource().getFeatures();
		break;
		
		default:
			var features = objLayer.getSource().getFeatures();
		break;
	}
	
		
	//liste des attributs de l'export
	var viewAttribut = ["DATE", "NATION", "IMO", "NOM", "MMSI", "TYPEOTAN", "LON", "LAT", "RTE", "VIT", "CAPTEUR"];
	
	var dataURL = '';
	var dataRow = '';
	
	for(var cpt = 0; cpt < features.length; cpt ++){
		dataRow = '';
		
		$.each(viewAttribut, function(i, attribute){			
			dataRow += features[cpt].get(attribute) + ";";	
		});		
		
		dataURL += 	dataRow + "\n";	
	}
	
	$obj.attr("href", "data:text/csv;charset=utf-8;base64," + btoa(dataURL));
}


function exportOTHTGOLD($obj, uuid){
	var objLayer = getLayer(layersRessource,  uuid);
	var mode= objLayer.get("mode");
	
	switch(mode){
		case "cluster":			
			var features = objLayer.getSource().getSource().getFeatures();
		break;
		
		default:
			var features = objLayer.getSource().getFeatures();
		break;
	}
	
	
	//liste des attributs de l'export
	var viewAttribut = ["DATE", "NATION", "IMO", "NOM", "MMSI", "TYPEOTAN", "LON", "LAT", "RTE", "VIT", "CAPTEUR"];
	
	var dataURL = '';
	var dataRow = '';
	
	for(var cpt = 0; cpt < features.length; cpt ++){
		dataRow = '';
		
		$.each(viewAttribut, function(i, attribute){
			
			if(attribute == "LON"){
				
				DMS = DEC2DMS(features[cpt].get(attribute), "LON");
				check = checksum(DMS);
			}
			
			if(attribute == "LAT"){
				
			}
			
			//dataRow += features[cpt].get(attribute) + ";";	
		});		
		
		//dataURL += 	dataRow + "\n";	
	}
	
	//$obj.attr("href", "data:text/csv;charset=utf-8;base64," + btoa(dataURL));

	
}


function checksum(strValeur){
	listeCaractere = Array.from(	strValeur );
}


function DEC2DMS(strValeur, type){
	
	
	var valeurs = strValeur.toString().split(".");
	var degree = parseInt(valeurs[0]);
	
	var strDegree = (Math.abs(degree)).toString();
	
	var minute = 0;
	
	if(valeurs.length  > 1){
		minute = parseFloat(0 + "." + valeurs[1]);
	}
	
		
	var temp = minute * 3600;
	minute = Math.floor(temp / 60);
	seconde = temp - (minute * 60 );	
	
	if(type == "LAT"){
		if(strDegree.length == 1)
			strDegree = "0" + strDegree;
		
		//->LON
		if(degree > 0)
			caractere = "N";
		else
			caractere = "S";		
	}
	
	if(type == "LON"){
		if(strDegree.length == 2)
			strDegree = "0" + strDegree;
		
		if(strDegree.length == 1)
			strDegree = "00" + strDegree;
		
		//->LAT
		if(degree > 0)
			caractere = "E";
		else
			caractere = "W";
	}
	
	return  strDegree + minute.toString() + caractere ;
		
}


