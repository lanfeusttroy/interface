var colorTypeOTAN = {
	"TMO":"rgba(152,213,145,0.8)",
	"TME":"rgba(0,128,255,0.8)",
	"TMOL":"rgba(0,255,255,0.8)",
	"TMOT":"rgba(255,255,0,0.8)",
	"TMK":"rgba(255,191,0,0.8)"
};

/*
* Style pour l'affichage des contacts sur la cartographie
*
*/

//->Mode affichage Pavillons
var styleCachePavillon = {};
function stylePavillon(feature, resolution){
	var undefined;		
	var nation = feature.get('NATION');
	var typeNavire = feature.get('typeInformation');
		
				
	if(nation != "-" && nation != "" && typeNavire != "-" && typeNavire != "" && typeNavire!= undefined && nation != undefined){	
		
			if(!styleCachePavillon[typeNavire + '-' + nation]){			
				styleCachePavillon[typeNavire + '-' + nation]=[			
					new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/tetris/' + typeNavire + '-' + nation + '.png'
							
						})
					})
				];			
			}
		
	}else{		
		
		if(!styleCachePavillon[typeNavire + '-' + nation]){
			styleCachePavillon[typeNavire + '-' + nation]=[			
				new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/epingle.png'
						})
					})
			];
		}
		
	}
		
	return styleCachePavillon[typeNavire + '-' + nation];
}


//->Mode affichage Pavillons + Label
function stylePavillonLabel(feature, resolution){
	var undefined;		
	var nation = feature.get('NATION');
	var typeNavire = feature.get('typeInformation');
	var nom = feature.get('NOM');
	var typeOTAN = feature.get('TYPEOTAN');
	var date = feature.get('DATE');
	var lon = feature.get('LON').toFixed(2);
	var lat = feature.get('LAT').toFixed(2);
				
	if(nation != "-" && nation != "" && typeNavire != "-" && typeNavire != "" && typeNavire!= undefined && nation != undefined){	
		
		
		var style = new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/tetris/' + typeNavire + '-' + nation + '.png'
						}),
						text: new ol.style.Text({
							textAlign: 'center',
							textBaseLine: 'Bottom',
							font: 'Normal 12px Arial',
											
							text: date + "\n" + nom + " " + nation + " - " + typeOTAN ,
							fill: new ol.style.Fill({
											color:'#fff'
										}),
							stroke: new ol.style.Stroke({
										color: 'rgba(0, 0, 0, 0.6)',
										width: 4
									}),
							
							offsetX: 0,
							offsetY: 20,
							rotation: 0
						})
					});	
				
				
		
	}else{
		var style = new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/epingle.png'
						}),
						text: new ol.style.Text({
							textAlign: 'center',
							textBaseLine: 'Bottom',
							font: 'Normal 10px Arial',
											
							text: date + "\n" + nom + " " + nation + " - " + typeOTAN ,
							fill: new ol.style.Fill({
											color:'#FFFFFF'
										}),
							stroke: new ol.style.Stroke({
										color: 'rgba(0, 0, 0, 0.6)',
										width: 1
									}),
							
							offsetX: 0,
							offsetY: 20,
							rotation: 0
						})
					});
		
	}
		
	return style;
}


//->Mode affichage Point
var stylePoint = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [69, 175, 157, 0.4] //#45B29D
        }),
        stroke: new ol.style.Stroke({
            color: [0, 75, 82, 0.75], //#004B52
            width: 1.5					
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [60, 255, 100, 0.4]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 0.75],
                width: 1.5
            })
        }),
        zIndex: 100000
    });
	
	
//->Mode affichage Routes

var colorPavillon ={
	"FR":"rgba(255,191,0,0.8)",
	"NO":"rgba(0,128,255,0.8)",
	"NL":"rgba(0,255,255,0.8)",
	"PA":"rgba(255,255,0,0.8)",
	"RU":"rgba(0,255,0,0.8)",
	"MT":"rgba(108,2,119,0.8)",
	"BF":"rgba(4,139,154,0.8)",
	"PT":"rgba(176,242,182,0.8)",
	"GI":"rgba(210,202,136,0.8)",	
	"AG":"rgba(211,84,0,0.8)",
	"CY":"rgba(52,73,94,0.8)",
	"BM":"rgba(118,215,196,0.8)",
	
	"BE":"rgba(159,50,38,0.8)",	
	"CK":"rgba(213,245,227,0.8)",
	"GB":"rgba(232,218,239,0.8)",
	"US":"rgba(146,43,33,0.8)"
	
};

