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



