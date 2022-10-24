import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import Search from '@/pages/Search'
import AddToCart from '@/pages/AddCartSuccess'
import Cart from '@/pages/ShopCart' 
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'

export default [
    {
        path: '/home',
        component: Home,
        meta:{show:true}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name: 'search',
        meta:{show:true}
    },
    {
        path: '/login',
        component: Login,
        meta:{show:false}
    },
    {
        path: '/register',
        component: Register,
        meta:{show:false}
    },
    {
        path: '/detail/:productId',
        name:'detail',
        component:Detail
    },
    {
        path: '/',
        redirect:'/home'
    }, 
    {
        path: '/SuccessAddTocart',
        name: 'addToCart',
        component:AddToCart
    },
    {
        path: '/cart',
        name: 'cart',
        component:Cart
    },
    {
        path: '/trade',
        component:Trade
    },
    {
        path: '/pay',
        component:Pay
    },
    {
        path: '/paySuccess',
        component:PaySuccess
    }
]