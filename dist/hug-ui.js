!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.multiline=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	var match = str.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return str;
	}

	var indent = Math.min.apply(Math, match.map(function (el) {
		return el.length;
	}));

	var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');

	return indent > 0 ? str.replace(re, '') : str;
};

},{}],2:[function(require,module,exports){
'use strict';
var stripIndent = require('strip-indent');

// start matching after: comment start block => ! or @preserve => optional whitespace => newline
// stop matching before: last newline => optional whitespace => comment end block
var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

var multiline = module.exports = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function.');
	}

	var match = reCommentContents.exec(fn.toString());

	if (!match) {
		throw new TypeError('Multiline comment missing.');
	}

	return match[1];
};

multiline.stripIndent = function (fn) {
	return stripIndent(multiline(fn));
};

},{"strip-indent":1}]},{},[2])(2)
});
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

angular
  .module('hugUi', ['hugIcon', 'hugCircleIcon', 'hugCircleAvatar', 'hugAsyncAction', 'hugAlert', 'hugSpeech'])
  .factory('hugStyles', [function(){
      'use strict';

      // construtor de um array preenchido com as propriedades de dado objeto, mapeadas com dada função
      function Set(obj, mapper){
        Array.apply(this);
        for(var k in obj){
          if(obj.hasOwnProperty(k)){
            this.push(mapper(k, obj[k]));
          }
        }
      }
      Set.prototype = [];

      // construtor de uma regra
      function Rule(selectorStr, propertiesObj, preffix){
        function selectorToString(selector){
          return preffix + ' ' + selector.replace(/^\s+/, '').replace(/\s+$/, '');
        }
        function propertyToString(property, value){
          if(property === 'border-radius'){
            return '-webkit-border-radius:'+value+';-moz-border-radius:'+value+';border-radius:'+value;
          }
          if(property === 'border-top-right-radius'){
            return '-webkit-border-top-right-radius:'+value+';-moz-border-radius-topright:'+value+';border-top-right-radius:'+value;
          }
          if(property === 'border-top-left-radius'){
            return '-webkit-border-top-left-radius:'+value+';-moz-border-radius-topleft:'+value+';border-top-left-radius:'+value;
          }
          if(property === 'border-bottom-left-radius'){
            return '-webkit-border-bottom-left-radius:'+value+';-moz-border-radius-bottomleft:'+value+';border-bottom-left-radius:'+value;
          }
          if(property === 'border-bottom-right-radius'){
            return '-webkit-border-bottom-right-radius:'+value+';-moz-border-radius-bottomright:'+value+';border-bottom-right-radius:'+value;
          }
          return property + ':' + value;
        }
        this.selectors = selectorStr.split(',').map(selectorToString);
        this.properties = new Set(propertiesObj, propertyToString);
      }
      Rule.prototype.toString = function(){
        return this.selectors.join(', ') + '{' + this.properties.join(';') + '}';
      };

      // gera parseador prefixado
      return function(preffix){

        if(!preffix){
          console.warn('Avoid CSS leaking, prefixing your hugStyles.');
          preffix = '';
        }

        // gera css a partir de objeto
        return function(ruleset){
          var rules = new Set(ruleset, function(selectorStr, propertiesObj){
            return new Rule(selectorStr, propertiesObj, preffix);
          });
          return '<style type="text/css">\n' + rules.join('\n') + '\n</style>';
        };
      };
  }]);

