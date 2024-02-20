'use client'

import Modal from '@/components/Modal';
import { deleteWord, getWords } from '../firebaseConfig';
import { useEffect, useState } from 'react';

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleGetWords = async () => {
    setWords([]);
    try {
      const arrayWords: Word[] = await getWords();
      setWords(arrayWords);
      setIsHidden(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const handleDeleteWord = async (id: string) => {
    try {
      await deleteWord(id);
      handleGetWords();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const handleIsHidden = () => setIsHidden(!isHidden);

  useEffect(() => {
    handleGetWords();
  }, []);

  return (
    <main className='w-screen h-screen sm:p-24'>
      <div className='flex flex-row justify-between p-4'>
        <h1 className='text-2xl font-bold'>Serverless Notes</h1>
        <button
          onClick={handleIsHidden}
          className='z-10 px-4 font-bold bg-white text-violet-950 rounded-xl hover:bg-slate-400 active:bg-slate-600'
        >{(isHidden) ? 'Close Modal' : 'Open Modal'}</button>
      </div>
      <div className='px-4'>
        <Modal
          isHidden={isHidden}
          callGetWords={handleGetWords} />
      </div>
      <div className='p-4 space-y-4'>
        {
          words.map((word) => 
            <div
              key={word.ID}
              className='flex w-full p-4 border-2 border-white border-solid rounded-xl gap-4'
            >
              <div className='w-full'>
                <h3 className='text-lg font-semibold'>{word.KOREAN_NAME}&nbsp;({word.ENGLISH_NAME})</h3>
                <h4>{word.DESCRIPTION}</h4>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={(e) => {
                    handleDeleteWord(word.ID)
                  }}
                  className='cursor-pointer'
                >X</button>
              </div>
            </div>
          )
        }
      </div>
    </main>
  )
}
