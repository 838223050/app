import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import Search from '@/pages/Search'
import Cart from '@/pages/AddCartSuccess'

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
        path: '/cart',
        name: 'cart',
        component:Cart
    }
]