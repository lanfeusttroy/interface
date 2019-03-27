import {     
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    container,
    defaultFont,
    blueBackground,
    defaultBoxShadow

} from "assets/default";

const olPopupStyle = theme => ({
    
    popup:{
        position: "absolute",
        minWidth:"250px",
        border:"1px solid #CCC",
        bottom:"12px",
        left:"-50px",
        borderRadius: "3px",        
        opacity: ".9",       
        
        ...defaultBoxShadow
    },
    blueBackground:{
        ...blueBackground,
    },
    content:{
        margin:"5px",
        padding: "2px",
        color:"#fff",
    },
    buttonAlignRight: {
        textAlign: "right"
    },


    
})

export default olPopupStyle;
