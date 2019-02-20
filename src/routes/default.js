//routes/defaults

//views
import Home from "views/home";
import Profile from "views/profile";

export default {
    Home: {
        component: Home,
        path: '/home',
        sidebarName: "Home",        
        icon: "home",
        protected: false
    },
    Profile: {
        component: Profile,
        path: '/profile',
        sidebarName: "Profile",        
        icon: "profile",
        protected: false
    }
};