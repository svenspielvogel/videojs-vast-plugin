/*! videojs-flimme - v0.0.0 - 2015-11-30 */

(function(window, videojs, qunit) {
    'use strict';

    var realIsHtmlSupported,
        player,

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

    module('videojs-flimme', {
        setup: function() {
            // force HTML support so the tests run in a reasonable
            // environment under phantomjs
            realIsHtmlSupported = videojs.getTech('Html5').isSupported;
            videojs.getTech('Html5').isSupported = function() {
                return true;
            };

            // create a video element
            var video = document.createElement('video');
            document.querySelector('#qunit-fixture').appendChild(video);

            // create a video.js player
            player = videojs(video);

            // initialize the plugin with the default options
            player.ads();
            player.vast({
                type: 'post',
                offset: 3,
                url: 'http://videoads.theonion.com/vast/270.xml'
            });
        },
        teardown: function() {
            videojs.getTech('Html5').isSupported = realIsHtmlSupported;
        }
    });

    test('registers itself', function() {
        ok(player.vast, 'registered the plugin');
    });
})(window, window.videojs, window.QUnit);