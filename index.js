angular
  .module('hugUi', ['hugIcon', 'hugCircleIcon', 'hugCircleAvatar', 'hugAsyncAction', 'hugAlert'])
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
