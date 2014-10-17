angular
  .module('hugCircleIcon', [])
  .directive('hugCircleIcon', ['$compile', 'hugStyles', function($compile, hugStyles){
    'use strict';

    var css = hugStyles('hug-circle-icon')({
      '': {
        'font-size': '4ex',
        'display': 'inline-block',
        'vertical-align': 'middle',
        'border-radius': '50%',
        'overflow': 'hidden',
        'text-align': 'center',
        'color': '#fff',
        'width': '4ex',
        'height': '4ex',
        'line-height': '3.5ex'
      },
      '.circle': {
        'color': 'inherit',
        'display': 'block',
        'width': 'inherit',
        'height': 'inherit'
      },
      '.user': {
        'background': '#DCDCDC',
        'color': '#686868'
      },
      '.user hug-icon': {
        'font-size': '4ex'
      },
      '.facebook': {'background': '#465897'},
      '.twitter': {'background': '#598dca'},
      '.instagram': {'background': '#34618a'},
      '.google-plus': {'background': '#cb4024'},
      '.youtube': {'background': '#cc191d'},
      '.foursquare': {'background': '#F94877'},
      '.reclameaqui': {'background': '#208336'},
      '.orange': {'background': '#FF9832'},
      '.gray': {'background': '#A6A6A6 !important'},
      '.darkgray': {'background': '#818181 !important'}
    });

    return {
      restrict:'E',
      transclude:true,
      scope: {
        network: '='
      },
      template: window.multiline(function(){
        /*@preserve
           <span class="circle {{color || network}}">
           <hug-icon name="{{network || icon}}"> </hug-icon>
           </span>
         */console.log();
      }),
      compile: function(tElement, tAttr, transclude) {
        var contents = tElement.contents().remove();
        var compiledContents;
        return function(scope, iElement, iAttr) {

            //scope.network = iAttr.network;
          scope.color = iAttr.color;
          scope.icon = iAttr.icon;

          if(!compiledContents) {
            compiledContents = $compile(contents, transclude);
          }
          compiledContents(scope, function(clone ) {
            iElement.append(css).append(clone);
          });
        };
      }
    };
  }]);
