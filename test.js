



// let a = {
//     a1:1,
//     b2:2,
//     c3:3
// }
// const a=1, b=2, c=3
// console.log({a, b, c})

// class Myclss {
//     constructor() {let a = 1;};
// };

// let myclass = new Myclss();
// console.log({myclass})
// console.log({...{myclass}});
// const a=1, b=2, c=3
// let f = (a, ...b) => {
//         console.log(a);
//         console.log(b);
// };
// f(233, {a})





// console.log({...{a, b, c}})
// let c = {'myclass': new Myclss()}
// console.log(c)
// // console.log(...{c})

url = '?page=1&page=2&size=12&page=2&size=12&name=小明&测试=test'
// let strurl = url;
// console.log(strurl);
// let s = strurl.substr(1)
// console.log(1,  s);
// let pattn =/(\w+)=[^&]*/
// res = pattn.exec(s);
// console.log(res) /**[ 'page=1',
// 'page',
// index: 0,
// input: 'page=1&page=2&szie&page=2&size=12&name=小明&测试=test',
// groups: undefined ]**/
// let a = 'a', b = 'b', c = 'c';
// x = {a,b,c}
// console.log(x['a'])

let parse_qs = function (search) {
    let pattn = /(\w+)=([^&]*)/;
    console.log('~~~')
    console.log(search.substr(0,1) )
    if(search.substr(0,1) == '?') {
        //字符串提取
        sub_search = search.substr(1);
        console.log(sub_search);
        console.log(sub_search.split('&'))

        //字符串风分割
        let res = {};
        sub_search.split('&').forEach(element => {
            console.log(element);
            re = pattn.exec(element);
            console.log('~~~~~~~', re);
            console.log(typeof re)
            //Q:为什么做判断？A:如果匹配到了则写入到对象中
            if (re) {
                res[re[1]] = re[2]
                console.log('!!!!!!!!!!!',res);
            }
        });
    };
};
// parse_qs(url);
// let obj = {page:1, size:2}
// let {page, size} = obj
// console.log(page, size)
// let x = 5;
// x > 4?x=2:x=3;
// let y = x>20?12:20;
// console.log(y)

// let arry = new Array("redwood", "bay", "cedar", "oak", "maple")
// console.log(arry)
// let arry2 = ["redwood", "bay", "cedar", "oak", "maple"]
// console.log(arry2)
// console.log(0 in arry);
// console.log(1 in arry)
// console.log('redwood' in arry);
// let obj = {"redwood":1, "bay":2, "cedar":3}
// console.log(1 in obj);
// console.log('redwood' in obj);
// let {redwood} = obj;
// console.log(redwood)

// let f = function* (arry, fn) {
//     for (i in arry) {
//         arry[i] = fn(arry[i])
//         yield arry[i]
//     }
// }
// let generator = f([1, 2, 3, 4], element => element+10) //生成器对象
// console.log(generator.next())
// for (i of generator) {
//     console.log(i)
// }
u = '/get/post/30';

// console.log(re=pattn.exec(url))
// console.log(re[2])
//提取id的正则表达式
// let match = url => {
//     let pattn = /(\w+\/)(\d+)/

//     let res_id = {};
//     let re= pattn.exec(url)
//     if(re) {
//         res_id['id'] = re[2]
//     };
//     return res_id;
// };
// if ([1, 2, 3, 4].length) {
//     console.log('arry length can be judge')
// };

// if ([1, 2, 3, 4]) {
//     console.log('arry length can not be judge')
// };
if ([]) {
    console.log('arry length can not be judge')
};