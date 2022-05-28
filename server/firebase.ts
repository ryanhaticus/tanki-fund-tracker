import admin from 'firebase-admin';

const serviceAccount = require('./account.json');

export const useFirebaseOnServer = () => {
  if (admin.apps.length === 0) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://fund-tracker-68a7b.firebaseio.com',
    });
    return app;
  }
  return admin.app();
};
