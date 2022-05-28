import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = `{
  "projectId": "${process.env.FIREBASE_PROJECT_ID}",
  "privateKey": "${process.env.FIREBASE_PRIVATE_KEY}",
  "clientEmail": "${process.env.FIREBASE_CLIENT_EMAIL}"
}`;

export const useFirebaseOnServer = () => {
  if (admin.apps.length === 0) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(serviceAccount) as ServiceAccount,
      ),
      databaseURL: 'https://fund-tracker-68a7b.firebaseio.com',
    });
    return app;
  }
  return admin.app();
};
