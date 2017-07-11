var _APIurl

if(window.location.host=='www.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='testapi.zzflgs.cn'){
    _APIurl = 'http://testapi.zzflgs.cn'
}else{
    _APIurl = 'http://testapi.zzflgs.cn'
}

export default _APIurl