'use client'

import Modal from '@/components/Modal';
import { getWords } from '../firebaseConfig';
import { useEffect, useState } from 'react';

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleGetWords = async () => {
    try {
      const arrayWords: Word[] = await getWords();
      console.log(arrayWords);
      setWords(arrayWords);
      setIsActive(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const handleIsActive = () => setIsActive(!isActive);

  useEffect(() => {
    console.log()
    handleGetWords();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-start items-center border-b px-4 w-full h-20 bg-neutral-800">
        <h1 className="text-2xl font-bold">Flashcard</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto p-6 gap-6">
        {
          words.map((word) => 
            <div
              key={word.id}
              className="flex flex-col gap-2 border p-4 w-60 h-[20rem] bg-black hover:bg-neutral-800 rounded-lg"
            >
              <h3 className="border-b pb-2 text-lg font-semibold">{word.korean_name}&nbsp;({word.english_name})</h3>
              <h4>{word.description}</h4>
            </div>
          )
        }
        <div
          onClick={handleIsActive}
          className="flex justify-center items-center border w-60 h-[20rem] bg-black hover:bg-neutral-800 rounded-lg"
        >
          <span className="text-6xl" aria-hidden="true">+</span>
        </div>
      </div>
      {
        isActive &&
        <Modal
          handleIsActive={handleIsActive}
          handleGetWords={handleGetWords}
        />
      }
    </div>
  )
};