angular.module('hugAlert', []).directive('hugAlert', function() {
  'use strict';

  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      'title': '@'
    },
    link: function($scope, $element, $attrs){
      $scope.collapsed = typeof $attrs.collapsed !== 'undefined' && ['0', 'false'].indexOf($attrs.collapsed) === -1;
      $scope.level = $attrs.level || 'info';
      $scope.icon = $attrs.icon || $scope.level;
      $scope.toggle = function(){
        $scope.collapsed = !$scope.collapsed;
      };
    },
    template: window.multiline(function(){
      /*@preserve
        <div class="alert alert-{{level}}">
          <h6 ng-click="toggle()" ng-if="title">
            <span class="circle"><hug-icon name="{{icon}}"></hug-icon></span> {{title}}
          </h6>
          <div ng-if="!collapsed" ng-transclude></div>
        </div>
      */console.log();
    })
  };
});
