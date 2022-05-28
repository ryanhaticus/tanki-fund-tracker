import '../styles/globals.css';

import FirebaseProvider from '../providers/FirebaseProvider';
import FirestoreProvider from '../providers/FirestoreProvider';
import StatsProvider from '../providers/StatsProvider';

import { DefaultSeo } from 'next-seo';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo titleTemplate='%s - Tanki Fund Tracker' title='Welcome' />
      <FirebaseProvider>
        <FirestoreProvider>
          <StatsProvider>
            <Component {...pageProps} />
          </StatsProvider>
        </FirestoreProvider>
      </FirebaseProvider>
    </>
  );
};

export default App;
