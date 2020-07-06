const buildType = process.env.VUE_APP_TITLE
let baseUrl,sysCode;
switch (buildType) {
    case 'dev':
        baseUrl = '/dev'
        sysCode = 'dev-s'
        break;
    case 'prod':
        baseUrl = '/prod'
        sysCode = 'prod-s'
        break;
    case 'beta':
        baseUrl = '/beta'
        sysCode = 'beta-s'
        break;

    default:
        break;
}


export default{
    baseUrl,
    sysCode
}