import React from "react";
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';


import axios from 'axios';

//ol
import Map from 'ol/Map.js';
import View from 'ol/View.js';

import {Style, Stroke, Fill, Text} from 'ol/style.js';

import GeoJSON from 'ol/format/GeoJSON.js';


import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource} from 'ol/source.js';
import Overlay from 'ol/Overlay.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {toLonLat} from 'ol/proj.js';

//ol-ext
import Popup from 'ol-ext/overlay/Popup';
import Graticule from 'ol-ext/control/Graticule'


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import Utils from "./utils.js";

//styles ol
import styleGeojson  from "components/maps/styles";
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';

 
//styles
import olMapStyle from "assets/components/olMapStyle";
import 'assets/css/olPopup.css';


const layers =[
    {'layer':'ne1', 'name': 'ne1', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}},
	  {'layer':'ne2', 'name': 'ne2', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}}
];


class OlMap extends React.Component{
    constructor(props){
        super(props);

        this.state = {           
            SnackbarOpen:false,            
            message:'Chargement de la carte position.'
        };


        //Creation des references
        this.refOl4 = React.createRef();        
        this.map = null;

        this.overlayPopup = null;
        
    }

   

    componentDidMount() {   
      
     
      //map
      this.map = new Map({
          controls: defaultControls().extend([
          ]),			
          target: this.refOl4.current,
          view: new View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 3,
            minZoom:2
          }),
      });

      

     this.overlayPopup = new Popup ({	
        popupClass: "white", //"tooltips", "warning" "black" "default", "tips", "shadow",
        closeBox: true,       
        positioning: 'auto',
        autoPan: true,
        autoPanAnimation: { duration: 250 }
      });

      this.map.addOverlay(this.overlayPopup);

      let newLayer = new TileLayer({
        source: new OSM()
      })

      /*
      //layers  
      let newLayer = new TileLayer({
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {
              'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
              'TILED': true
            }
          })
        });
      */

      let layers = this.map.getLayers();
      layers.push(newLayer);

		
		  var scaleline = new ScaleLine({'units':'nautical'});
      this.map.addControl(scaleline);	

      this.map.on('singleclick', this.handleMap);

                       
      this.setState({	
          SnackbarOpen:true,            
      });
      
      axios.get('/api/positions/').then(response => {
        if (response.data) {

          let vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(response.data)
          });

          let styleFunction = function(feature) {            
            return styleGeojson[feature.getGeometry().getType()];
          };

          let vectorLayer = new VectorLayer({
              source: vectorSource,  
              style: styleFunction            
          });

          let layers = this.map.getLayers();
          layers.push(vectorLayer);

          this.setState({	
              SnackbarOpen:false,            
          });

        }
      });

      //ajout graticule
      let graticule_4326  =  new Graticule({ step: 0.1, stepCoord: 5, margin:5, projection: 'EPSG:4326', formatCoord:function(c){ return c.toFixed(1)+"°" } });
     
      let style = new Style();
      
      style.setStroke (new Stroke({ color:'#fff', width:1 }));
      

      style.setFill (new Fill({ color: "#000" }));
      style.setText (new Text(
        {	stroke: new Stroke({ color:"#fff", width:2 }),
          fill: new Fill({ color:"#123456" }),
        })
      );
      
      graticule_4326.setStyle(style);
      
      this.map.addControl(graticule_4326);
      
  }

  
  handleMap=(evt)=>{
      const coordinate = evt.coordinate;

      
      let feature = this.map.forEachFeatureAtPixel(evt.pixel,
                              function(feature, layer) {
                                return feature;
                              }
                      );	
      
                      
      if (feature) {
          
          const objProperties = feature.getProperties();
          let id_bdd = objProperties["id_bdd"];

          /*Recherche des informations en base de données*/
          axios.get('/navire/bdd/' + id_bdd ).then(response => {
            if (response.data) {
              const action = { type: "CHANGE_NAVIRE", ficheNavire: response.data };
              this.props.dispatch(action);

              //creation du popup
              ReactDOMServer.renderToStaticMarkup(
                Utils.createPopup(this.overlayPopup, coordinate, objProperties)
              );
            }
          });

      }        
     
  }
  
  handleCloseSnackbar=()=>{      
      this.setState({	            
          SnackbarOpen:false,	           
      })
  }

  /*permet de contourner la gestion des events pour la classe overlay de openlayer*/  
  convertToClick = e => {        
      const evt = new MouseEvent('click', { bubbles: true });
      evt.stopPropagation = () => {};
      e.target.dispatchEvent(evt);
  }
  
  handleClick = e => {          
      console.log('ok');
  }

  render(){      
      const {classes} = this.props;
      

      

      return(    
          <div>
             
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.SnackbarOpen}
              //autoHideDuration={3000}
              onClose={this.handleCloseSnackbar}
              message={<span>{this.state.message}</span>}                    
            />
      
                        
            {/*Container map */}
            <div ref={this.refOl4} style={{ "width":  "100%"}} >
            
            </div>   

            
          </div>
                    
      )
  }
}

const mapStateToProps = (state) => {
  return {          
          ficheNavire : state.storeNavire.ficheNavire
  }
}

export default connect(mapStateToProps)(withStyles(olMapStyle)(OlMap));