function styleRTE(feature, resolution){
	var undefined;	
	var nation = feature.get('NATION');
	var rte = feature.get('RTE');	
	var typeNavire = feature.get('typeInformation');
	
	var color = '#02D51F';
	if(nation != "-" && nation != ""  && nation != undefined){
		if(colorPavillon[nation]){
			color = colorPavillon[nation];
		}
	}
		
		
	if(rte != -1){
			// if(nation != "-" && nation != ""  && nation != undefined){
				// var style = new ol.style.Style({				
					// image: new ol.style.Icon({
						// anchor:[20, 10],
						// anchorXUnits: 'pixel',
						// anchorYUnits: 'pixel',
						// opacity: 0.80,
						// src: '../img/iconeNavire/' + nation + '.png',
						// rotation: ((rte - 90) *Math.PI/180)
					// })
				// });
			
			// }else{
				// var style = new ol.style.Style({				
					// image: new ol.style.Icon({
						// anchor:[20, 10],
						// anchorXUnits: 'pixel',
						// anchorYUnits: 'pixel',
						// opacity: 0.80,
						// src: '../img/iconeNavire/navire.png',
						// rotation: ((rte - 90) *Math.PI/180)
					// })
				// });
			// }
		
			
			var style = new ol.style.Style({				
					image: new ol.style.Icon({
						color: color,
						
						
						src: '../img/navire.png',
						//rotation: ((rte - 90) * Math.PI/180)
						rotation: -(rte * 2 * Math.PI) / 360
					})
				});
		
	}else{
		color = '#000000';
		var style = new ol.style.Style({				
				image: new ol.style.Icon({
					color: color,					
					src: '../img/navire.png'					
				})
			});
		
		// if(nation != "-" && nation != ""  && nation != undefined){
			// var style = new ol.style.Style({				
						// image: new ol.style.Icon({
							// anchor:[20, 10],
							// anchorXUnits: 'pixel',
							// anchorYUnits: 'pixel',
							// opacity: 0.80,
							// src: '../img/tetris/' + typeNavire + '-' + nation + '.png'					
						// })
				// });
		// }else{
			// var style = new ol.style.Style({				
						// image: new ol.style.Icon({
							// anchor:[20, 10],
							// anchorXUnits: 'pixel',
							// anchorYUnits: 'pixel',
							// opacity: 0.80,
							// src: '../img/epingle.png'				
						// })
				// });
		// }
	}
	
		
	return style;
}


/*
* Style pour l'affichage des trajectoires sur la cartographie
*
*/

//->Classique line + point
function styleTrajectoireClassique(feature, resolution){
	var undefined;	
	var color = feature.get('COLOR');
	var nom = feature.get('nom');
	
	if(color == undefined)
		color = "#00ffff";
	
	if(nom == undefined)
		nom = "";
	
	var typeGeometry = feature.getGeometry().getType();
	
	
	
	var rgb = 'rgba(' + (hexToRGB(color)).join() + ',0.6)';
		
	var defaultStyle = {        
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 2,
			lineDash: [5,10]
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: rgb
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: rgb,
              width: 1
            })
          })
        })
      };
	  
	  
	return defaultStyle[typeGeometry];	
}

var colorCapteur ={	
	"IMDATE":"#02D50C",
	"TV32":"#02D5D5",
	"MICACENTER":"#CBD502",
	"SEAVISION":"#000000"	
};

//->Capteur
function styleTrajectoireCapteur(feature, resolution){
	var undefined;	
	var color = feature.get('COLOR');
	var texte = feature.get('DATE');
	var angle = feature.get('ANGLE');
	var capteur = feature.get('CAPTEUR');
	
	var rgbaColor = 'rgba(' + (hexToRGB("#FFFFFF")).join() + ',0.8)';
	
	if(	colorCapteur[capteur] ){
		rgbaColor = 'rgba(' + (hexToRGB(colorCapteur[capteur])).join() + ',0.8)';
	}
	
	//CAPTEUR
	//-> IMDATE -> VERT #02D50C
	//-> TV32 -> BLEU #02D5D5
	//-> MICACENTER -> JAUNE #CBD502
	//-> SEAVISION -> NOIR #000
	//-> AUTRES -> BLANC #FFF
	var orientation = "orientation.png";
	
	
	switch(capteur){
		case "IMDATE":
			orientation = "orientation_IMDATE.png";
		break;
		case "TV32":
			orientation = "orientation_TV32.png";
		break;
		case "MICACENTER":
			orientation = "orientation_MICACENTER.png";
		break;
		
		case "SEAVISION":
			orientation = "orientation_SEAVISION.png";
		break;
		
	}
	
	
	var typePoint = feature.get('TYPEPOINT');
	var typeGeometry = feature.getGeometry().getType();
	
	
	
		if(typeGeometry == "Point"){
			var marker;
			var symboleImage;
			
			switch(typePoint){
				case 0:
					if(angle != -1){
						marker = orientation;
						symboleImage = new ol.style.Icon({
								
								opacity: 0.75,
								src: '../img/orientation.png',
								color: rgbaColor,
								rotation: angle
							});
					}					
					
				break;
				case 1:
					//DEBUT
					symboleImage = new ol.style.Circle({
								radius:10,
								stroke: new ol.style.Stroke({
									color: '#06B700',
									width: 1
								}),
								fill: new ol.style.Fill({
									color: [5, 119, 1, .7]
								})
							});
					
				break;
				case 2:
					//FIN
					symboleImage = new ol.style.Circle({
								radius:10,
								stroke: new ol.style.Stroke({
									color: '#b30734',
									width: 1
								}),
								fill: new ol.style.Fill({
									color: [51, 51, 51, .7]
								})
							});
				break;
			}
		}
	
	
	
	
	var style = 
			new ol.style.Style({
				fill: new ol.style.Fill({
					color: color
				}),
				stroke: new ol.style.Stroke({
					color: color,
					lineDash:[5, 10],
					width: 2
				}),			
				image: symboleImage
				
			});		
	
	
	return style;	
}

