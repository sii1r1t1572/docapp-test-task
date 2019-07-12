import { appModule } from '../../app';

const InfoCtrl = function(dataSvc, room) {

  let info = this;

  info.selected = [];
  info.tabs = {};
  info.room = room;
  info.clientInitials = room.appointment.first_name[0] + room.appointment.last_name[0];
  info.vs = room.appointment.vital_signs;

  dataSvc
    .getFormsData()
    .then(({data: forms}) => {
      info.forms = forms;
    });

  info.getClientInfo = () => {
    let birthday = '',
        gender = room.appointment.gender[0],
        title = room.appointment.is_doctor ? 'Dr' : gender === 'M' ? 'Mr' : 'Ms';

    if(room.appointment.birthday)
      birthday = new Date().getFullYear() - room.appointment.birthday.split('/')[2] + ' years, ';

    return `${title}. ${room.appointment.first_name} ${room.appointment.last_name}, ${birthday}${gender}`;
  };

  info.toggle = function (item) {
    let idx = info.selected.indexOf(item);

    idx > -1 ? info.selected.splice(idx, 1) : info.selected.push(item);
  };

  info.exists = item => info.selected.indexOf(item) > -1;

  info.isIndeterminate = () => info.selected.length !== 0 && info.selected.length !== info.forms.length;

  info.isChecked = () => info.forms && info.selected.length === info.forms.length;

  info.toggleAll = function() {
    if (info.isChecked()) {
      info.selected = [];
    } else if (info.selected.length === 0 || info.selected.length > 0) {
      info.selected = info.forms.slice(0);
    }
  };

  info.loadTabData = tab => {
    if(!info.tabs[tab.code]){
      dataSvc
        .getFormDetails(tab.code)
        .then(({data: tabData}) => {
          info.tabs[tab.code] = tabData;
      });
    }
  };
};

InfoCtrl.$inject = ['DataService', 'roomData'];

appModule
  .controller('InfoCtrl', InfoCtrl);
