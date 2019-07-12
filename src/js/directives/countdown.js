import { appModule } from '../../app';

appModule.directive('countdown', function ($interval) {
  return {
    restrict: 'E',
    scope: {
      countdownStart: '='
    },
    template: '<div>{{countdownStart | date: "hh:mm:ss"}}</div>',
    link: function (scope) {
      $interval(() =>{
        scope.countdownStart -= 100;
      }, 100);
    }
  }
});