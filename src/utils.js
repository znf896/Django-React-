import React from 'react';




let log_wrapper = obj => Component => props => <Component {...{ obj }} {...props} />;

let parse_qs = function (search) {
    let pattn = /(\w+)=([^&]*)/;
    console.log('~~~')
    console.log(search.substr(0, 1))
    if (search.substr(0, 1) == '?') let sub_search = search.substr(1) //字符串提取
    console.log(sub_search); //{page: "1"}
    console.log(sub_search.split('&'));//{page: "1", size: "10"}

    //字符串风分割
    var res = {};
    sub_search.split('&').forEach(element => {
        let re = pattn.exec(element);
        //Q:为什么做判断？A:如果匹配到了则写入到对象中
        if (re) {
            res[re[1]] = re[2]
            console.log('!!!!!!!!!!!', res)};
    });
    return res;
    
};

//提取地址栏中id
let match = url => {
    let pattn = /(\w+\/)(\d+)/

    let res_id = {};
    let re = pattn.exec(url)
    if (re) {
        res_id['id'] = re[2]
    };
    return res_id;
};

export { log_wrapper, parse_qs, match }
