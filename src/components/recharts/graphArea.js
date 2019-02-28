import React from "react";
import PropTypes from 'prop-types';

import { ResponsiveContainer, AreaChart  , Area , XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class GraphArea extends React.Component {
    static defaultProps = {        
        height:400,     
        fillOpacity: 1,
        stroke: "#82ca9d",
        isAnimationActive: false,     
    }

    constructor(props) {
        super(props);        
    } 

    render(){        
        const {height, isAnimationActive, fillOpacity, stroke} = this.props;
        return(
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart  data={this.props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"  isAnimationActive={isAnimationActive}/>                
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}

export default GraphArea;