'use client'

import { addWord, getWords } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Modal } from '../pages/Modal'

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);

  const submitHandler = async () => {
    try {
      const newWord: Word = {
        KOREAN_NAME: '사과',
        ENGLISH_NAME: 'apple',
        DESCRIPTION: 'the round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider.'
      }
      await addWord(newWord);
      getWords();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const initHandler = async () => {
    setWords([]);
    try {
      const arrayWords: Word[] = await getWords();
      setWords(arrayWords);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const clickModal = () => setShowModal(!showModal);

  useEffect(() => {
    initHandler();
  }, []);

  return (
    <main className='w-screen h-screen p-24'>
      <section className='w-full'>
        <div className='flex flex-row justify-between p-4'>
          <h1 className='text-2xl font-bold'>Ts-Serverless-Notes</h1>
          <button
            onClick={clickModal}
            className='bg-white text-violet-950 font-bold px-4 rounded-xl hover:bg-slate-400 active:bg-slate-600'
          >{(showModal) ? 'Close Modal' : 'Open Modal'}</button>
        </div>
        <div className='p-4 space-y-4'>
          <div className={(showModal) ? 'modal' : 'modal closed'}>Hello World!</div>
          {
            words.length > 0 &&
            words.map((word, index) => 
              <div
                key={index}
                className='w-full px-8 py-4 border-solid border-white rounded-xl border-2'
              >
                <h3 className='font-semibold text-lg'>{word.KOREAN_NAME}&nbsp;({word.ENGLISH_NAME})</h3>
                <h4>{word.DESCRIPTION}</h4>
              </div>
            )
          }
        </div>
      </section>
    </main>
  )
}
