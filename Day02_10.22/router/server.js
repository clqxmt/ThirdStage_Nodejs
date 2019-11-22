const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const server = http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        let { pathname, query } = url.parse(req.url, true);
        console.log({ pathname, query });
        if (pathname === "/") {
            res.writeHead(200, { "content-type": "text/html;charset=utf8" });
            fs.readFile(path.join(__dirname, "./html/index.html"), (err, data) => {
                res.end(data);
            });

        } else if (/(.*)\.(css)/g.test(pathname)) {
            res.writeHead(200, { "content-type": "text/css;charset=utf8" });
            fs.readFile(path.join(__dirname, pathname), (err, data) => {
                res.end(data);
            })
        } else if (/(.*)\.(js)/g.test(pathname)) {
            res.writeHead(200, { "content-type": "application/x-javascript;charset=utf8" });
            fs.readFile(path.join(__dirname, pathname), (err, data) => {
                res.end(data);
            })
        } else if (/(.*)\.(jpg|gif|png)/g.test(pathname)) {
            res.writeHead(200, { "content-type": "image/" + RegExp.$2 });
            fs.readFile(path.join(__dirname, pathname), (err, data) => {
                res.end(data);
            });
        } else if (pathname === "/user/userInfo.html") {
            let has = false;
            res.writeHead(200, { "content-type": "text/html;charset=utf8" });
                fs.readFile(path.join(__dirname, "/json/user.json"), (err, data) => {
                    // console.log(query.username);
                    // console.log(JSON.parse(data));
                    if(!data+''){
                        data=[];
                    }
                    var data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].username === query.username) {
                            has = true;
                            res.end("用户已存在");
                            // break;
                        }
                    }
                
                if (!has) {
                    data.push(query);
                    fs.writeFile("json/user.json", JSON.stringify(data), (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("ok");
                            res.end("注册成功");
                        }
                    })
                }
            })
        }else if(pathname==="/user/sign.html"){
            let has = false;
            res.writeHead(200, { "content-type": "text/html;charset=utf8" });
                fs.readFile(path.join(__dirname, "/json/user.json"), (err, data) => {
                    console.log(query.username,query.password);
                    console.log(JSON.parse(data));
                    if(!data+''){
                        data=[];
                    }
                    var data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i].username,data[i].password);
                        if (data[i].username === query.username && data[i].password===query.password) {
                            has = true;
                            res.end("登录成功");
                            // break;
                        }
                    }
                
                if (!has) {
                    res.end("您输入的用户名或密码错误");
                }
            })
        }
    }
})
server.listen(3000, () => {
    console.log("启动成功");
})