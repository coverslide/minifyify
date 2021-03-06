var utils = require('utilities')
  , uuid = utils.string.uuid(5);

module.exports = {
    red : '\033[31m'
  , green : '\033[32m'
  , reset : '\033[0m'
  , validatorUrl : 'https://sourcemap-validator.herokuapp.com/validate.json?url='
  , fileUrl : 'http://travisci.s3-website-us-east-1.amazonaws.com/' + uuid + '/'
  , compilers : [/*'gcc', */'uglify'] //GCC isn't generating valid sourcemaps URGH
  , uuid: uuid
};
