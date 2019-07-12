import { appModule } from '../../app';

function DataService ($http) {

  this.getRoomsData = () => $http.get('/api/rooms.json');

  this.getFormsData = () => $http.get('/api/consent-forms.json');

  this.getFormDetails = code => $http.get(`/api/consent-form-details/${code}.json`);
}

appModule
  .service('DataService', DataService);