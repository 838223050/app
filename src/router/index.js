//路由配置文件
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter);
// 保存原本的push
let originPush = VueRouter.prototype.push

// 重写push
VueRouter.prototype.push = function (path,resolve,reject) {
    if (resolve && reject) {
        originPush.call(this, path,resolve,reject).catch(err=>err);
    } else {
        originPush.call(this, path).catch(err=>err);
    } 
}
// 实例化
let router = new VueRouter({
    //config
    routes,
    // 滚动行为配置
    scrollBehavior(to) {
        if (to.name == 'detail') {
            return {y:100}
        }
    }
})
// 路由守卫
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('k1');
    if (token) {
        // 登录状态
        if (to.path == '/login') {
            next('/home');
        } else {
            next();
        }
    } else {
        // 未登录
        next();
    }
})
export default router