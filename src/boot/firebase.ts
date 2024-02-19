import { initializeApp } from 'firebase/app';
import 'firebase/firestore'
import { boot } from 'quasar/wrappers';
import { VueFire, VueFireAppCheck, VueFireModule } from 'vuefire';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { Cookies } from 'quasar';


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

const vueFireModules :  VueFireModule[] = []



const RecaptchaProvider = new ReCaptchaEnterpriseProvider('6LeSi3cpAAAAABfvbjBMj_XWvlXjAnnKuODkeLJe')

export default boot(async ({ app}) => {
  if (Cookies.has('site_cookies_enabled')) {
  vueFireModules.push(VueFireAppCheck({
    provider: RecaptchaProvider,
    debug: process.env.DEBUGGING,
    isTokenAutoRefreshEnabled: true,
  }))}

  app.use(VueFire, {
    firebaseApp,
    modules: vueFireModules,
  })})

export { firebaseApp }
