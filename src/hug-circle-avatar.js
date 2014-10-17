angular
  .module('hugCircleAvatar', [])
  .directive('hugCircleAvatar', ['$compile', 'hugStyles', function($compile, hugStyles){
    'use strict';

    var css = hugStyles('hug-circle-avatar')({
      '': {
        'position': 'relative',
        'display': 'block',
        'width': 'auto',
        'height': 'auto',
        'line-height': 'auto'
      },
      'hug-circle-icon:not(.none)': {
        'position': 'absolute',
        'font-size': '1.3ex',
        'box-shadow': ' -0.2ex -0.2ex #fff, -0.2ex 0.2ex #fff',
        'top': 'auto',
        'left': 'auto',
        'right': '-2ex',
        'bottom': '0ex'
      },
      'hug-circle-icon.left, hug-circle-icon.right': {
        'top': '33%',
        'bottom': 'auto',
      },
      'hug-circle-icon.left': {
        'left': '-2.3ex',
        'right': 'auto',
        'box-shadow': ' 0.2ex 0.2ex #fff, 0.2ex -0.2ex #fff',
      },
      'hug-circle-icon.right': {
        'left': 'auto',
        'right': '-2.3ex'
      },
      '.hug-avatar': {
        'margin': '0',
        'display': 'inline-block',
        'position': 'relative'
      },
      '.hug-avatar > img, .hug-avatar > no-image': {
        'border-radius' : '50%',
        'width'         : '5.9ex',
        'height'        : '5.9ex',
        'line-height'   : '5.9ex',
      },
      '.hug-avatar > no-image': {
        'display': 'inline-block',
        'position': 'relative',
        'text-align': 'center',
      },
      '.hug-avatar > no-image:after': {
        'position': 'absolute',
        'font-family': '"mylib"',
        'font-size': '5.9ex',
        'content': '"\\38"',
        'line-height': '2ex',
        'width': 'inherit',
        'height': 'inherit',
        'color': '#8a8a8a',
        'background': '#dcdcdc',
        'overflow': 'hidden',
        'border-radius': '50%',
        'top': '0',
        'left': '0',
      },
      '.hug-avatar.atendente > no-image:after': {
        'font-family': '"mylib"',
        'position': 'absolute',
        'content': '"\\e60d"',
        'color': '#000 ',
      },
    });

    return {
      restrict:'E',
      transclude:true,
      scope: {
        network: '='
      },
      template: window.multiline( function(){
      /*@preserve
        <figure class="hug-avatar {{type}}">
          <img  ng-src="{{img}}" alt="" class="">
          <hug-circle-icon class="{{networkPosition}} {{networkNone}}" network="network"></hug-circle-icon>
          <span ng-transclude></span>
        </figure>
        */console.log();
      }),
      compile: function(tElement, tAttr, transclude) {
        var contents = tElement.contents().remove();
        var compiledContents;
        return function(scope, iElement, iAttr) {
          scope.img = iAttr.img ||'/img/user-default.png';
          scope.networkNone = scope.network || 'none';
          scope.type = iAttr.type || '';
          scope.networkPosition = iAttr.networkPosition;
          if(!compiledContents) {
            compiledContents = $compile(contents, transclude);
          }
          compiledContents(scope, function(clone ) {
            iElement.append(css).append(clone);
          });
        };
      }
    };

  }])
  // trata a imagem quando não vem nenhuma
  .directive('img', function(){
    'use strict';
    return {
        restrict:'E',
        link:function(scope,element){
            element.error(function(){
                $(this).after('<no-image></no-image>');
                $(this).hide();
            });
        }
    };
});
