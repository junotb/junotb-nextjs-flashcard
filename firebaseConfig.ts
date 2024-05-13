import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const addWord = async (word: Word): Promise<string> => {
  const docRef = await addDoc(collection(database, 'words'), {
    korean_name: word.korean_name,
    english_name: word.english_name,
    description: word.description
  });
  return docRef.id;
}

export const deleteWord = async (id: string): Promise<void> => {
  const wordRef = await deleteDoc(doc(database, 'words', id));
}

export const getWords = async (): Promise<Word[]> => {
  const querySnapshot = await getDocs(collection(database, 'words'));

  let arrayWords: Word[] = [];
  querySnapshot.forEach((element) => {
    const data = element.data();
    const word: Word = {
      id: element.id,
      korean_name: data.korean_name,
      english_name: data.english_name,
      description: data.description
    }
    arrayWords.push(word);
  });

  return arrayWords;
}