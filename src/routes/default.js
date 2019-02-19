//routes/defaults

//views
import Home from "views/home";

export default {
    Home: {
        component: Home,
        path: '/home',
        sidebarName: "Home",        
        icon: "home",
        protected: false
    }
};