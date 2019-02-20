//components/card/card.js

import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import cardStyle from "assets/components/cardStyle";

const Card = ({ ...props }) => {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        chart,
        ...rest
      } = props;

    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardProfile]: profile,
        [classes.cardChart]: chart,
        [className]: className !== undefined
    });
    
    return(
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    )
}


export default withStyles(cardStyle)(Card);