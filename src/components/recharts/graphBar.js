import React from "react";
import PropTypes from 'prop-types';

import { ResponsiveContainer, BarChart , Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class GraphBar extends React.Component {
    static defaultProps = {         
        height:400,     
        fill: "#82ca9d",
        isAnimationActive: false,     
    }

    constructor(props) {
        super(props);        
    } 

    render(){        
        const {isAnimationActive, height} = this.props;
        return(
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={this.props.data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" isAnimationActive={isAnimationActive} />                
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default GraphBar;