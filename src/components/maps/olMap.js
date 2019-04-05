import React from "react";

import axios from 'axios';

//ol
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import TileWMS from 'ol/source/TileWMS.js';
import { Vector as VectorSource} from 'ol/source.js';
import Overlay from 'ol/Overlay.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {toLonLat} from 'ol/proj.js';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

//components

//popup
import Maker from "components/maps/popups/maker";


//styles ol
import styleGeojson  from "components/maps/styles";
import 'ol/ol.css';
 
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
            message:'Chargement de la carte position.', 
            olPopupObj:null         
        };


        //Creation des references
        this.refOl4 = React.createRef();
        this.refPopup = React.createRef();        
        this.refOlMenuContextuel = React.createRef();


        this.map = null;

        this.overlayPopup = null;
        this.overlayMenuContextuel = null;
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

      //overlay popup 
      this.overlayPopup = new Overlay({
          element:this.refPopup.current,
          stopEvent:true,
          autoPan: true
      }); 
      this.map.addOverlay(this.overlayPopup);

      //overlay menu contextuel

      this.overlayMenuContextuel = new Overlay({
          element:this.refOlMenuContextuel.current,
          stopEvent:true,
          autoPan: true
      }); 
      this.map.addOverlay(this.overlayMenuContextuel);
      
        
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


  }

  /* Gestion de l'envent click sur la map 
  *  Popup
  */

  handleMap=(evt)=>{
      const coordinate = evt.coordinate;

     
      

      this.overlayPopup.setPosition(undefined);
      this.setState({	            
          olPopupObj:null,	           
      })   

      let feature = this.map.forEachFeatureAtPixel(evt.pixel,
                              function(feature, layer) {
                                return feature;
                              }
                      );	

      if (feature) {
          const objProperties = feature.getProperties();

          this.setState({
              OlPopupOpen:true,
              olPopupObj:objProperties
          });

        
          this.overlayPopup.setPosition(coordinate);
      }

      //const hdms = toStringHDMS(toLonLat(coordinate));         
     
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
  

  handleCloseOlPopup=(ev)=>{  
    
    this.overlayPopup.setPosition(undefined);
    this.setState({	            
        olPopupObj:null,	           
    })   
    
  }

  createMenuContextuel(){
    console.log('ok');
  }

  createPopup(){
    const{olPopupObj} = this.state;
    if(olPopupObj !== null){
      switch(olPopupObj.type){
          case "marker":
              return (
                  <Maker                    
                      olPopup = {olPopupObj}
                      onClose ={this.handleCloseOlPopup}
                      picture={true}
                      small={false}
                  />
              )
          
          default:
              return (
                <div></div>
              )
          
      }
    }
  }
  
  
  render(){      
      const {classes} = this.props;
      const{olPopupOpen} = this.state;

      

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
            <div ref={this.refOl4} style={{ "width":  "100%"}} ></div>   

            {/*Container popup */}
            <div ref={this.refPopup} className={'ol-popup ' + classes.popup + ' ' } onMouseUp={this.convertToClick} >
                {this.createPopup()}
            </div>

             {/*Container menucontextuel */}
            <div ref={this.refOlMenuContextuel} className={'ol-popup ' + classes.popup + ' ' } onMouseUp={this.convertToClick} >
              {this.createMenuContextuel()}
            </div>

          </div>
                    
      )
  }
}

export default withStyles(olMapStyle)(OlMap);