import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import '../css/login.css';
import Userservice from '../service/user';
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";
import { message, Spin, Pagination, Col, Form } from 'antd';
import { log_wrapper, parse_qs } from '../utils'
import PostService from '../service/post';
import { List } from 'antd';


import 'antd/lib/message/style';
import 'antd/lib/list/style';
import 'antd/lib/pagination/style';
import 'antd/lib/col/style'
import 'antd/lib/form/style';
import { comparer } from 'mobx';


const postservice = new PostService();

@log_wrapper(postservice)
@observer
export default class L extends React.Component {
    constructor(props) {
        super(props);
        console.log(1, this.props);
        //对URL是否有查询字符串做判断
        if (this.props.location.search)
        {this.props.obj.getall(this.props.location.search);}
        else {
            this.props.location.search = '?page=1&size=10';
            this.props.obj.getall(this.props.location.search);
        }
        // console.log(3, this.props.location.search) //"?page=1&size=20"
    };

    onChange(page, pageSize) {
        // 实现分页点击后
        this.setState({ current: page })
        let search = "?page=" + page + "&size=" + pageSize;  //默认pageSize=10
        this.props.obj.getall(search);
    };
//重新解析url，生成当前页
    geturl(page) {
        let obj = parse_qs(this.props.location.search); //'?page=1&size=10';
        let { size = 20 } = obj;
        let search = "/list?page=" + page + "&size=" + size;
        return search;
    };
//解决地址栏不显示的问题
    itemRender(current, type, originalElement) {
        console.log('地址栏', current, type, originalElement);
        if (type === 'next')
        return <a>下一页</a>
        if (type === 'prev')
        return <a>上一页</a>
        if (type === 'page')
        return <Link to={this.geturl(current)}>{current}</Link>;
    };
    render() {
        //状态值变化，调render
        const data = this.props.obj.posts;
        const pagination = this.props.obj.pagnation;
        if (data && pagination) {
            console.log('data和pagination准备就绪');
            return (<Form layout="vertical" >
                <List bordered={false} itemLayout="horizontal" dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={<Link to={'/get/' + item.post_id}> 作者：{item.author} <Col span={19} offset={0}>标题：{item.title}</Col> </Link>} />
                        </List.Item>)}>
                </List>
                <Col span={19} offset={9}><Pagination itemRender={this.itemRender.bind(this)} current={pagination.page} onChange={this.onChange.bind(this)} total={pagination.total_page * 10} /></Col>
            </Form>)
        } //渲染数据 total = 真实页数X10
        else {
            return (<div>No Data</div>)
        }
    };
};