//->Orientation
function styleTrajectoireOrientation(feature, resolution){
	var undefined;	
	var color = feature.get('COLOR');
	var texte = feature.get('DATE');
	var angle = feature.get('ANGLE');
	var capteur = feature.get('CAPTEUR');
	
	
	
	var rgbaColor = 'rgba(' + (hexToRGB("#FFFFFF")).join() + ',0.8)';
	
	if(	color ){
		rgbaColor = 'rgba(' + (hexToRGB(color)).join() + ',0.8)';
	}
	
	
	
	var orientation = "orientation.png";
		
	
	var typePoint = feature.get('TYPEPOINT');
	var typeGeometry = feature.getGeometry().getType();	
	
	if(typeGeometry == "Point"){
		var marker;
		var symboleImage;
		
		console.log(color);
		
		switch(typePoint){
			case 0:
				if(angle != -1){
					marker = orientation;
					symboleImage = new ol.style.Icon({
							
							opacity: 0.75,
							src: '../img/orientation.png',
							color: rgbaColor,
							rotation: angle
						});
				}					
				
			break;
			case 1:
				//DEBUT
				symboleImage = new ol.style.Circle({
							radius:3,
							stroke: new ol.style.Stroke({
								color: '#b30734',
								width: 3
							}),
							fill: new ol.style.Fill({
								color: [179, 7, 52, .7]
							})
						});
				
			break;
			case 2:
				//FIN
				symboleImage = new ol.style.Circle({
							radius:3,
							stroke: new ol.style.Stroke({
								color: '#b30734',
								width: 3
							}),
							fill: new ol.style.Fill({
								color: [179, 7, 52, .7]
							})
						});
			break;
		}
	}
	
	
	
	
	var style = 
			new ol.style.Style({
				fill: new ol.style.Fill({
					color: color
				}),
				stroke: new ol.style.Stroke({
					color: color,
					lineDash:[5, 10],
					width: 2
				}),			
				image: symboleImage
				
			});		
	
	
	return style;	
}


//->Orientation + Texte
function styleTrajectoireOrientationDateTime(feature, resolution){
	var undefined;	
	var color = feature.get('COLOR');
	var texte = feature.get('DATE');
	var angle = feature.get('ANGLE');
	
	var typePoint = feature.get('TYPEPOINT');
	var typeGeometry = feature.getGeometry().getType();
	
	
	
		if(typeGeometry == "Point"){
			var marker;
			var symboleImage;
			
			switch(typePoint){
				case 0:
					if(angle != -1){
						marker = "orientation.png";
						symboleImage = new ol.style.Icon({
								
								opacity: 0.75,
								src: '../img/' + marker,
								rotation: angle
							});
					}					
					
				break;
				case 1:
					//DEBUT
					symboleImage = new ol.style.Circle({
								radius:10,
								stroke: new ol.style.Stroke({
									color: '#06B700',
									width: 1
								}),
								fill: new ol.style.Fill({
									color: [5, 119, 1, .7]
								})
							});
					
				break;
				case 2:
					//FIN
					symboleImage = new ol.style.Circle({
								radius:10,
								stroke: new ol.style.Stroke({
									color: '#b30734',
									width: 1
								}),
								fill: new ol.style.Fill({
									color: [51, 51, 51, .7]
								})
							});
				break;
			}
		}
	
	
	
	
	var style = 
			new ol.style.Style({
				fill: new ol.style.Fill({
					color: color
				}),
				stroke: new ol.style.Stroke({
					color: color,
					lineDash:[5, 10],
					width: 2
				}),			
				image: symboleImage,
				text: new ol.style.Text({
					textAlign: 'right',
					textBaseLine: 'Bottom',
					font: 'Arial',
					text: texte,
					fill: new ol.style.Fill({
									color:'#FFF'
								}),
					offsetX: 0,
					offsetY: 0,
					rotation: 30
				})
				
			});		
	
	
	return style;	
}


