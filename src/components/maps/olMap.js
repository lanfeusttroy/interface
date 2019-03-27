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
import OlPopup from 'components/maps/olPopup';

//styles ol
import styleGeojson  from "components/maps/styles";

import 'ol/ol.css';
 

const layers =[
    {'layer':'ne1', 'name': 'ne1', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}},
	  {'layer':'ne2', 'name': 'ne2', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}}
];


class OlMap extends React.Component{
    constructor(props){
        super(props);

        this.state = {           
            SnackbarOpen:false,
            OlPopupOpen:false,
            message:'Chargement de la carte position.', 
            messageOlPopup:''         
        };


        this.ol4 = React.createRef();
        this.popup = React.createRef();
        this.map = null;

        this.overlayPopup=null;
    }

    componentDidMount() {   
     
      //map
      this.map = new Map({
          controls: defaultControls().extend([
          ]),			
          target: this.ol4.current,
          view: new View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 3,
            minZoom:2
          }),
          

      });

      //popup
      const container = this.popup.current;     
      
      this.overlayPopup = new Overlay({
          element:container,
          stopEvent:true,
          autoPan: true
      });     

      this.map.addOverlay(this.overlayPopup);

        
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

  handleMap=(evt)=>{
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));

          
      this.setState({
          OlPopupOpen:true,
          messageOlPopup:hdms
      });

      
     this.overlayPopup.setPosition(coordinate);
  }

  handleCloseSnackbar=()=>{      
      this.setState({	            
          SnackbarOpen:false,	           
      })
  }

  handleCloseOlPopup=(ev)=>{   
    
     this.setState({	            
        OlPopupOpen:false,	           
    })   
    
  }

  
  
  render(){
      const {color} = this.props;

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

            <OlPopup
              color={color}
              refPopup={this.popup}
              open={this.state.OlPopupOpen}   
              close={this.handleCloseOlPopup}           
              message={<span>{this.state.messageOlPopup}</span>}
            />

                        

            <div ref={this.ol4} style={{ "width":  "100%"}} ></div>   
          </div>
                    
      )
  }
}

export default OlMap;