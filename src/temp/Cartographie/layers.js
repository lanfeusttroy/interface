/*Carte utilisée pour le module de gestion de zone*/
var blueMarble = 
	{
		"ID":"baa4672c-38dc-4fb1-afc2-150348658a4c",
		"libelle":"Blue Marble Bathymetrie",
		"description":"",
		"type":"layer",		
		"source":"geoserver",
		"typeRessource":"raster",
		"children":[],
		"map":{
			"nom":"Blue Marble Bathymetrie",
			"type":"raster",
			"mapdefault":true, //fond de carte
			"isquery":false,
			"isedit":false,			
			"ressource":"wms",
			"layers":"maps:blueMarbleBathy",
			"url":"http://srv-carto:8080/geoserver/gwc/service/wms",
			"format":"image/jpeg",		
			"cache":true,
			"visible":true,
			"description":""			
		}
		
	};

var osmMap = 
	{
		"ID":"caba68dc-7197-48c3-872c-3002c1c48f3b",
		"libelle":"OSM",
		"description":"",
		"type":"layer",		
		"source":"geoserver",
		"typeRessource":"raster",
		"children":[],
		"map":{
			"nom":"OSM",
			"type":"raster",
			"mapdefault":true, //fond de carte
			"isquery":false,
			"isedit":false,			
			"ressource":"wms",
			"layers":"osm:world",
			"url":"http://srv-carto:8080/geoserver/gwc/service/wms",
			"format":"image/png",		
			"cache":true,
			"visible":true,
			"description":""			
		}
		
	};

var defaultMap = [osmMap];
var collectionMap = [blueMarble, osmMap];

