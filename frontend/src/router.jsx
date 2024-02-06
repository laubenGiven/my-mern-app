import { createBrowserRouter } from "react-router-dom";
import DashBoard from "./views/components/DashBoard";
import Admin from "./views/components/Admin";
import Tenant from "./views/components/Tenant";
import Landlord from "./views/components/Landlord";
import Login from "./views/components/Login";
import SignUp from "./views/components/SignUp";
import Guestlayout from "./Components/Guestlayout";

 const router = createBrowserRouter([
    {
        path : "/",

        element : <DashBoard />

    },
    {
        path : "/landlord",

        element : <Landlord />

    },
    {
        path : "/admin",

        element : <Admin />

    },
    {
        path : "/tenant",

        element : <Tenant />

    },
    {
        path : "/",
        element : <Guestlayout />,
        children : [
            {
                path : "/login",
        
                element : <Login/>
        
            },
        
            {
                path : "/signup",
        
                element : <SignUp />
        
            },
        
        ]
    }


]);





export default router;