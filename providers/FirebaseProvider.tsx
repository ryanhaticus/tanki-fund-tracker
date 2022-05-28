import { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import LoadingComponent from '../components/LoadingComponent';

interface IFirebaseContextProps {
  app: FirebaseApp;
}

const FirebaseContext = createContext<IFirebaseContextProps>(null);

export const useFirebaseContext = () =>
  useContext<IFirebaseContextProps>(FirebaseContext);

interface IFirebaseProviderProps {
  children: React.ReactNode;
}

const FirebaseProvider = ({ children }: IFirebaseProviderProps) => {
  const [app, setApp] = useState<FirebaseApp>(null);

  useEffect(() => {
    const apps = getApps();

    if (apps.length > 0) {
      return;
    }

    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });

    setApp(app);
  }, []);

  if (!app) {
    return <LoadingComponent fullscreen={true} />;
  }

  return (
    <FirebaseContext.Provider value={{ app }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
