import { NextApiRequest, NextApiResponse } from 'next';

import fetch from 'node-fetch';
import { useFirebaseOnServer } from '../../server/firebase';
import { IStat } from '../../types/stat';

const url = 'https://tankionline.com/pages/tanki-birthday-2022/?lang=en';

interface ScrapeResults {
  tankoins: number;
  participants: number;
}

const scrape = async (): Promise<ScrapeResults> => {
  const request = await fetch(url);
  const html = await request.text();

  const fundHtml = /<span class="ms-3">(.*?)<\/span>/g;
  const foundFund = html.match(fundHtml);

  const participantsHtml = /<span class="members">(.*?)<\/span>/g;
  const foundParticipants = html.match(participantsHtml);

  if (!foundFund || !foundParticipants) {
    throw new Error('Could not find scrape results');
  }

  let tankoins = parseInt(foundFund[0].replace(/[^0-9]/g, '').substring(1));
  const participants = parseInt(foundParticipants[0].replace(/[^0-9]/g, ''));

  return {
    tankoins,
    participants,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = useFirebaseOnServer();
  const firestore = firebase.firestore();

  const docRef = firestore.doc('data/_');
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    throw new Error('Could not find data to update');
  }

  const data = docSnapshot.data() as {
    tankoins: IStat[];
    participants: IStat[];
  };

  const { tankoins, participants } = await scrape();

  data.tankoins.push({
    date: Date.now(),
    value: tankoins,
  });

  data.participants.push({
    date: Date.now(),
    value: participants,
  });

  await docRef.set(data);

  res.status(200).json(data);
};

export default handler;
