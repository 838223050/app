//路由配置文件
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter);
let originPush = VueRouter.prototype.push

let router = new VueRouter({
    //config
    routes,
    scrollBehavior(to) {
        if (to.name == 'detail') {
            return {y:100}
        }
    }
})
VueRouter.prototype.push = function (path,resolve,reject) {
    if (resolve && reject) {
        originPush.call(this, path,resolve,reject).catch(err=>err);
    } else {
        originPush.call(this, path).catch(err=>err);
    } 
}
export default router