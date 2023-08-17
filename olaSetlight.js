var request = require('request');
const rpi = require('./models/rpi');
var options = {
  'method': 'POST',
  'url': 'http://192.168.113.2:9090/set_dmx',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'u': '3',
    'd': '200,0,0,0,0,200,0,0,0,0'
  }
};
module.exports.setLight= function(rpi) {
    fixtures=rpi.fixtures
    ipAddress=rpi[1]
    ipAddress=rpi.ipAddress
    console.log('reached setLight')
    var data=""
    try{ for( fixture in fixtures){
      data=data.concat(fixtures[fixture].color.toString())
      data+=','
        }
      data=data.slice(0,-1)
    
    
    

      options.form.d=data
  
    options.url='http://'+rpi.ipAddress+':9090/set_dmx'
    console.log(options.form.d)
    console.log(options.url)
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log('reached request');
    console.log(response.body);})

    }


    catch(err) {
      console.log(err.message)
    }
};

const isObject= function(val){
    if(val === null){
        return false;
    } return(typeof val === 'object');
}
