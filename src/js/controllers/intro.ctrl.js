pmb_im.controllers.controller('IntroCtrl', ['$scope', '$rootScope', '$ionicPlatform',
  'SmsService',
  '$cordovaBatteryStatus',
  function($scope, $rootScope, $ionicPlatform, SmsService, $cordovaBatteryStatus) {

    $scope.lastStatus = true;

    $ionicPlatform.ready(function(){
      $rootScope.$on("$cordovaBatteryStatus:status", function(event, args){
        console.log(args);
        $scope.batteryLevel = args.level;
        console.log($scope.batteryLevel);
        $scope.isPluggedIn = args.isPlugged;
        console.log($scope.isPluggedIn);
        if($scope.lastStatus && !args.isPlugged){
          $scope.lastStatus = false;
          document.getElementById("loader").style.display = "block";
          SmsService.sendSMS('099725534','Se ha disparado la alarma.').then(function() {
            document.getElementById('statusContainer').innerHTML="Se ha enviado sms avisando que se abrió la puerta.";
            // Success! SMS was sent
            document.getElementById("loader").style.display = "none";
          }, function(error) {
            document.getElementById('statusContainer').innerHTML="Hubo un error al enviar el sms. " + error;
            document.getElementById("loader").style.display = "none";
            // An error occurred
          });
        }else{
          if(!$scope.lastStatus && args.isPlugged){
            $scope.lastStatus = true;
            document.getElementById('statusContainer').innerHTML="Alarma armada. Se ha enchufado el cel.";
          }else{
            if($scope.lastStatus && args.isPlugged){
              document.getElementById('statusContainer').innerHTML="Alarma lista!";
            }
          }
        }
      });
    });


  }
]);
