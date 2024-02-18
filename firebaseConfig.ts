import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const addWord = async (word: Word): Promise<string> => {
  const docRef = await addDoc(collection(database, 'WORDS'), {
    KOREAN_NAME: word.KOREAN_NAME,
    ENGLISH_NAME: word.ENGLISH_NAME,
    DESCRIPTION: word.DESCRIPTION
  });
  return docRef.id;
}

export const deleteWord = async (id: string): Promise<void> => {
  const wordRef = await deleteDoc(doc(database, 'WORDS', id));
}

export const getWords = async (): Promise<Word[]> => {
  const querySnapshot = await getDocs(collection(database, 'WORDS'));

  let arrayWords: Word[] = [];
  querySnapshot.forEach((element) => {
    const data = element.data();
    const word: Word = {
      ID: element.id,
      KOREAN_NAME: data.KOREAN_NAME,
      ENGLISH_NAME: data.ENGLISH_NAME,
      DESCRIPTION: data.DESCRIPTION
    }
    arrayWords.push(word);
  });

  return arrayWords;
}