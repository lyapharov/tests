var glob = require("glob");
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'ddhxqluil',
    api_key: '933478655625466',
    api_secret: '3jjWhaNUoLiUNr-urUucK9AQtPU'
});

// options is optional
glob("screenshots/*.png", function (er, files) {

    for (i =0; i < files.length; i++){
        console.log("/home/ubuntu/tests/src/screenshots/" + files[i]);
        cloudinary.uploader.upload("/home/ubuntu/tests/src/screenshots/" + files[i], function(result) {
            console.log(result);
        });
    }

});

console.log(new Date());