# 批处理

语言：nodeJS

实现目标：

1. 操作人员将vue2源文件放进origin输入目录（包含template、script、style部分的vue文件）
2. 运行程序
3. vue3输出dist目录（符合composition-api标准）

架构设计：
1. 在转换库（cvt-lib）定义rules
2. engine读取源文件，读取rules，根据rules指定的要求，分类、置换、整理
3. 输出结果

文件结构
```txt
| - dist
| - origin
| - src
    | - convert-library
    | - engine
            | - index.js            [entrance]
    | - plugins
            | - filebatch
                    | - start.js
                    | - fb.js       [core]
| - test
| - README.md
| - batch.config.json
```

## 开发过程

1. node生成package.json
```sh
    npm init
```