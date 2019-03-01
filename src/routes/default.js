//routes/defaults

//views
import Home from "views/home";
import Profile from "views/profile";
import Chart from "views/chart";
import Map from "views/map";
import Boat from "views/boat";
import Notification from "views/notification";

export default {
    Home: {
        component: Home,
        path: '/home',
        sidebarName: "Home",        
        icon: "home",
        protected: false
    },
    Map: {
        component: Map,
        path: '/map',
        sidebarName: "Map",        
        icon: "place",
        protected: false
    },
    Chart: {
        component: Chart,
        path: '/chart',
        sidebarName: "Chart",        
        icon: "show_chart",
        protected: false
    },
    Boat:{
        component: Boat,
        path: '/boat',
        sidebarName: "Navires",        
        icon: "directions_boat",
        protected: false
    },
    Notification:{
        component: Notification,
        path: '/notification',
        sidebarName: "Notification",        
        icon: "notifications",
        protected: false
    },
    Profile: {
        component: Profile,
        path: '/profile',
        sidebarName: "Profile",        
        icon: "person",
        protected: false
    }
};