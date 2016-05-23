pmb_im.services.factory('SmsService', ['$cordovaSms', function($cordovaSms) {

  return {
    sendSMS: function (number,text) {
        if(number && text){
          var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
              intent: '' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
            }
          };

          return $cordovaSms.send(number, text, options);
        }else{
          return false;
        }
    }
  };
}]);
