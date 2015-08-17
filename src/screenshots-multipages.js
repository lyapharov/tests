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
var casper      = require('casper').create(),
    baseUrl     = "http://www.bbc.co.uk/",
    screenshotFolder = 'screenshots',
    links       = [
        '', // an empty string means the home page
        'news/business-23643700' // if you have more levels it would be something like /chapter1/errata/
    ],
    breakpoints = [
        400,
        600,
        900,
        1200
    ];

casper.start();

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
    casper.thenOpen(baseUrl + link, function () {
        breakpoints.forEach(function (breakpoint) {
            casper.viewport(breakpoint, 800).capture(nameFile(link, breakpoint), {
                top: 0,
                left: 0,
                width: breakpoint,
                height: casper.evaluate(function() {
                    return document.body.scrollHeight;
                })
            });
        });
    });
});

casper.run();