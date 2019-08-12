function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
 
var browser={
    versions:function(){
      var u = navigator.userAgent, app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1,
          presto: u.indexOf('Presto') > -1,
          webKit: u.indexOf('AppleWebKit') > -1,
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
          mobile: !!u.match(/AppleWebKit.*Mobile.*/),
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          iPhone: u.indexOf('iPhone') > -1 ,
          iPad: u.indexOf('iPad') > -1,
          webApp: u.indexOf('Safari') == -1
       }
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
 
function block(){
    if(is_weixin()){
        //weixinΪ��ʾʹ��������򿪵�div
        document.getElementById("weixin").style.display="block";
    }
}

function unblock(){
        document.getElementById("weixin").style.display="none";
}

function init(){
    if(is_weixin()){
        //weixinΪ��ʾʹ��������򿪵�div
        document.getElementById("weixin").setAttribute("onclick",'unblock();');
        document.getElementById("ios1").setAttribute("onclick",'block();');
        document.getElementById("ios2").setAttribute("onclick",'block();');
        document.getElementById("android1").setAttribute("onclick",'block();');
        document.getElementById("android2").setAttribute("onclick",'block();');
    }else{
    	document.getElementById("ios1").setAttribute("href",'https://itunes.apple.com/cn/app/pa-pa/id1047549816?|=zh&ls=1&mt=8');
        document.getElementById("ios2").setAttribute("href",'https://itunes.apple.com/cn/app/pa-pa/id1047549816?|=zh&ls=1&mt=8');
        document.getElementById("android1").setAttribute("href",'http://static.zhongan.com/website/other/download/app/papa/app-zhongan-release.apk');
        document.getElementById("android2").setAttribute("href",'http://static.zhongan.com/website/other/download/app/papa/app-zhongan-release.apk');
    }
    	
}

init();



