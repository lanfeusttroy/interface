import {     
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    container,
    defaultFont,
    defaultBoxShadow

} from "assets/default";

const olPopupStyle = theme => ({
    popup:{
        borderRadius: "3px",        
        opacity: ".8",
        backgroundColor: primaryColor,
        ...defaultBoxShadow
    },
    content:{
        margin:"5px",
        padding: "10px",
        color:"#fff",
    }


    
})

export default olPopupStyle;
