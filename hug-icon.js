angular.module('hugIcon', []).directive('hugIcon', function(hugStyles){
  'use strict';

  var css = hugStyles('hug-icon')({
    '[class^="icon-"], [class*=" icon-"]': {
      'position': 'relative',
      'z-index': 1,
      'display': 'inline',
      'line-height': '1.5'
    },
    '[class="icon-reclameaqui"]:before': {
      'content': '"RA"',
      'font-family': 'scada, Tahoma',
      'font-weight': 'bold'
    }
  });
  return {
    restrict:'E',
    transclude:true,
    scope: {name: '@'},
    template: css + '<i class="icon-{{name}}"></i>'
  };
});
