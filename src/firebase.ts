import { getApps, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBC6G9-u9jLdhyxF4_YnnLYVgQWBMgr8IM',
  authDomain: 'patient-data-take-home.firebaseapp.com',
  projectId: 'patient-data-take-home',
  storageBucket: 'patient-data-take-home.appspot.com',
  messagingSenderId: '763679026699',
  appId: '1:763679026699:web:d2466b9ea5ef3daf30610e',
}

if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}
