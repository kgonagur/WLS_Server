
const mongoose = require('mongoose');

//model schema for raspberry pi
//contains Friendly identifier name, Ipaddress, fixtures 
//each fixture has a starting index, channel count and rgb + cct color values

const rpiSchema = mongoose.Schema({
    friendlyName:String,
    ipAddress:String,
    fixtures: [{
        "startIndex": Number,
        "numberOfChannels": Number,
        "color": {
            type:[Number],
            default:[255,255,255,255,255]
        }
    },
    {
        "startIndex": Number,
        "numberOfChannels": Number,
        "color": {
            type:[Number],
            default:[255,255,255,255,255]
        }
    }
],
});
module.exports=mongoose.model('rpi',rpiSchema);