//->Orientation
function styleTrajectoireInformation(feature, resolution){
	var undefined;	
	var color = feature.get('COLOR');
	var texte = feature.get('DATE');
	var angle = feature.get('ANGLE');
	
	var typePoint = feature.get('TYPEPOINT');
	var typeGeometry = feature.getGeometry().getType();
	
	
	
	if(typeGeometry == "Point"){
		
		var symboleImage;
		
		symboleImage = new ol.style.Circle({
							radius:5,
							stroke: new ol.style.Stroke({
								color: '#06B700',
								width: 1
							}),
							fill: new ol.style.Fill({
								color: [5, 119, 1, .7]
							})
						});
		
		
	}
	
	
	
	var style = 
			new ol.style.Style({
				fill: new ol.style.Fill({
					color: color
				}),
				stroke: new ol.style.Stroke({
					color: color,
					lineDash:[5, 10],
					width: 2
				}),			
				image: symboleImage,
				text: new ol.style.Text({
					textAlign: 'right',
					textBaseLine: 'Bottom',
					font: 'Arial',
					text: texte,
					fill: new ol.style.Fill({
									color:'#FFF'
								}),
					offsetX: 0,
					offsetY: 0,
					rotation: -45
				})
			})
		;		
	
	
	return style;	
}




/*
* Style mode edition
*/

function styleAddLine(){
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [69, 175, 157, 0.4] //#45B29D
        }),
        stroke: new ol.style.Stroke({
            color: [255, 191, 0, 0.75], //#004B52
            width: 4,
			lineDash: [.1,5]
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [60, 255, 100, 0.4]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 0.75],
                width: 4,
				lineDash: [.1,5]
            })
        }),
        zIndex: 100000
    });

    return style;
};

/*
* Utilise par les outils de dessin
* OutilsForme
*/

function styleAdd(){
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [69, 175, 157, 0.4] //#45B29D
        }),
        stroke: new ol.style.Stroke({
            color: [0, 75, 82, 0.75], //#004B52
            width: 1.5					
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [60, 255, 100, 0.4]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 0.75],
                width: 1.5
            })
        }),
        zIndex: 100000
    });

    return style;
};


/*
* Style pour line entre le marker et les labels
*
*/
function styleLabel(feature, resolution){
		
	var typeGeometry = feature.getGeometry().getType();
	
	
	switch(typeGeometry){
		case "Polygon":
			var nation = feature.get("NATION");	
			var nom = feature.get("NOM");
			var otan = feature.get("OTAN");		
			var date = feature.get("DATE");
			
			var colorPolygon = "rgba(0,255,255,0.8)";
			
			if(colorTypeOTAN[otan]){
				console.log("color label");
				colorPolygon = colorTypeOTAN[otan];
			}
			
			var symbole = '../img/pavillons/' + nation + '.png';
		
			var style = new ol.style.Style({
				  fill: new ol.style.Fill({
					color: colorPolygon
				  }),
				  stroke: new ol.style.Stroke({
					color: '#fff',
					width: 1
				  }),
				  image: new ol.style.Icon({								
								src: symbole								
				  }),
				  text: new ol.style.Text({					
					font: 'Normal 9px Arial',				
					text: nation + '-' + otan + '\n' + nom + '\n' + date,
					fill: new ol.style.Fill({
									color:'#000'
								})	
					
				  })
				});
		
		break;
		
		
		case "LineString":
			var style = new ol.style.Style({
				  fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				  }),
				  stroke: new ol.style.Stroke({
					color: 'rgba(239, 164, 14, 0.5)',
					lineDash: [10, 10],
					width: 2
				  }),
				  image: new ol.style.Circle({
					radius: 5,
					stroke: new ol.style.Stroke({
					  color: 'rgba(239, 164, 14, 0.7)'
					}),
					fill: new ol.style.Fill({
					  color: 'rgba(255, 255, 255, 0.2)'
					})
				  })
				});
		break;
		
		
	}
	

    return style;
}

/*
* Style pour les formes
*/

