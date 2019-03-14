//routes/defaults

//views
import Home from "views/home";
import Profile from "views/profile";
import Chart from "views/chart";
import Map from "views/map";
import Boat from "views/boat";
import Notification from "views/notification";

import ListeNavire from "views/listeNavire";


export default {
    Home: {
        component: Home,
        path: '/home',
        sidebarName: "Home",        
        icon: "home",
        header:false,        
    },
    Map: {
        component: Map,
        path: '/map',
        sidebarName: "Map",        
        icon: "place",
        header:false,        
    },
    Chart: {
        component: Chart,
        path: '/chart',
        sidebarName: "Chart",        
        icon: "show_chart",
        header:false,       
    },
    Boat:{
        component: Boat,
        path: '/boat',
        sidebarName: "Navires",        
        icon: "directions_boat",
        header:true,        
    },
    ListeNavire:{
        component: ListeNavire,
        path: '/listenavire',
        sidebarName: "Navires",        
        icon: "list",
        header:false,
    },
    Notification:{
        component: Notification,
        path: '/notification',
        sidebarName: "Notification",        
        icon: "notifications",
        header:true,
    },
    Profile: {
        component: Profile,
        path: '/profile',
        sidebarName: "Profile",        
        icon: "person",
        header:true,
    }
};