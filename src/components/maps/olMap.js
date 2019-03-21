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
            message:'Chargement de la carte position.',          
        };


        this.ol4 = React.createRef();
        this.popup = React.createRef();
        this.map = null;
    }

    componentDidMount() {
      
      //overlay
      //popup
      //var container = document.getElementById('popup');
      
      /*
      const container = this.popup.current;     
      
      let overlayPopup = new Overlay({
          element:container,
          autoPan: true
      });
      */
     
      
     
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
      
      /*
      this.map.on('singleclick', function(evt) {
        let coordinate = evt.coordinate;
        let hdms = toStringHDMS(toLonLat(coordinate));

        console.log(hdms);

              
        //overlayPopup.setPosition(coordinate);
      });
      */
      
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

      const container = this.popup.current;     
      
      let overlayPopup = new Overlay({
          element:container,
          autoPan: true
      });

      this.map.addOverlay(overlayPopup);
      overlayPopup.setPosition(coordinate);

  }

  handleCloseSnackbar=()=>{
      this.setState({	            
          SnackbarOpen:false,	           
      })
  }

  
  
  render(){
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

            <div ref={this.popup}>exemple</div>

            <div ref={this.ol4} style={{ "width":  "100%"}} />	     
          </div>
                    
      )
  }
}

export default OlMap;