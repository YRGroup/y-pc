var _APIurl

if(window.location.host=='www.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='admin.test.com'){
    _APIurl = 'http://api.test.com'
}else if(window.location.host=='pc.test.com'){
    _APIurl = 'http://api.test.com'
}else{
    _APIurl = ''
}

export default _APIurl