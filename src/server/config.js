var _APIurl

if(window.location.host=='www.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='admin.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='pc.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='testapi.zzflgs.cn'){
    _APIurl = 'http://testapi.zzflgs.cn'
}else if(window.location.host=='jkyr.yearnedu.com'){
    _APIurl = 'http://jkyr.yearnedu.com'
}else{
    _APIurl = 'http://testapi.zzflgs.cn'
}

export default _APIurl