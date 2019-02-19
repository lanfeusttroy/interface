//assets/default.js

/*
    Default style variables
*/

const drawerWidth = 260;

const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const roseColor = "#e91e63";
const grayColor = "#999999";

const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};
  
const container = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto"
};



const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
};

const boxShadow = {    
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const defaultBoxShadow = {
    border: "0",
    borderRadius: "3px",
    boxShadow:
      "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    padding: "10px 0",
    transition: "all 150ms ease 0s"
};

const primaryBoxShadow = {
    boxShadow:
      "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
  };

export {
    //variables
    drawerWidth,
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
    transition,
    container,
    defaultFont,
    boxShadow,
    defaultBoxShadow,
    primaryBoxShadow
};