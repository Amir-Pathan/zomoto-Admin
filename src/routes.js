import CreateAccount from "./createAccount";
import Header from "./header";
import Login from "./login";

const routes = [
    {
        component:<CreateAccount/>,
        path:'/createAccount'
    },
    {
        component:<Login/>,
        path:'/login'
    }
]

export default routes