function styleForme(){
	var style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(119, 140, 232, 0.5)'
      }),
      stroke: new ol.style.Stroke({
       color: 'rgba(239, 164, 14, 0.7)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(21, 43, 142, 0.8)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    });

    return style;
}






/*style hidden*/
function styleLabelHidden(){
	var style = new ol.style.Style({
    });

    return style;
}



// Style for the clusters
var styleCache = {};
function getStyle (feature, resolution)
{	
	
	//console.log(resolution);
	var size = feature.get('features').length;
	var style = styleCache[size];
	
	if (!style)
	{	
		
		if(size > 1){
			var color = size>25 ? "192,0,0" : size>8 ? "255,128,0" : "0,128,0";
			var radius = Math.max(8, Math.min(size*0.75, 20));
			var dash = 2*Math.PI*radius/6;
			var dash = [ 0, dash, dash, dash, dash, dash, dash ];
			style = styleCache[size] = [ new ol.style.Style(
				{	
					image: new ol.style.Circle(
					{	radius: radius,
						stroke: new ol.style.Stroke(
						{	color:"rgba("+color+",0.5)", 
							width:15 ,
							lineDash: dash
						}),
						fill: new ol.style.Fill(
						{	color:"rgba("+color+",1)"
						})
					}),
					text: new ol.style.Text(
					{	text: size.toString(),
						fill: new ol.style.Fill(
						{	color: '#fff'
						})
					})
				})
			];
		}else{
			
			
			var nation = feature.get('features')[0].get('NATION');
			var typeNavire = feature.get('features')[0].get('typeInformation');
			//var liste = feature.get('features')[0].get('liste');
			var symbole = '../img/tetris/' + typeNavire +  '-' + nation + '.png';
			var nbrListe = 0;
			
			
			
			
			style =  styleCache[typeNavire +  '-' + nation] = new ol.style.Style(
				{	
					image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: symbole
					})
					
				});
			
		}
	}
	return style;
}

var styleEdition = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [69, 175, 157, 0.4] //#45B29D
        }),
        stroke: new ol.style.Stroke({
            color: [0, 75, 82, 0.75], //#004B52
            width: 1.5					
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [60, 255, 100, 0.4]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 0.75],
                width: 1.5
            })
        }),
        zIndex: 100000
    });

	
//Affiche un cercle pour mettre en avant le marker selectionné
var styleSelect = new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(255, 255, 255, 0.2)'
					}),
					stroke: new ol.style.Stroke({
						color: '#E91D1D',
						width: 2
					}),
					image: new ol.style.Circle({
						radius: 6,
						fill: new ol.style.Fill({
							color: '#0489B1'
						}),
						stroke: new ol.style.Stroke({
							color: '#000',
							width: 2
						})
					})
				});
			


var defaultStyle = {
        'Point': new ol.style.Style({
          image: new ol.style.Icon({
						anchor:[0, 38],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixel',
						opacity: 0.80,
						src: '../img/epingle.png'
					})
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(0,255,255,0.5)',
            width: 2
          })
        }),
        'Polygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,255,255,0.8)'
          }),
          stroke: new ol.style.Stroke({
            color: '#0ff',
            width: 1
          })
        }),
		'Circle': new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,255,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#0ff',
            width: 1
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,0,255,0.5)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 1
            })
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        }),
        'MultiPolygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,0,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#00f',
            width: 1
          })
        })
      };

 var styleFunction = function(feature, resolution) {
	
	var featureStyleFunction = feature.getStyleFunction();
	
		
	if (featureStyleFunction) {
		return featureStyleFunction.call(feature, resolution);
	} else {
		
		return defaultStyle[feature.getGeometry().getType()];
	}
};



/*
function styleTravail(feature, resolution){
	var undefined;	
	
	if(feature.get('color') != undefined)
		color = feature.get('color');
	
	
	var nom = feature.get('nom');
	
	if(color == undefined)
		color = "#00ffff";
	
	if(nom == undefined)
		nom = "";
	
	var typeGeometry = feature.getGeometry().getType();
	
	var rgb = 'rgba(' + (hexToRGB(color)).join() + ',0.6)';
		
	var defaultStyle = {
        'Point': new ol.style.Style({
          image: new ol.style.Icon({
						anchor:[0, 38],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixel',
						opacity: 0.80,
						src: '../img/epingle.png'
		  }),
		  text: new ol.style.Text({
			textAlign: 'center',
			textBaseLine: 'Bottom',
			font: 'Normal 14px Arial',				
			text: nom,
			fill: new ol.style.Fill({
							color:'#000'
						}),
			stroke: new ol.style.Stroke({
						color: 'rgba(255, 255, 255, 0.6)',
						width: 4
					}),
			
			offsetX: 0,
			offsetY: 20,
			rotation: 0
		  })
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 2,
			lineDash: [.1,5]
          }),
		  text: new ol.style.Text({
			textAlign: 'center',
			textBaseLine: 'Bottom',
			font: 'Normal 14px Arial',				
			text: nom,
			fill: new ol.style.Fill({
							color:'#000'
						}),
			stroke: new ol.style.Stroke({
						color: 'rgba(255, 255, 255, 0.6)',
						width: 4
					}),
			offsetX: 15,
			offsetY: 15,
			rotation: 0
		  })
        }),
        'Polygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: rgb
          }),
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 1
          }),
		  text: new ol.style.Text({
			textAlign: 'center',
			textBaseLine: 'Bottom',
			font: 'Normal 11px Arial',				
			text: nom,
			fill: new ol.style.Fill({
							color:'#fff'
						}),			
			
			offsetX: 0,
			offsetY: 5,
			rotation: 0
		  })
        }),
		'Circle': new ol.style.Style({
          fill: new ol.style.Fill({
            color: rgb
          }),
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 1
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: rgb
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: rgb,
              width: 1
            })
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 3,
			lineDash: [.1,5]
          })
        }),
        'MultiPolygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: rgb
          }),
          stroke: new ol.style.Stroke({
            color: rgb,
            width: 1
          })
        })
      };
	  
	  
	return defaultStyle[typeGeometry];	
}

*/

