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

const olPopupStyle = theme => ({
    
    table: {
      marginBottom: "0",
      width: "100%",
      maxWidth: "100%",
      backgroundColor: "transparent",
      borderSpacing: "0",
      borderCollapse: "collapse",
      color:"#fff"
    },
    
    tableBody: {
        ...defaultFont,
        color:"#FFF",
        lineHeight: "1.42857143",        
        verticalAlign: "middle"
    },
    popup:{
        position: "absolute",
        minWidth:"250px",
        border:"1px solid #CCC",
        bottom:"12px",
        left:"-50px",
        borderRadius: "15px",        
        opacity: ".9",       
        
        ...defaultBoxShadow
    },
    
    blueBackground:{
        color:"#fff",
        ...blueBackground,
    },
    purpleBackground:{
        ...purpleBackground,
    },
    greenBackground:{
        ...greenBackground,
    },
    orangeBackground:{
        ...orangeBackground,
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
