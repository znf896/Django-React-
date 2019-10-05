import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom"
import axios from 'axios'
import { observable } from "mobx";
import store from "store";
import { cpus } from 'os';



 
export default class PostService {
    @observable errMesg = '';
    @observable posts = '';
    @observable pagnation = '';
    @observable content = '';

    constructor() {
        this.instance = axios.create(
            {
                baseURL: '/api/post',
                headers: { 'jwt': store.get('token') }
            }
        );
    };
    post(title, content) {
        console.log(title, content);
        console.log(store.get('token'));
        this.instance.post('/pub', {
            title, content
        }).then((response) => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.post_id)
            this.errMesg = 1;
        }).catch((error) => {
            console.log(error);
            this.errMesg = 2;
        });
    };

    getall(search) {
        console.log(1, 'getall', search) //"?page=1&size=20"
        //向后端发起异步请求
        this.instance.get(search).then(response => {
            console.log(2, response)
            this.posts = response.data.post_result;
            this.pagnation = response.data.pagnation;
            console.log('__________________',response.data.post_result);
            console.log('~~~~~~~~~~~~~~~~~~', response.data.pagnation);
        }).catch(error => {
            console.log('error~~~~~~~~~~',error);

        })
    };

    cont_get(id) {
        console.log(id);
        this.instance.get(id).then(response => {
            console.log('this is respone', response);
            console.log('this is data', response.data);
            this.content = response.data
        }).catch(error => {
            console.log(error);
            this.errMesg = '暂无数据';
        });
    };
}
