function getProperty(key){
    var path = document.location.pathname;
    var directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
    console.log('Directory: ', path)
}

export default {
    getProperty
}