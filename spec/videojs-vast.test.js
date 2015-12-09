/*! videojs-flimme - v0.0.0 - 2015-11-30 */

(function(window, videojs, qunit) {
    'use strict';

    var realIsHtmlSupported,
        player,
        oldClearImmediate,

    // local QUnit aliases
    // http://api.qunitjs.com/

    // module(name, {[setup][ ,teardown]})
        module = qunit.module,
    // test(name, callback)
        test = qunit.test,
    // ok(value, [message])
        ok = qunit.ok,
    // equal(actual, expected, [message])
        equal = qunit.equal,
    // strictEqual(actual, expected, [message])
        strictEqual = qunit.strictEqual,
    // deepEqual(actual, expected, [message])
        deepEqual = qunit.deepEqual,
    // notEqual(actual, expected, [message])
        notEqual = qunit.notEqual,
    // throws(block, [expected], [message])
        throws = qunit.throws;

    console.log(equal,strictEqual,deepEqual,notEqual,throws);

    module('videojs-vast', {
        beforeEach: function() {
            console.log("before");
            // force HTML support so the tests run in a reasonable
            // environment under phantomjs
            realIsHtmlSupported = videojs.getTech('Html5').isSupported;
            videojs.getTech('Html5').isSupported = function() {
                return true;
            };

            // create a video element
            var video = document.createElement('video');
            video.src = "http://vjs.zencdn.net/v/oceans.mp4";
            video.setAttribute = "controls";

            document.querySelector('#qunit-fixture').appendChild(video);

            // provide implementations for any video element functions that are
            // used in the tests
            video.load = function() {};
            video.play = function() {};

            // see https://github.com/videojs/videojs-contrib-ads/blob/master/test/videojs.ads.test.js#L23
            window.setImmediate = function(callback) {
                callback.call(window);
            };
            oldClearImmediate = window.clearImmediate;

            // create a video.js player
            player = videojs(video);
            player.volume(0);
        },
        afterEach: function() {
            videojs.getTech('Html5').isSupported = realIsHtmlSupported;
            window.clearImmediate = oldClearImmediate;
        }
    });

    test('plugin registrations', function() {
        console.log("test");

        ok(player.vast, 'registered VAST');
        ok(player.ads, 'registered ADS');
        equal(typeof(player.vast), 'function');
        equal(typeof(player.ads), 'function');

    });

    test('false setup', function(){
        console.log("test");

        equal(typeof(player.vast), 'function');
        player.ads();
        player.vast({});
        console.log("test");

        equal(player.vast.sources, undefined);
        player.play();
        player.on("play",function(){
            console.log(player);
        });

    });

    test('provided setup', function(){
        console.log("test");
        // initialize the plugin with the default options
        player.ads();
        player.vast({
            type: 'post',
            offset: 3,
            url: 'sample-vast.xml'
        });
        equal(typeof(player.vast), 'object');
    });

})(window, window.videojs, window.QUnit);