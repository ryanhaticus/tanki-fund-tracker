import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import { useFirebaseContext } from './FirebaseProvider';

interface IFirestoreContextProps {
  firestore: Firestore;
}

const FirestoreContext = createContext<IFirestoreContextProps>(null);

export const useFirestoreContext = () =>
  useContext<IFirestoreContextProps>(FirestoreContext);

interface IFirestoreProviderProps {
  children: React.ReactNode;
}

const FirestoreProvider = ({ children }: IFirestoreProviderProps) => {
  const { app } = useFirebaseContext();

  const [firestore, setFirestore] = useState<Firestore>(null);

  useEffect(() => {
    const firestore = getFirestore(app);

    setFirestore(firestore);
  }, []);

  if (!firestore) {
    return <LoadingComponent fullscreen={true} />;
  }

  return (
    <FirestoreContext.Provider value={{ firestore }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
