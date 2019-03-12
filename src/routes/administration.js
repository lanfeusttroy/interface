//routes/administration
import AddUser from "views/addUser";

export default { 
    AddUser: {
        component: AddUser,
        path: '/useradd',
        sidebarName: "Add User",        
        icon: "person",
        protected: true
    }
};