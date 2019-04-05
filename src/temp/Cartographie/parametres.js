
//Projection
var strProjectionData = 'EPSG:4326';
var strProjection = 'EPSG:900913';
var projection = new ol.proj.get(strProjection);

//zoom
var currentZoomLevel;


proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");
proj4.defs("EPSG:3395", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
proj4.defs("EPSG:32662", "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ");

//Format d'image (geoserver)
var formatImage = 'image/png'; // (image/png || image/jpeg)


var featureOverlayTechnique; //-> Utilisé pour tracer les zones de sélection
var featureTechniqueForme; //-> Utilisé pour affiche une forme sur la carto - outils de conversion

var featureTechniqueExportLabel;

var featureTechniqueTrajectoire; 
var featureTechniqueTrajectoireSelect;

var featureOverlayMeasure; //Outils de mesure


var featureTechniqueEtiquette; //Utilisé pour afficher les etiquettes lors d'un export PNG

//Popup position
var overlayPopup;

//Popup trajectoire
var overlayPopupTrajectoire;


//Collection Feature lors d'une selection
var collectionFeature;


var distanceCluster = 20; //Distance cluster


//taille des labels suivant le niveau de zoom
var sizeLabel = [
	[2500000, 1000000],	//0
	[2500000, 900000],	//1
	[5000000, 1900000],	//2
	[2500000, 900000], //3
	[1250000, 450000], 	//4
	[580000, 190000], 	//5
	[300000, 90000],	//6
	[145000, 45000],	//7
	[75000, 25000], 	//8
	[38000, 12000], 	//9
	[18000, 6000],	//10
	[9500, 3000],	//11
	[4800, 1500],	//12
	[2500, 750] 	//13
];


//Recherche l'information sur plusieurs calque de même type
//Valeur minimun 1
var profondeur = 2;

//Nbr d'enregistrement max retourner par un requete sur une couche WMS
var nbrEnregMaxWMS = 100;


var view = new ol.View({
	projection: projection,
	center: [2, 10],
	zoom: 3,
	minZoom: 2,
	maxZoom: 12
});


//Dictionnaire des ressources disponible
var dictRessources = {}


//-> Treeview de gestion des layers actifs
var treeviewLayersEnabled = "layersActif";

//-> Layers actif
var layersEnabled = [];


//-> Layers ressource
var layersRessource = new ol.Collection();

//Masque
//Liste des markers masqués sur la cartographie
//gérer par layer
var dictLayersMarkers = {};


//Nbre d'element par page
var nbrElementsPage = 4000;

//Drag and drop label
var eventDrag = false;
var initEventPosition;
var centerWidth;
var centerHeight;

var dictfeatureOverlayLabel = {}; //Dictionnaire des couches overlay
var dictfeatureVectorTrajectoire = {}; //Dictionnaire des couches trajectoire 


//->Map
var ol2d;
var contextmenu;

var FenetreResultatSelection;


