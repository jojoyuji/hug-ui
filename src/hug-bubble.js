angular
.module('hugBubble', [])
.directive('hugBubble', ['$compile', 'hugStyles', function($compile, hugStyles){
  'use strict';
  var css = hugStyles('hug-bubble')({
    '':{
      'background': '#fb6a64',
      'color': 'white',
      'display': 'inline-block',
      'height': '3ex',
      'padding': '0 .8ex',
      'line-height': '2.8ex',
      'font-weight': 'bold',
      'border-radius': '4ex',
      'text-align': 'center',
    }
  });

  return {
    restrict:'E',
    transclude:true,
    scope: {                                                            
      value: '=',
    },
    template: css + '<span class="hug-bubble-wrapper" ng-bind="value"></span>',
    //link:function(scope, element, attr){ }
  };
}]);
