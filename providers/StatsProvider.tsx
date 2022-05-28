import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import { IStat } from '../types/stat';
import { useFirestoreContext } from './FirestoreProvider';

interface IStasContextProps {
  tankoins: IStat[];
  participants: IStat[];
}

const StatsContext = createContext<IStasContextProps>(null);

export const useStasContext = () => useContext<IStasContextProps>(StatsContext);

interface IStatsProviderProps {
  children: React.ReactNode;
}

const StatsProvider = ({ children }: IStatsProviderProps) => {
  const [tankoins, setTankoins] = useState<IStat[]>(null);
  const [participants, setParticipants] = useState<IStat[]>(null);

  const { firestore } = useFirestoreContext();

  useEffect(() => {
    (async () => {
      const docRef = doc(firestore, 'data/_');
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();

      const { participants, tankoins } = data;

      const participantsFiltered = participants.reduce((acc, curr) => {
        const existing = acc.find((t) => t.value === curr.value);
        if (!existing) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const tankoinsFiltered = tankoins.reduce((acc, curr) => {
        const existing = acc.find((t) => t.value === curr.value);
        if (!existing) {
          acc.push(curr);
        }
        return acc;
      }, []);

      setTankoins(tankoinsFiltered);
      setParticipants(participantsFiltered);
    })();
  }, []);

  if (!tankoins || !participants) {
    return <LoadingComponent fullscreen={true} />;
  }

  return (
    <StatsContext.Provider value={{ tankoins, participants }}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsProvider;
