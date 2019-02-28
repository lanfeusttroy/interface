import React from "react";
import PropTypes from 'prop-types';

import { ResponsiveContainer , LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class GraphLine extends React.Component {
    static defaultProps = {        
        height:400, 
        type: "monotone",    
        stroke: "#82ca9d",
        isAnimationActive: false,          
    }

    constructor(props) {
        super(props);        
    } 

    render(){
        
        const {width, height, isAnimationActive, type, stroke} = this.props;
        return(
            <ResponsiveContainer width="100%" height={height}>           
                <LineChart  data={this.props.data} >
                    <Line type="monotone" dataKey="pv" stroke={stroke}  isAnimationActive={isAnimationActive}/>
                    
                    <CartesianGrid stroke={stroke} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default GraphLine;