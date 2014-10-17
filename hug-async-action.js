angular.module('hugAsyncAction', []);
angular.module('hugAsyncAction').directive('hugAsyncAction', function($q){
  'use strict';

  return function link($scope, $element, $attrs) {
    var busy = false;
    $element.on('click', function(event){
      event.preventDefault();
      if(busy) {
        return;
      }
      $scope.$event = event;
      busy = true;
      $($element).fadeTo('quick', 0.3);
      $q.when($scope.$eval($attrs.hugAsyncAction)).then(function(){
        busy = false;
        $($element).fadeTo('quick', 1);
      });
    });
  }
});
