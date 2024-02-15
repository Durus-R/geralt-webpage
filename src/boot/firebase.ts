import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'
import { boot } from 'quasar/wrappers';
import { VueFire } from 'vuefire';


const firebaseConfig = {
  apiKey: 'AIzaSyBvCYVmpQx4KV_DvLQ4frMUQtDV9wJPrn8',
  authDomain: 'geralt-counter.firebaseapp.com',
  projectId: 'geralt-counter',
  storageBucket: 'geralt-counter.appspot.com',
  messagingSenderId: '381257378712',
  appId: '1:381257378712:web:85a48cbe92d45084a359ed',
  measurementId: 'G-V1B02WSK7B'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
//const analytics = getAnalytics(fb_app);

export default boot(async ({ app}) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [],
  })})

export { firebaseApp, firestore }