/*
* Style pour les formes avec pattern 
* OL3-ext
*/

function styleTravail(feature, resolution){	
	var undefined;	
	
	var bgcolor = "#00ffff";
	if(feature.get('bgcolor') != undefined)
		bgcolor = feature.get('bgcolor');
		
	
	var color = "#00ffff";
	
	
	if(feature.get('color') != undefined)
		color = feature.get('color');
		


	
	
	
	
	var pattern = "";
	if(feature.get('texture') != undefined)
		pattern = feature.get('texture');
	
	var patterncolor = "";
	if(feature.get('texturecolor') != undefined)
		patterncolor = feature.get('texturecolor');
	
	var scale = "";
	if(feature.get('scale') != undefined)
		scale = feature.get('scale');
	
	
		
	var nom = "";
	if(feature.get('nom') != undefined)
		nom = feature.get('nom');
	
	var pictogramme = "../img/pictogramme/inconnu.png";
	// if(feature.get('pictogramme') != undefined)
		// pictogramme = '../img/pictogramme/' + feature.get('pictogramme') + '.png';
	
		
	var rgbaColor = 'rgba(' + (hexToRGB(color)).join() + ',0.6)';
	var rgbaBgcolor = 'rgba(' + (hexToRGB(bgcolor)).join() + ',0.6)';	
	
	var rgbaPatterncolor = 'rgba(' + (hexToRGB(patterncolor)).join() + ',1)';
	
	var typeGeometry = feature.getGeometry().getType();
	
	console.log(pictogramme);
	
	
	
	if(pattern != ""){
	
		var defaultStyle = {
			'Point': new ol.style.Style({
			  image: new ol.style.Icon({							
							
							color: rgbaColor,
							src: pictogramme
			  }),
			  text: new ol.style.Text({
				textAlign: 'center',
				textBaseLine: 'Bottom',
				font: 'Normal 10px Arial',				
				text: nom,
				fill: new ol.style.Fill({
								color: color
							}),
				
				offsetX: 0,
				offsetY: 30,
				rotation: 0
			  })
			}),
			
			'LineString': new ol.style.Style({
			  stroke: new ol.style.Stroke({
				color: bgcolor,
				width: 2,
				lineDash: [.1,5]
			  }),
			  text: new ol.style.Text({
				textAlign: 'center',
				textBaseLine: 'Bottom',
				font: 'Normal 14px Arial',				
				text: nom,
				fill: new ol.style.Fill({
								color: color
							}),			
				offsetX: 15,
				offsetY: 15,
				rotation: 0
			  })
			}),
			
			'Polygon': new ol.style.Style({
				fill: new ol.style.FillPattern(
					{	pattern: (pattern!='Image (PNG)') ? pattern : undefined,
						image: (pattern=='Image (PNG)') ? new ol.style.Icon({ src : 'data/pattern.png' }) : undefined,
						ratio: 1,
						icon: pattern=='Image (PNG)' ? new ol.style.Icon ({src:'data/target.png'}) : undefined,
						color: rgbaPatterncolor,
						// offset: Number($("#offset").val()),
						// scale: Number($("#scale").val()),
						fill: new ol.style.Fill ({ color: rgbaBgcolor }),
						// size: Number($("#size").val()),
						// spacing: Number($("#spacing").val()),
						// angle: Number($("#angle").val())
					}			
				),
				text: new ol.style.Text({
					textAlign: 'center',
					textBaseLine: 'Bottom',
					font: 'Bold 18px Arial',				
					text: nom,
					fill: new ol.style.Fill({
									color: color
								}),	
					stroke: new ol.style.Stroke({
							color: rgbaBgcolor,
							width: 8
						}),
					offsetX: 0,
					offsetY: 0,
					rotation: 0
				})
				
			})
		};
	}else{
		var defaultStyle = {
			'Point': new ol.style.Style({
			  image: new ol.style.Icon({
							
							color: rgbaColor,
							src: pictogramme
			  }),
			  text: new ol.style.Text({
				textAlign: 'center',
				textBaseLine: 'Bottom',
				font: 'Normal 10px Arial',				
				text: nom,
				fill: new ol.style.Fill({
								color: color
							}),
				
				offsetX: 0,
				offsetY: 30,
				rotation: 0
			  })
			}),
			
			'LineString': new ol.style.Style({
			  stroke: new ol.style.Stroke({
				color: bgcolor,
				width: 2,
				lineDash: [.1,5]
			  }),
			  text: new ol.style.Text({
				textAlign: 'center',
				textBaseLine: 'Bottom',
				font: 'Normal 14px Arial',				
				text: nom,
				fill: new ol.style.Fill({
								color: color
							}),			
				offsetX: 15,
				offsetY: 15,
				rotation: 0
			  })
			}),
			
			'Polygon': new ol.style.Style({
			  fill: new ol.style.Fill({
				color: rgbaBgcolor
			  }),
			  stroke: new ol.style.Stroke({
				color: rgbaBgcolor,
				width: 1
			  }),
			  text: new ol.style.Text({
					textAlign: 'center',
					textBaseLine: 'Bottom',
					font: 'Bold 18px Arial',				
					text: nom,
					fill: new ol.style.Fill({
									color: color
								}),	
					stroke: new ol.style.Stroke({
							color: rgbaBgcolor,
							width: 8
						}),
					offsetX: 0,
					offsetY: 0,
					rotation: 0
				})
			})
		};
		
	}
	
	return defaultStyle[typeGeometry];	
	
	
}

