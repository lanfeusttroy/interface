//components/card/cardHeader.js

import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import cardHeaderStyle from "assets/components/cardHeaderStyle";

const CardHeader = ({ ...props }) => {
    const {
        classes,
        className,
        children,
        color,
        plain,
        stats,
        icon,
        ...rest
      } = props;

      const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + "CardHeader"]]: color,
        [classes.cardHeaderPlain]: plain,
        [classes.cardHeaderStats]: stats,
        [classes.cardHeaderIcon]: icon,
        [className]: className !== undefined
      });
      
    return(
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    )
}


export default withStyles(cardHeaderStyle)(CardHeader);