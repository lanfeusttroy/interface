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
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    iconButton:{
        float:"right",
        padding:"0px",
        color:"#000"      
    },
    iconPavillon:{
        width:"30px",
        height:"auto"
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
