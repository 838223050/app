import { v4 as uuidv4 } from 'uuid';
export const getUuid = () => {
    let userTempId = localStorage.getItem('userTempId');
    if (!userTempId) {
        userTempId = uuidv4();
        localStorage.setItem('userTempId', userTempId);
    }
    return userTempId;
}
let timeId = null;
export const mythrottle = function(func,time){
    if (timeId) {
        clearTimeout(timeId);
    } 
    timeId = setTimeout(func, time);
}