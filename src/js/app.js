// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'pmb_im' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var pmb_im = {
  controllers: angular.module('pmb_im.controllers', []),
  services: angular.module('pmb_im.services', [])
};

pmb_im.app = angular.module('pmb_im', ['ionic','ionic.wizard','pmb_im.controllers', 'pmb_im.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.VERSION = window.VERSION;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'SmsAlarm going to background.'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    window.powerManagement.dim(function() {
      console.log('Wakelock acquired');
    }, function() {
      console.log('Failed to acquire wakelock');
    });
    window.powerManagement.setReleaseOnPause(false, function() {
      console.log('setReleaseOnPause successfully');
    }, function() {
      console.log('Failed to set');
    });


    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        setTimeout(function () {
            // Modify the currently displayed notification
            cordova.plugins.backgroundMode.configure({
                text:'SmsAlarm running in background for more than 5s now.'
            });
        }, 5000);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider) {
  $compileProvider.debugInfoEnabled(true);
  $ionicConfigProvider.scrolling.jsScrolling(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    cache: false,
    url: "/app",
    abstract: true,
    templateUrl: "templates/alarm.html",
    controller: 'IntroCtrl'
  })

.state('app.intro', {
  cache: false,
  url: "/intro",
  views: {
    'menuContent' :{
      templateUrl: "templates/alarm.html",
      controller : "IntroCtrl"
    }
  }
})

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/intro');

});
