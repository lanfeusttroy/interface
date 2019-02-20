//components/customButtom.js

import React from "react";
import classNames from "classnames";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

//style
import customButtonStyle from "assets/components/customButtonStyle";

function CustomButton({ ...props }) {
    const {
      classes,
      color,
      round,
      children,
      disabled,
      simple,
      size,
      block,
      link,
      justIcon,
      className,
      muiClasses,
      ...rest
    } = props;

    const btnClasses = classNames({
      [classes.button]: true,
      [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className]: className
    });
    return (
      <Button {...rest} classes={muiClasses} className={btnClasses}>
        {children}
      </Button>
    );
  }

export default withStyles(customButtonStyle)(CustomButton);