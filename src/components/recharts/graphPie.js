import React from "react";
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart , Pie, Cell } from 'recharts';

class GraphPie extends React.Component {
    static defaultProps = {        
        height:400, 
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']  ,
        innerRadius: 30,
        outerRadius: 80,
        isAnimationActive: false,
        fill:"#82ca9d"  
    }

    constructor(props) {
        super(props);         
    } 

    render(){      
        
        const { height, isAnimationActive, colors, innerRadius, outerRadius, fill } = this.props;

        return(
            <ResponsiveContainer width="100%" height={height} >
                <PieChart>                
                    <Pie 
                        data={this.props.data}                     
                        cx="50%" 
                        cy="50%" 
                        innerRadius={innerRadius} 
                        outerRadius={outerRadius} 
                        fill={fill}
                        label 
                        isAnimationActive={isAnimationActive}
                    >
                    {
                        this.props.data.map((entry, index) => <Cell fill={colors[index % colors.length]}/>)
                    }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default GraphPie;