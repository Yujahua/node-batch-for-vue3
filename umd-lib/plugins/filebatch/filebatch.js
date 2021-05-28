"use strict";

(function (window, module) {
  /**
   * utils for
   * String prototype
   * first words change to uppercase
   */
  if (!String.prototype.toFirstABCUpperCase) {
    String.prototype.toFirstABCUpperCase = () => this.replace(this.charAt(0), this.charAt(0).toUpperCase());
  } // version 0.9


  const version = '0.9',
        vBat = function vBat() {
    return new vBat.fn.init();
  };

  vBat.fn = vBat.prototype = {
    version
  };

  var init = function init() {
    return vBat.fn.extend(fs);
  };

  vBat.fn.init = init;

  vBat.fn.extend = function () {
    vBat.fn = Object.assign(vBat.fn, ...arguments);
    return vBat;
  };

  const log = vBat.fn.log = info => typeof info === "object" ? (() => {
    console.log("[object]$ ");
    console.dir(info);
  })() : process.stdout.write("[".concat(typeof info, "]$ ").concat(info, "\n"));
  /**
   * file system
   */


  var fs = {
    options: {
      ignore: [],
      // 目录下忽略的文件或路径
      ondebug: true,
      // 默认开启debug，日志内容输出在debug.log文件，错误会显示在error.log文件 [!未启用]
      rootDir: "../../origin",
      // 待扫描的本地磁盘根目录，默认是@origin
      silent: false,
      // 静默模式，开启后不打印日志
      undressMap: {
        // 执行文件扫描时得到的关键内容，收集
        "inputFileList": [],
        // 输入文件名存档
        "outputFileList": [],
        // 输出文件名存档 [!未启用]
        "errorFilesList": [] // 错误文件名完整路径存档，并输出ondebug.log文件 [!未启用]

      }
    }
  };
  /**
   * public methods for fs
   * [methods]:
   *      setIgnore
   *      setSilent
   *      run
   */
  // set ignore for scanning

  fs.setIgnore = data => {
    if (typeof data !== undefined && data instanceof Array) {
      fs.options.ignore = data;
    }
  }; // When it true on, programming go with log info


  fs.setSilent = bool => {
    if (typeof bool == "boolean") return fs.options.silent = bool;
  }; // Running entrance file


  fs.run = (sourcePath, targetPath) => {
    const modurl = fs.readDir(sourcePath, "-R");
    const rootPath = targetPath;

    const targetsPagePre = require('path').join(rootPath, 'pages');

    const total = modurl.length; //获取读到的内容列表长度

    log("find [ mod ] files number: ".concat(total));
    let result = [];
    let codes = [];

    for (let i = 0; i < total; i++) {
      let file = modurl[i]; //处理这些文件

      const vb = vBat();
      let item = vb.analysisFile(file.path, file.code);

      if (item != undefined) {
        let code = file.code;
        let info = item;

        if (result.includes(code)) {
          vb.log("[ERROR]:".concat(code, " has exist!"));
        }

        result.push(info);
        codes.push(code);
      }
    }

    for (let i = 0; i < result.length; i++) {
      const file = result[i];
      const final = fs.vbToToolsConfig(file); //转换input到目标格式
      //

      let inputShifts = final.inputFields,
          outputShifts = final.outputFields,
          timerArray1 = [],
          timerArray2 = [];

      if (fs.options.tempSet == true) {
        fs.temp(rootPath, file.trs_name, file); //同步存储temp.json文件
      }

      for (let i = 0; i < inputShifts.length; i++) {
        const boxNotNull = inputShifts[i].mode == "tabs" || inputShifts[i].mode == "normal" && inputShifts[i]["box"].length > 0;

        if (boxNotNull) {
          const t = fs.timeBacker('page');

          const pagePath = require('path').join(targetsPagePre, t + '.ve');

          timerArray1.push(t);
          fs.writeFile(pagePath, inputShifts[i]); //录入页目标格式输出写入targets
        }
      }

      for (let i = 0; i < outputShifts.length; i++) {
        const boxNotNull = outputShifts[i].mode == "tabs" || outputShifts[i].mode == "normal" && outputShifts[i]["box"].length > 0;

        if (boxNotNull) {
          const t = fs.timeBacker('page');

          const pagePath = require('path').join(targetsPagePre, t + '.ve');

          timerArray2.push(t);
          fs.writeFile(pagePath, outputShifts[i]); //结果页目标格式输出写入targets
        }
      }

      const name = file.trs_name || undefined;
      const trans_struct = fs.vbTransLink(timerArray1, timerArray2, name);

      const pagePath = require('path').join(rootPath, name + '.ve');

      fs.writeFile(pagePath, trans_struct); //目标交易格式输出写入targets根目录
    }

    log("complete [ mod ] number\uFF1A".concat(result.length));
  };
  /**
   * props.typemethods for fs
   * [methods]:
   *      filter
   *      filterAnnotation
   *      filterSpaces
   *      isWindowsPath
   *      routeFormate
   *      readDir
   *      writeFile
   *      readDir_R
   *      isExists
   *      isFile
   *      isDir
   *      isJavaScriptFile
   *      isHtmlFile
   *      isEntranceIndexFile
   *      isFileTypeCorrect
   *      fileType
   *      readFile
   *      mkdirSync
   *      rm
   *      rmdirSync
   *      temp
   */
  // filter for the ignore targets


  function filter(ignore, content) {
    if (ignore.length == 0 || content.length == 0) {
      return content;
    }

    let str = String(content);

    for (let i = 0; i < ignore.length; i++) {
      let regExp = new RegExp('(^|,)' + ignore[i] + '(,|$)');
      str = str.replace(regExp, '');
    }

    let arr = str.split(',');

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '') {
        arr.splice(i, 1);
      }
    }

    return arr;
  } // filter other invalid characters, like annotation


  function filterAnnotation(fd) {
    const regexp = new RegExp(/<!--(.|\s)+?-->/, 'g');

    if (fd == undefined) {
      return fd;
    }

    const map = fd.match(regexp);
    if (map == null) return fd;

    for (let i = 0; i < map.length; i++) {
      fd = fd.replace(map[i], '');
    }

    return fd;
  } // filter other invalid characters, like spaces


  function filterSpaces() {
    const regexp1 = new RegExp(/[\r\n\f\t]/, 'g');
    const regexp2 = new RegExp(/\s{2,}/, 'g');

    if (fd == undefined) {
      return fd;
    }

    return fd.replace(regexp1, ' ').replace(regexp2, ' ');
  } // path, like windows style opposite path


  function isWindowsPath(path) {
    if (path != undefined) {
      return /\\/.test(path) != null;
    }
  } // make the same of path for windos and linux styles


  function routeFormate(path) {
    const regexp = new RegExp(/\\{1,}/, 'g');

    if (path != undefined && fs.isWindowsPath(path)) {
      return path.replace(regexp, '/');
    }

    return path;
  } // read dir files


  function readDir(path, condition, savecode) {
    let files = require('fs').readdirSync(path, "utf8");

    const ignore = fs.options.ignore;
    const CATEGORY = "-R|-r";
    const MOD_REGEXP = /([A-Za-z0-9]+)?_?mod\.html/;
    const TRS_FOLDER_REGEXP = /\/([A-Za-z0-9]+)\/$/;
    files = fs.filterIgnore(ignore, files); //[ 'Accounting' ]
    //order eg: ['6201_mod.html','form','acctInterAcctInfoModify.js','acctInterAcctInfoModifyPre.html','acctInterAcctInfoModifyRes.html']

    files = fs.orderByMod1st(files);
    const map = String(files).match(MOD_REGEXP) || path.match(TRS_FOLDER_REGEXP);
    const code = map != null ? map[1] : savecode; // 此处更新 [交易码]
    // fs.record(path,code);//为文件夹目录做记录

    if (condition !== undefined && CATEGORY.includes(condition)) {
      condition = 'readDir' + condition.replace(/-/g, '_').toUpperCase(); //合成方法，如readDir_R

      for (var i = 0; i < files.length; i++) {
        if (fs.hasOwnProperty(condition)) {
          fs[condition](path, files[i], code);
        }
      }

      return fs.options.one_imensional;
    } else return files;
  }

  ; // Write into file

  function writeFile(path, fd) {
    require('fs').writeFile(path, JSON.stringify(fd), 'utf8', err => {
      if (err) {
        throw err;
      }
    });
  }

  ; // read dir for inner function call

  function readDir_R(path, file, code) {
    path = require('path').join(path, file);

    if (fs.isExists(path)) {
      if (fs.isDir(path)) {
        fs.readDir(path, "-R", code);
      } else if (fs.isFile(path)) {
        if (fs.isEntranceIndexFile(path)) {
          //过滤mod后缀的文件
          fs.record(path, code); //为文件目录做记录
        }
      }
    }
  }

  function isExists(path) {
    if (path != undefined) return require('fs').existsSync(path);
  }

  function isFile(path) {
    if (path != undefined) return require('fs').statSync(path).isFile();
  }

  function isDir(path) {
    if (path != undefined) return require('fs').statSync(path).isDirectory();
  }

  function isJavaScriptFile(path) {
    if (path != undefined) return fs.isFileTypeCorrect(path, 'js');
  }

  function isHtmlFile(path) {
    if (path != undefined) return fs.isFileTypeCorrect(path, 'html');
  }

  function isEntranceIndexFile(path) {
    if (path != undefined) return path.includes("mod.html");
  }

  function isFileTypeCorrect(path, typeStr) {
    if (path != undefined && typeStr != undefined) return fs.fileType(path) === typeStr.toLowerCase();
  }

  function fileType(path) {
    if (path != undefined) return require('path').extname(path).slice(1);
  }

  function readFile(path) {
    if (path != undefined) return require('fs').readFileSync(path, 'utf8');
  }

  function mkdirSync(path) {
    if (path != undefined) require('fs').mkdirSync(path);
  }

  function rm(path) {
    if (path != undefined) require('fs').unlinkSync(path);
  }

  function rmdirSync(path) {
    if (fs.isExists(path)) {
      const files = require('fs').readdirSync(path);

      files.forEach(file => {
        const curr = require('path').join(path, file);

        if (fs.isDir(curr)) {
          fs.rmdirSync(curr);
        } else {
          fs.rm(curr);
        }
      });

      require('fs').rmdirSync(path);
    }
  }

  function temp(targetPath, transCode, file) {
    const timer_temp = fs.timeBacker(transCode);

    const tempPath = require('path').join(targetPath, 'temp', timer_temp + '.json');

    fs.writeFile(tempPath, file); //vbat自定义输出写入temp
  }

  ;
  init = vBat.fn.prototype;
  return module.exports = window.vBat = vBat;
})(typeof window !== "undefined" ? window : {}, typeof module !== "undefined" ? module : {});