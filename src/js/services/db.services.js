pmb_im.services.factory('DBService', ['$q', function($q) {
   var _db;

   return {
       initDB: initDB,
       saveConfig: saveConfig,
       getConfig: getConfig,
   };

   function saveConfig(adminPassword, systemEnabled, destinationNumber, smsOnArm, smsOnDisarm, smsOnUnplugged) {
         var config = {
            _id: 'config-options',
            adminPassword: adminPassword,
            systemEnabled: systemEnabled,
            destinationNumber: destinationNumber,
            smsOnArm: smsOnArm,
            smsOnDisarm: smsOnDisarm,
            smsOnUnplugged: smsOnUnplugged
         };
         getConfig().then(function (doc) {
           config._rev = doc._rev;
           return _db.put(config);
         }).catch(function (err) {
           return _db.put(config);
         })
   };

  function getConfig() {
     return _db.get('config-options');
  };

  function initDB() {
       // Creates the database or opens if it already exists
       _db = new PouchDB('unpluggedAlarm_local_db');
       return _db;
  };

}]);
