import CreateAccount from "./createAccount";
import Header from "./header";
import Login from "./login";
import Categories from "./categories";
import Products from "./product";

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
    },
    {
        component:<Products/>,
        path:'/product/:userId'
    }
]

export default routes