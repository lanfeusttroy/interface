//components/card/cardAvatar.js

import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import cardAvatarStyle from "assets/components/cardAvatarStyle.js";

function CardAvatar({ ...props }) {
    const { classes, children, className, plain, profile, ...rest } = props;
    const cardAvatarClasses = classNames({
      [classes.cardAvatar]: true,
      [classes.cardAvatarProfile]: profile,
      [classes.cardAvatarPlain]: plain,
      [className]: className !== undefined
    });
    return (
      <div className={cardAvatarClasses} {...rest}>
        {children}
      </div>
    );
}
  

export default withStyles(cardAvatarStyle)(CardAvatar);