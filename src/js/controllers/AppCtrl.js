import { appModule } from '../../app';

const AppCtrl = function(dataSvc, mdDialog) {

  let app = this;

  app.loading = true;

  dataSvc
    .getRoomsData()
    .then(({data: rooms}) => {
      app.rooms = rooms;
      app.loading = false;
    });

  app.getAmTime = time => time + (parseInt(time, 10) > 12 ? ' PM' : ' AM');

  app.showInfo = (ev, data) => {
    mdDialog.show({
      locals: {roomData: data},
      controller: 'InfoCtrl as info',
      template: require('../../views/info.html'),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
  };
};

AppCtrl.$inject = ['DataService', '$mdDialog'];

appModule
  .controller('AppCtrl', AppCtrl);
