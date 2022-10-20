//对axios进行二次封装
import axios from 'axios'
import nProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css'
import { getUuid } from '@/utils'


const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
    
});

requests.interceptors.request.use((config) => {
    nProgress.start();
    // 挂载临时id
    config.headers.userTempId = getUuid();
    // 挂载token
    if(localStorage.getItem('k1'))
        config.headers.token = localStorage.getItem('k1');
    console.log(config)
    return config;
})

requests.interceptors.response.use((res) => {
    nProgress.done();
    return res.data;
}, (err) => {
    console.log(err)
    return Promise.reject(err)
})

//对外暴露
export default requests;