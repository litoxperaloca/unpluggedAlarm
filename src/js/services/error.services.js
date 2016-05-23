pmb_im.services.factory('ErrorService', ['ValidationService', function($http,$ionicPopup,ValidationService) {

  return {
    check_fields: function (fields, errorContainerId) {
      var errors = "";
      fields.forEach(function(field) {
        if(field.type=="notNull"){
          if(!ValidationService.validate_not_empty(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no puede estar vacío.</h3>';
          }
        }
        if(field.type=="email"){
          if(!ValidationService.validate_email(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no es una dirección de correo válida.</h3>';
          }
        }
        if(field.type=="iddoc_uy"){
          if(!ValidationService.validate_iddoc_uy(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no es una cédula uruguaya válida.</h3>';
          }
        }
        if(field.type=="two_words"){
          if(!ValidationService.validate_two_words(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" debe contener al menos dos palabras.</h3>';
          }
        }
      });
      if(errors ==""){
        return true;
      }else{
        var errorDiv = document.getElementById(errorContainerId);
        errorDiv.innerHTML= errors;
        errorDiv.style.display = "block";
        return false;
      }
    }


  };
}]);
