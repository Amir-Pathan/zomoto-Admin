import CreateAccount from "./createAccount";
import Header from "./header";
import Login from "./login";
import Categories from "./categories";
import Products from "./product";
import Orders from "./order";

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
    },
    {
        component:<Orders/>,
        path:'/orders'
    }
]

export default routes