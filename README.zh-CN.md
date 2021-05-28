# vue223
vue2 to 3

[English](./README.md) | **中文**

实现目标：

1. 操作人员将vue2源文件放进origin输入目录（包含template、script、style三部分的vue文件）
2. 运行npm
3. dist输出目录，查看vue3最终文件
4. 默认是vue3友好支持ts的标准版本，计划支持composition-api标准过渡版本，和ts版本

架构设计：
1. 在转换库（cvt）定义rules
2. 运行 engine
2. engine读取源文件，读取rules并且遵循rules指定
3. 输出结果

文件结构
```
├── dist *
├── src
├   ├── engine
├   ├    └── core.js
├   ├── config.js
├   └── index           [entrance]

├── examples
├   └── origin
├       ├── .vue
├       └── ...  
├  
├── umd-lib
├    ├── 
├       (the same as src)
├
├── .gitignore
├── 223.config.json
├── babel.config.json
├── LICENSE
├── package.json
├── README.md
├── README.zh-CN.md
```

## 开发
```sh
    npm install
    npm test                            开发中..
    npm start                           开发中..
    vue223 <origin Dir> <output Dir>    开发中..

```