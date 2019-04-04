import {     
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    container,
    defaultFont,
    blueBackground,
    purpleBackground,
    greenBackground,
    orangeBackground,
    defaultBoxShadow

} from "assets/default";

const olMapStyle = theme => ({    
    popup:{
        position: "absolute",
        minWidth:"300px",
        minHeight:"100px",
        //border:"1px solid #CCC",
        bottom:"12px",
        left:"-50px",
        //borderRadius: "15px",        
        //opacity: ".9",     
        backgroundColor:"transparent",
        ...defaultBoxShadow
    },

});

export default olMapStyle;
