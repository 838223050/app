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
    config.headers.userTempId = getUuid();
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