angular
.module('hugReply', ['hugUser', 'hugSocialNetwork' ])
.constant('hugReplyConfig', {
  id: 0,
  comment: 'app/modules/hug-ui/hug-reply/tpl/facebook.comment.html',
  reply: 'app/modules/hug-ui/hug-reply/tpl/twitter.reply.html',
  dm: 'app/modules/hug-ui/hug-reply/tpl/twitter.dm.html',
  retweet: 'app/modules/hug-ui/hug-reply/tpl/twitter.retweet.html',

  commentInsta: 'app/modules/hug-ui/hug-reply/tpl/instagram.comment.html',

  methods:{
    comment : function(){},
    commentInsta : function(){},

    reply   : function(){},
    dm      : function(){},
    retweet : function(){},
  },

  facebook:{
    comment: {
      message: '',
    },
  },
  instagram:{
    commentInsta: {
      message: '',
    },
  },
  twitter:{
    reply: {
      message: '',
    },
    dm: {
      message: '',
    },
    retweet:{
      message: '',
    },
  },
})
.directive('hugReply', ['hugStyles', '$user', 'hugReplyConfig',   function(hugStyles, $user, $config){
  'use strict';
  var css = hugStyles('hug-reply')({
    '.tab': {
      'float': 'left',
      'cursor': 'pointer',
      'margin-right': '15px',
      'clear': 'left',
      'border-radius': '5px 5px 5px 5px',
      'border': '0',
      'padding': '0',
      'text-align': 'center',
      'width': '50px',
      'height': '25px',
      'margin-bottom': '10px',
      'box-shadow': 'none',
      'color': '#666',
      'background': '#ccc',
      'text-shadow': 'none',
      'line-height': '25px',
      'font-size': '16px',
      'position': 'relative',
    },
    '.tab.active':{
      'background': '#666',
      'color': '#fff',
      'border-radius': '5px 0 0 5px',
    },
    '.tabs-content':{
      'overflow': 'hidden'
    },
    '.tab.active:after':{
      'content': '""',
      'position': 'absolute',
      'width': '0',
      'height': '0',
      'border-style': 'solid',
      'border-width': '12px 10px',
      'border-color': 'transparent transparent transparent #666',
      'top': '0px',
      'left': 'auto',
      'bottom': 'auto',
      'right': '-20px',
      'z-index': 'auto',
    },
    'h4': {
      'font-size': '16px',
      'color': '#808080',
      'margin-bottom': '15px',
    },
    '.footer-form .buttons':{
      'float': 'right',
      'margin-top': '5px'
    },
    '.tabs-content .total-chars ':{
      'font-weight': 'bold',
      'font-size': '25px',
      'float': 'left',
      'color': '#555',
      'margin-top': '5px',
    },
    '.tabs-content .attachments ':{
      'display': 'none',
    }

  });


  return {
    restrict:'E',
    transclude:true,
    scope: {
      currentTab: '=',
      config: '=',
      name: '=',
      parentId: '=',
      index: '=',

      comment: '&',

      reply: '=',
      dm: '=',
      retweet: '=',


    },
    controller: function($scope){
      $scope.$user = $user;
      $scope.$config = $.extend( angular.copy($config), $scope.config);

      $scope.$config.id = ($scope.parentId) ? $scope.parentId: $scope.$config.id;

      $scope.$config.twitter.reply.message = $scope.reply ? $scope.reply : $scope.$config.twitter.reply.message ;
      $scope.$config.twitter.dm.message = $scope.dm ? $scope.dm : $scope.$config.twitter.dm.message ;
      $scope.$config.twitter.retweet.message = $scope.retweet ? $scope.retweet : $scope.$config.twitter.retweet.message ;

      $scope.$config.facebook.comment.message = $scope.comment ? $scope.comment : $scope.$config.facebook.comment.message ;



      $scope.changeTab = function(index){
        if( $scope.currentTab === index) {
          $scope.currentTab = -1;
          $scope.formTplUrl = '';
        }
        else {
          $scope.currentTab = index;
          $scope.formTplUrl = 'form.html';
        }
      };

    },
    template: css + window.multiline( function(){
      /*@preserve
        <div class='action-handson'>
        <div class="hug-reply">
        <ul>
        <li ng-repeat="c in $user.socialNetwork.getSocialChannels()  track by $index "  ng-show="c.name === '{{name}}'">
        <a  class="tab" ng-repeat="a in $user.socialNetwork.getFormActions(c.name) track by $index" class="icon btn" ng-class="{active: currentTab == $index}" ng-click="changeTab($index, i)">
        <hug-icon name="{{a.icon}}"></hug-icon>
        </a>
        <div class="tabs-content" ng-repeat="content in $user.socialNetwork.getFormActions(c.name) track by $index" ng-show="$index === currentTab">
        <div ng-include="$config[content.name]"></div>
        </div>
        </li>
        </ul>
        </div>
        </div>
        */console.log();
    }),
  };
}]);




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
