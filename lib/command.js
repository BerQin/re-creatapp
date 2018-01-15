'use strict';

var _fs = require('fs');
var _path = require('path');
var program = require('commander');
var _chalk = require('chalk');
var _thinkit = require('thinkit');

var rootPath = process.cwd();
var templatePath = _path.join(__dirname, '../template');
var projectRootPath = rootPath;
var publicPath = _path.join(rootPath,'public');
var TemplateModlePath = _path.join(templatePath,'template');
console.log('Welcome To re-creatapp ');

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copyFiles = function( src, dst ){
  // 读取目录中的所有文件/目录
  _fs.readdir( src, function( err, paths ){
      if( err ){
          throw err;
      }
      paths.forEach(function( path ){
          var _src = _path.join(src, path);
          var _dst = _path.join(dst, path);
          _fs.stat( _src, function( err, st ){
              if( err ){
                  throw err;
              }
              // 判断是否为文件
              if( st.isFile() ){
                  // 创建读取流
                  copyFile(_src,_dst,null,true);
              }
              // 如果是目录则递归调用自身
              else if( st.isDirectory() ){
                  exists( _src, _dst, copyFiles );
              }
          });
      });
  });
};
// 复制单个文件
var copyFile = function(src, dest, replace, istemplatePath){
  if(!istemplatePath) src = _path.join(templatePath, src);
  var content = _fs.readFileSync(src, 'utf8');
  //replace content
  var afterreplace = null;
  if(_thinkit.isBoolean(replace)) {
    afterreplace = replace;
    replace = '';
  }
  if (_thinkit.isObject(replace)) {
    for (var key in replace) {
      /*eslint-disable no-constant-condition*/
      while (1) {
        var content1 = content.replace(key, replace[key]);
        if (content1 === content) {
          content = content1;
          break;
        }
        content = content1;
      }
    }
  }
  _fs.writeFileSync(dest, content);
  console.log(_chalk.green('creat '+ dest + ' success!'));
}
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
  if(_fs.existsSync(dst)){
    callback( src, dst );
  } else{
    _fs.mkdir( dst, function(err){
      if (err) {
        throw err;
      }
      callback( src, dst );
    });
  }
};

// 创建项目
var createProject = function(config) {
  var path = config.path;
  var name = config.name;
  var projectPath = _path.resolve(path, name);
  console.log(_chalk.yellow(projectPath));
  _fs.mkdir(projectPath,function(){
    console.log(_chalk.green('creat '+name+' success!'));
  });
  copyFile('babelrc', _path.join(projectPath, '.babelrc'));
  copyFile('editorconfig', _path.join(projectPath, '.editorconfig'));
  copyFile('gitignore', _path.join(projectPath, '.gitignore'));
  copyFile('package.json', _path.join(projectPath, 'package.json'));
  copyFile('webpack.config.js', _path.join(projectPath, 'webpack.config.js'));
  copyFile('webpack.base.conf.js', _path.join(projectPath, 'webpack.base.conf.js'));
  exists(_path.join(templatePath,'src'), _path.join(projectPath, 'src'),copyFiles);
  exists(_path.join(templatePath,'public'), _path.join(projectPath, 'public'),copyFiles);
  console.log();
  console.log(_chalk.blue('npm run start \n Starts the development server.'));
  console.log();
  console.log(_chalk.blue('npm run build \n Bundles the app into static files for production.'));
  console.log();
  console.log(_chalk.blue('cd '+ name));
  console.log(_chalk.blue('npm run start'));
  console.log();
  console.log('Happy hacking!');
};

// 创建文件
function creatFile(path, data){
  _fs.appendFile(path, data, function(err){
    if (err) throw err;
    console.log(_chalk.blue('creat '+path+' success'));
  });
}

function addSite(config){
  config = config || {};
  const path = publicPath;
  const name = config.name;
  const suffix = config.suffix;
  const type = config.type || 'normal';
  // 创建HTML入口文件
  const fpath = _path.join(publicPath,name+suffix);
  switch (type) {
    case 'add':
      break;
    default:
      _fs.readFile(_path.join(TemplateModlePath,'HtmlModules'+suffix),{
        encoding:'utf8'
      },function(err,data){
        if (err) throw err;
        creatFile(fpath,data.replace(/\{\$name\}/g,name));
      });
  }
}

program.command('creat <name>').alias('c').description('create project').action(function (projectName){
  if(projectName.match(/\.|\/|\\/)){
    console.log(_chalk.red('ERROR!: please use creat <PathName>'));
  }else{
    createProject({ path: projectRootPath, name: projectName});
  }
});

program.command('add <name>').alias('a').description('add project site felis').action(function (name){
  if(name.match(/\.|\/|\\/)){
    console.log(_chalk.red('ERROR!: please use creat <site name>'));
  }else{
    addSite({name: name,suffix:'.html'});
  }
});

program.parse(process.argv);