//components/card/cardBody.js

import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import cardBodyStyle from "assets/components/cardBodyStyle";

const CardBody = ({ ...props }) => {
    const { classes, className, children, plain, profile, ...rest } = props;
    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [classes.cardBodyPlain]: plain,
        [classes.cardBodyProfile]: profile,
        [className]: className !== undefined
    });
    
    return(
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    )
}


export default withStyles(cardBodyStyle)(CardBody);