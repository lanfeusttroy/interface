import {      
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
} from "assets/default";


const selectColorStyle = theme => ({  
    blue:{
        backgroundColor: infoColor,
        marginRight:"5px",
        width:"30px",
        height:"30px",
        minHeight:"30px",
        '&:hover': {
            backgroundColor: infoColor,
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.5)',
        },
    },
    green:{
        backgroundColor: successColor,
        marginRight:"5px",
        width:"30px",
        height:"30px",
        minHeight:"30px",
        '&:hover': {
            backgroundColor: successColor,
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.5)',
        },
    },
    purple:{
        backgroundColor: primaryColor,
        marginRight:"5px",
        width:"30px",
        height:"30px",
        minHeight:"30px",
        '&:hover': {
            backgroundColor: primaryColor,
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.5)',
        },
    },
    orange:{
        backgroundColor: warningColor,
        marginRight:"5px",
        width:"30px",
        height:"30px",
        minHeight:"30px",
        '&:hover': {
            backgroundColor: warningColor,
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.5)',
        },
    },
    

});

export default selectColorStyle;