function hexToRGB(hex){
	
	var hex = hex.replace('#','');
	
	var r = parseInt(hex.substring(0,2),16);
	var g = parseInt(hex.substring(2,4),16);
	var b = parseInt(hex.substring(4,6),16);
	
	return [r, g, b];
}



function stylePoint(feature, resolution){	
				
	var style = new ol.style.Style({				
						image: new ol.style.Circle({
							radius:3,
							fill: new ol.style.Fill({
								color: '#ffcc33'
							})
						})
					});	
	
	return style;
}


function stylePointLabel(feature, resolution){	
	var nom = feature.get('NOM');
	var nation = feature.get('NATION');
	var typeOTAN = feature.get('TYPEOTAN');
	var date = feature.get('DATE');
	var lon = feature.get('LON').toFixed(2);
	var lat = feature.get('LAT').toFixed(2);
				
	var style = new ol.style.Style({				
						image: new ol.style.Circle({
							radius:4,
							fill: new ol.style.Fill({
								color: '#ffcc33'
							})
						}),
						text: new ol.style.Text({
							textAlign: 'center',
							textBaseLine: 'Bottom',
							font: 'Normal 12px Arial',
											
							text: date + "\n" + nom + " " + nation + " " + typeOTAN + "\n" + lon + " " + lat,
							fill: new ol.style.Fill({
											color:'#000'
										}),
							stroke: new ol.style.Stroke({
										color: 'rgba(255, 255, 255, 0.6)',
										width: 4
									}),
							
							offsetX: 0,
							offsetY: 35,
							rotation: 0
						})
					});	
	
	return style;
}


var styleCacheMarker = {};
function styleMarker(feature, resolution){
	var undefined;		
	var nation = feature.get('NATION');
	var typeNavire = feature.get('typeInformation');
		
				
	if(nation != "-" && nation != "" && typeNavire != "-" && typeNavire != "" && typeNavire!= undefined && nation != undefined){	
		
			if(!styleCacheMarker[typeNavire + '-' + nation]){			
				styleCacheMarker[typeNavire + '-' + nation]=[			
					new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/tetris/' + typeNavire + '-' + nation + '.png'
							
						})
					})
				];			
			}
		
	}else{		
		
		if(!styleCacheMarker[typeNavire + '-' + nation]){
			styleCacheMarker[typeNavire + '-' + nation]=[			
				new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/epingle.png'
						})
					})
			];
		}
		
	}
		
	return styleCacheMarker[typeNavire + '-' + nation];
}


