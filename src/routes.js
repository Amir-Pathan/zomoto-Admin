import CreateAccount from "./createAccount";
import Header from "./header";
import Login from "./login";
import Categories from "./categories";

const routes = [
    {
        component:<CreateAccount/>,
        path:'/createAccount'
    },
    {
        component:<Login/>,
        path:'/login'
    },
    {
        component:<Categories/>,
        path:'/categories'
    }
]

export default routes