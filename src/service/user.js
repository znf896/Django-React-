import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom"
import axios from 'axios'
import { observable } from "mobx";
import { observe } from "mobx-react"
import store from "store";



// store.addPlugin(require('store/plugins/expire')); 
export default class UserService {
    @observable loggin = false; //登陆成功变true
    @observable errMesg = '';
    constructor() {
        this.instance = axios.create({
            baseURL: '/api/user',
            headers: { 'jwt': store.get('token') }
        }
            
        );
        
    };


    //过期验证
    test(token) {
        console.log('!!!!!!!!!!', token)
        this.instance.post('/test', {
            token
        }).then((response) => {
            console.log('验证成功', response)
            this.loggin = true;
        }).catch((error) => {
            console.log('验证失败', error);
            this.errMesg = '验证过期';
            
        });
    };

    login(email, password) {
        console.log(email, password)

        //向后端发送数据
        this.instance.post('/login', {
            email, password
        }).then((response) => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.user);//{user_id: 1, name: "wayne", email: "wayne"}
            console.log(response.data.token);
            this.loggin = true;
            store.set('token', response.data.token, new Date().getTime() + (8 * 3600 * 1000))
        }).catch((error) => {
            console.log(error);
            this.errMesg = '登陆失败';
        });
    };
    reg(name, email, password) {
        console.log(name, password, email)

        //向后端发送数据
        axios.post('/api/user/reg', {
            name, password, email
        }).then((response) => {
            console.log(response);
            console.log(response.data);
            this.loggin = true;
            store.set('token', response.data.token, new Date().getTime() + (8 * 3600 * 1000))
        }).catch((error) => {
            console.log(error);
            this.errMesg = '注册失败';
        });
    };
};
