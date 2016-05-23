pmb_im.controllers.controller('IntroCtrl', ['$scope', '$rootScope', '$ionicPlatform',
  'SmsService',
  'DBService',
  'ErrorService',
  'ValidationService',
  '$cordovaBatteryStatus',
  function($scope, $rootScope, $ionicPlatform, SmsService, DBService, ErrorService, ValidationService, $cordovaBatteryStatus) {

    $scope.lastStatus = true;

    $ionicPlatform.ready(function(){
      DBService.initDB();
      $rootScope.$on("$cordovaBatteryStatus:status", function(event, args){
        $scope.batteryLevel = args.level;
        $scope.isPluggedIn = args.isPlugged;
        var config = DBService.getConfig();
        config.then(function (doc) {
          if(doc.systemEnabled){
            if($scope.lastStatus && !args.isPlugged){
              //Device got unplugged
              $scope.lastStatus = false;
              document.getElementById("loader").style.display = "block";
              if(doc.smsOnUnplugged){
                SmsService.sendSMS(doc.destinationNumber,'Se ha disparado la alarma.').then(function() {
                  document.getElementById('statusContainer').innerHTML="Se ha enviado sms avisando que se abrió la puerta.";
                  // Success! SMS was sent
                  document.getElementById("loader").style.display = "none";
                }, function(error) {
                  document.getElementById('statusContainer').innerHTML="Hubo un error al enviar el sms. " + error;
                  document.getElementById("loader").style.display = "none";
                  // An error occurred
                });
              }else{
                document.getElementById('statusContainer').innerHTML="Se desconectó la alarma. Está deshabilitado el envió de sms al desconectarse.";
                document.getElementById("loader").style.display = "none";
              }
            }else{
              if(!$scope.lastStatus && args.isPlugged){
                //Alarm just got armed
                if(doc.smsOnArm){
                  $scope.lastStatus = true;
                  SmsService.sendSMS(doc.destinationNumber,'Se ha disparado la alarma.').then(function() {
                    document.getElementById('statusContainer').innerHTML="Alarma lista. Se ha enchufado el cel.";
                    // Success! SMS was sent
                    document.getElementById("loader").style.display = "none";
                  }, function(error) {
                    document.getElementById('statusContainer').innerHTML="Hubo un error al enviar el sms. " + error;
                    document.getElementById("loader").style.display = "none";
                    // An error occurred
                  });
                }else{
                  $scope.lastStatus = true;
                  document.getElementById('statusContainer').innerHTML="Alarma lista. Se ha enchufado el cel.";
                }
              }else{
                if($scope.lastStatus && args.isPlugged){
                  document.getElementById('statusContainer').innerHTML="Alarma lista!";
                }
              }
            }
          }else{
            $scope.lastStatus = false;
            document.getElementById('statusContainer').innerHTML="Alarma desactivada.";
          }
        }).catch(function (err) {
          $scope.lastStatus = false;
          document.getElementById('statusContainer').innerHTML="Alarma desactivada. Para activarla, primero debe configurarla.";
        });
      });
    });


  }
]);
