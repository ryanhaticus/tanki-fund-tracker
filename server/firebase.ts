import admin from 'firebase-admin';

export const useFirebaseOnServer = () => {
  if (admin.apps.length === 0) {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: 'https://fund-tracker-68a7b.firebaseio.com',
    });
    return app;
  }
  return admin.app();
};
