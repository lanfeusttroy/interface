import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    blueCardHeader,
    purpleCardHeader,
    greenCardHeader,
    orangeCardHeader
  } from "assets/default";
  
  const cardIconStyle = {
    cardIcon: {
      "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader, &$blueCardHeader ,&$purpleCardHeader,&$greenCardHeader,&$orangeCardHeader,": {
        borderRadius: "3px",
        backgroundColor: "#999",
        padding: "15px",
        marginTop: "-20px",
        marginRight: "15px",
        float: "left"
      }
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    blueCardHeader,
    purpleCardHeader,
    greenCardHeader,
    orangeCardHeader
  };
  
  export default cardIconStyle;
  