import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const myPostRequest = params => { debugger; return axios.post('http://47.93.225.228:8080/sysManager/getAPPStatistics', params).then( res => {debugger} ); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };


export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };