import {  
    
    defaultFont,    
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,

  } from "assets/default";

  const ficheNavireStyle = theme => ({
    blueTabs: {
        backgroundColor:infoColor,
        borderBottom: '1px solid #e8e8e8',
    },
    greenTabs: {
        backgroundColor:successColor,
        borderBottom: '1px solid #e8e8e8',
    },
    orangeTabs: {
        backgroundColor:warningColor,
        borderBottom: '1px solid #e8e8e8',
    },
    purpleTabs: {
        backgroundColor:primaryColor,
        borderBottom: '1px solid #e8e8e8',
    },
    tab:{
        
        textTransform: 'initial',
        minWidth: 72,
    }
  });

  export default ficheNavireStyle;