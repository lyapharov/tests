/*!
 *
 * Automatic Responsive screenshots creation with PhantomJS and CasperJS.
 * Adapted from the Responsive Design Workflow book by Stephen Hay (http://responsivedesignworkflow.com/).
 * 
 * Usage instructions:
 - Install PhantomJS (http://phantomjs.org/) and CasperJS (http://casperjs.org/)
 - Save this script as `screenshots-multipages.js` in a folder somewhere in your filesystem
 - In the same folder, create a subfolder called `screenshots` (defined in `screenshotFolder` variable)
 - Define the URLs you want to process in `baseUrl` (string) and `links` (array) variables
 - Define your breakpoints in `breakpoints` (array) variable
 - In your terminal go to the folder where `screenshots-multipages.js` lives, and run

 $ casperjs screenshots-multipages.js

 * Your screenshots are generated in `screenshots` folder.
 *
 */
var casper      = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

    baseUrl     = "file:///C:/frontend/webui/build/index.html#/contract/e0e8e824-eebf-4276-af38-908d5df33fd2/docs",
    screenshotFolder = 'screenshots',
    links       = [
        '' // an empty string means the home page
        //,'news/business-23643700' // if you have more levels it would be something like /chapter1/errata/
    ],
    breakpoints = [
        1200
    ];

casper.start();
casper.log("START!", 'debug');

casper.on( 'page.error', function (msg, trace) {
    this.echo( 'Error: ' + msg, 'ERROR' );
});

casper.on( 'page.initialized', function(){
    this.evaluate(function(){
        var isFunction = function(o) {
            return typeof o == 'function';
        };

        var bind,
            slice = [].slice,
            proto = Function.prototype,
            featureMap;

        featureMap = {
            'function-bind': 'bind'
        };

        function has(feature) {
            var prop = featureMap[feature];
            return isFunction(proto[prop]);
        }

        // check for missing features
        if (!has('function-bind')) {
            // adapted from Mozilla Developer Network example at
            // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
            bind = function bind(obj) {
                var args = slice.call(arguments, 1),
                    self = this,
                    nop = function() {
                    },
                    bound = function() {
                        return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
                    };
                nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
                bound.prototype = new nop();
                return bound;
            };
            proto.bind = bind;
        }
    });
});

function nameFile(link, breakpoint) {
    var name;
    if (link === '') {
        name = 'home';
    } else {
        name = link;
    }
    return screenshotFolder + '/' + name.replace(/\//g, '_') + breakpoint + '.png';
}

links.forEach(function (link) {
    casper.open("file:///C:/frontend/webui/build/index.html#/token/set/Bearer%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0MzcwMzMxMzcsImFjY291bnQiOiJ7XCJ1c2VySWRcIjpcImNkOWEyMTBiLTE3NzktNDgwZS05OTkwLTY1ZTg0NmU0ZDRlOVwiLFwiZmlyc3ROYW1lXCI6XCJMaWxpYW5cIixcImxhc3ROYW1lXCI6XCJDYWxkZWlyYVwiLFwiZW1haWxcIjpcImxjYWxkZWlyYUBnbWFpbC5jb21cIixcInBpY3R1cmVIcmVmXCI6XCJodHRwczovL3MzLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3BhcmxleS9waG90b3MvTGlsaWFuLmpwZ1wiLFwiYWNjb3VudEhyZWZcIjpcImh0dHBzOi8vYXBpLnN0b3JtcGF0aC5jb20vdjEvYWNjb3VudHMvNEp0aFJ5ODdjbTVIVmRNUWxKN2dNRFwiLFwidG9rZW5JZFwiOlwiNTA1MWNkMjctMWY2My00N2U0LWEzZGItOGM0MGQ2NmIyMjllXCJ9In0.ssUQatmHySF1cKDv-KsQ7S9S8M0sAuUnqoklckygYE-a_1X2i_UGM8CD8YXvFSFTmdH8Lib98A_2viTBL10ukg").then(function(response) {
        //echoCurrentPage.call(this);
       // this.wait(6000);
        casper.log(response, 'debug');
        breakpoints.forEach(function (breakpoint) {
            casper.viewport(breakpoint, 800).capture(nameFile(link, breakpoint), {
                top: 0,
                left: 0,
                width: breakpoint,
                height: casper.evaluate(function() {
                    return 1200;
                })
            });
        });
    });

    casper.on( 'page.error', function (msg, trace) {
        this.echo( 'Error: ' + msg, 'ERROR' );
    });


    casper.thenOpen("file:///C:/frontend/webui/build/index.html#/contract/e0e8e824-eebf-4276-af38-908d5df33fd2/docs").then(function(response) {
        casper.log(response, 'debug');

        casper.waitWhileVisible(".document__paragraph-content", function() {
            //this.wait(3000);
            breakpoints.forEach(function (breakpoint) {
                casper.viewport(breakpoint, 800).capture(nameFile(link, breakpoint), {
                    top: 0,
                    left: 0,
                    width: breakpoint,
                    height: casper.evaluate(function() {
                        return 1200;
                    })
                });
            });

        },function() {
            casper.log("TIMEOUT!", 'debug');
        }, 60000);
    });
});

casper.run();