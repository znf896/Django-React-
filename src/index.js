import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './component/login'
import Register from './component/reg';
import Cont from './component/cont';
import { Menu, Icon, Layout,ConfigProvider } from 'antd';
import Pub from './component/pub';
import L from './component/list';
import zhCN from 'antd/es/locale/zh_CN';

import 'antd/lib/menu/style';
import 'antd/lib/icon/style';
import 'antd/lib/layout/style';


const { Header, Content, Footer } = Layout;

function BasicExample() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div>
            <Menu mode="horizontal" theme="dark">
              <Menu.Item key="mail"><Link to="/" style={{ fontSize: 16, padding: '8px 5px' }}>主页</Link></Menu.Item>
              <Menu.Item key="about"><Link to="/about" style={{ fontSize: 16, padding: '8px 5px' }}>关于</Link></Menu.Item>
              <Menu.Item key="login"><Link to="/login" style={{ fontSize: 16, padding: '8px 5px' }}>登陆</Link></Menu.Item>
              <Menu.Item key="reg"><Link to="/reg" style={{ fontSize: 16, padding: '8px 5px' }}>注册</Link></Menu.Item>
              <Menu.Item key="list"><Link to="/list" style={{ fontSize: 16, padding: '8px 5px' }}>文章列表</Link></Menu.Item>
              <Menu.Item key="pub"><Link to="/pub" style={{ fontSize: 16, padding: '8px 5px' }}>发表文章</Link></Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content style={{ padding: '0px 70px', marginTop: 30 }}>
          <div style={{ background: '#fff', padding: 12, minHeight: 600 }}>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Register} />
            <Route path="/pub" component={Pub} />
            <Route path="/list" component={L} />
            <Route path="/get" component={Cont} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZNF BLOG ©2019 </Footer>
      </Layout>
    </Router>

  );
}

function Home() {
  return (
    <div>
      <h2>Welcome To ZNF's Blog Project</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>本次项目采用的技术</h1>
      <h3>采用前后端分离开发模式</h3>
      <h3>前端使用最新的React技术，后端使用Django框架</h3>
      <h3>使用Restful风格设计服务间API接口</h3>
      <h3>无session认证技术，强密码技术</h3>
      <h3>阿里开源Antd组件</h3>
    </div>
  );
}

ReactDOM.render(<ConfigProvider locale={zhCN}><BasicExample /></ConfigProvider>,
  document.getElementById('root'))
