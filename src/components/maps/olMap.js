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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';

//styles ol
import styleGeojson  from "components/maps/styles";

import 'ol/ol.css';
 

const layers =[
    {'layer':'ne1', 'name': 'ne1', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}},
	  {'layer':'ne2', 'name': 'ne2', 'url':'https://ahocevar.com/geoserver/wms', 'param':{'LAYERS':'ne:NE1_HR_LC_SR_W_DR', 'TILED':true}}
];


class OlMap extends React.Component{
    componentDidMount() {  
      
      
		  
      this.map = new Map({
          controls: defaultControls().extend([
          ]),			
          target: this.refs.ol4,
          view: new View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
          })

      });

        
        
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

        }
      });


  }

  
  
  render(){
      return(            
          <div ref="ol4" style={{ "width":  "100%"}} />	               
      )
  }
}

export default OlMap;