var styleCacheMarkerRTE = {};
function styleMarkerRTE(feature, resolution){
	var undefined;	
	var nation = feature.get('NATION');
	var rte = feature.get('RTE');	
	
	if(nation != "-" && nation != "" && nation != undefined){
		if(!styleCacheMarkerRTE[nation + "-" + rte]){
			styleCacheMarkerRTE[nation + "-" + rte] = new ol.style.Style({				
				image: new ol.style.Icon({
					anchor:[20, 10],
					anchorXUnits: 'pixel',
					anchorYUnits: 'pixel',
					opacity: 0.80,
					src: '../img/iconeNavire/' + nation + '.png',
					rotation: ((rte - 90) *Math.PI/180)
				})
			});
		}
	}else{
		if(!styleCacheMarkerRTE[nation + "-" + rte]){
			styleCacheMarkerRTE[nation + "-" + rte] = new ol.style.Style({				
				image: new ol.style.Icon({
					anchor:[20, 10],
					anchorXUnits: 'pixel',
					anchorYUnits: 'pixel',
					opacity: 0.80,
					src: '../img/iconeNavire/navire.png',
					rotation: ((rte - 90)*Math.PI/180)
				})
			});
		}
	}
		
	return styleCacheMarkerRTE[nation + "-" + rte];
}


//var styleCacheMarkerLabel = {};

function styleMarkerLabel(feature, resolution){
	var undefined;		
	var nation = feature.get('NATION');
	var typeNavire = feature.get('typeInformation');
	var nom = feature.get('NOM');
	var typeOTAN = feature.get('TYPEOTAN');
	var date = feature.get('DATE');
	var lon = feature.get('LON').toFixed(2);
	var lat = feature.get('LAT').toFixed(2);
				
	if(nation != "-" && nation != "" && typeNavire != "-" && typeNavire != "" && typeNavire!= undefined && nation != undefined){	
		
		
		var style = new ol.style.Style({				
						image: new ol.style.Icon({
							anchor:[0.5, 38],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixel',
							opacity: 0.80,
							src: '../img/tetris/' + typeNavire + '-' + nation + '.png'
						}),
						text: new ol.style.Text({
							textAlign: 'center',
							textBaseLine: 'Bottom',
							font: 'Normal 10px Arial',
											
							text: date + "\n" + nom + " " + nation + " - " + typeOTAN ,
							fill: new ol.style.Fill({
											color:'#000'
										}),
							stroke: new ol.style.Stroke({
										color: 'rgba(255, 255, 255, 1)',
										width: 3
									}),
							
							offsetX: 0,
							offsetY: 20,
							rotation: 0
						})
					});	
				
				
		
	}
		
	return style;
}



function styleTrajectoireLabel(feature, resolution){
	var undefined;
	var color = "#FF8000";
	var texte = feature.get('DATE');
	var angle = feature.get('ANGLE');	
	var marker = "";
	
	if(feature.get('TYPEPOINT') != undefined){
		var typePoint = feature.get('TYPEPOINT');
		var symboleImage;
		
		switch(typePoint){
			case 0:
				//marker = "orientation.png";
				symboleImage = new ol.style.Circle({
							radius:3,
							fill: new ol.style.Fill({
								color: '#F7FE2E'
							})
						});
			break;
			
			case 1:
				marker = "debut.png";
				angle = 0;
				
				symboleImage = new ol.style.Icon({
						anchor:[0.5,10],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixel',
						opacity: 0.75,
						src: '../img/' + marker,
						rotation: angle
					});
			break;
			
			case 2:
				marker = "fin.png";
				angle = 0;
				
				symboleImage = new ol.style.Icon({
						anchor:[0.5,10],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixel',
						opacity: 0.75,
						src: '../img/' + marker,
						rotation: angle
					});
			break;
		}
	}
	
	var style = [
			new ol.style.Style({
				fill: new ol.style.Fill({
					color: color
				}),
				stroke: new ol.style.Stroke({
					color: color,
					lineDash:[5, 10],
					width: 2
				}),			
				image: symboleImage/*,
				text: new ol.style.Text({
					textAlign: 'right',
					textBaseLine: 'Bottom',
					font: 'Arial',
					text: texte,
					fill: new ol.style.Fill({
									color:'#FFF'
								}),
					offsetX: 20,
					offsetY: 20,
					rotation: -45
				})*/
				
			})
		];		
	
	
	return style;
}


function test(feature, resolution){
	var styles = [
        /* We are using two different styles for the polygons:
         *  - The first style is for the polygons themselves.
         *  - The second style is to draw the vertices of the polygons.
         *    In a custom `geometry` function the vertices of a polygon are
         *    returned as `MultiPoint` geometry, which will be used to render
         *    the style.
         */
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        }),
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'orange'
            })
          }),
          geometry: function(feature) {
            // return the coordinates of the first ring of the polygon
            var coordinates = feature.getGeometry().getCoordinates()[0];
            return new ol.geom.MultiPoint(coordinates);
          }
        })
      ];
		return styles;
}

