/*!  v0.0.1 | (c) Wed May 17 2017 13:15:36 GMT+0800 (中国标准时间) https://anla.io | Julian */
function ltrim(e){return e.replace(/(^\s*)/g,"")}function rtrim(e){return e.replace(/(\s*$)/g,"")}function trim(e){return e.replace(/(^\s*)|(\s*$)/g,"")}function checkURL(e){var r=e;return 1==new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(r)}function GetQueryString(e){var r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(r);return null!=n?unescape(n[2]):null}function urlErrMsg(e){layer.msg(e),$("#search-key").focus()}function isIE9(){("Microsoft Internet Explorer"==navigator.appName&&"MSIE6.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")||"Microsoft Internet Explorer"==navigator.appName&&"MSIE7.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")||"Microsoft Internet Explorer"==navigator.appName&&"MSIE8.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")||"Microsoft Internet Explorer"==navigator.appName&&"MSIE9.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,""))&&alert("您的浏览器版本过低，无法保证购物安全，请下载IE9以上版本")}function Loader(e){var r=$("#loader"),n=$("#product");e?(r.addClass("hide"),n.removeClass("hide")):(r.removeClass("hide"),n.addClass("hide")),$("#return-one").removeClass("hide")}function webSiteMore(){$("#web-more").on("click","a",function(){$("#web-list-ui").removeClass("hide_2"),$("#web-more").hide()})}function ClickSearch(){$("#search-btn").on("click",function(){searchGO()}),$("#search-key").bind("keypress",function(e){"13"==e.keyCode&&searchGO()})}function searchGO(){var e=$("#search-key"),r=trim(e.val());return""==r?void urlErrMsg("请输入商品网址"):checkURL(r)?(Loader(),void setTimeout(function(){Loader("1")},2e3)):void urlErrMsg("请输入正确的网址")}isIE9();