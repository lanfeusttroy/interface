//components/card/cardHeader.js

import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import cardIconStyle from "assets/components/cardIconStyle";

function CardIcon({ ...props }) {
    const { classes, className, children, color, ...rest } = props;
    const cardIconClasses = classNames({
      [classes.cardIcon]: true,
      [classes[color + "CardHeader"]]: color,
      [className]: className !== undefined
    });
    return (
      <div className={cardIconClasses} {...rest}>
        {children}
      </div>
    );
  }

export default withStyles(cardIconStyle)(CardIcon);