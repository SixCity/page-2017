//去左空格;
function ltrim(s) {
  return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s) {
  return s.replace(/(\s*$)/g, "");
}
//去左右空格;
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}
// url 合法
function checkURL(URL) {
  var str = URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) == true) {
    return true;
  } else {
    return false;
  }
}