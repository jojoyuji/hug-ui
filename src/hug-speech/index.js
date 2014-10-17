angular
.module('hugSpeech', ['hugCircleAvatar'])
.directive('hugSpeech', ['$compile', 'hugStyles', function($compile, hugStyles){
  'use strict';

  /***************
   *  modifiers:
   *
   *  hug-speech-layout: left || right
   *  hug-speech-style: bordered && small
   *
   ***************/
  return {
    restrict:'E',
    transclude:true,
    //scope: {
    //value: '=',
    //},
    template: '<div class="talk" ng-transclude></div>',
    //link:function(scope, element, attr){ }
  };
}]);
