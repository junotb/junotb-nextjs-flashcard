'use client'

import { addWord, getWords } from '../firebaseConfig';
import { ChangeEvent, FocusEventHandler, FormEvent, useEffect, useState } from 'react';

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [koreanName, setKoreanName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const submitHandler = async () => {
    const englishName = await naverHandler(koreanName);
    const description = await oxfordHandler(englishName);

    addHandler(englishName, description);
  }

  const naverHandler = async (koreanName: string) => {
    return await fetch("/api/naver", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        koreanName: koreanName
      })
    })
    .then(response => response.json())
    .then(response => {
      return response.englishName;
    });
  }

  const oxfordHandler = async (englishName: string) => {
    return await fetch(`/api/oxford?englishName=${englishName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      return response.description;
    });
  }

  const getHandler = async () => {
    setWords([]);
    try {
      const arrayWords: Word[] = await getWords();
      setWords(arrayWords);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const addHandler = async (englishName: string, description: string) => {
    const newWord: Word = {
      KOREAN_NAME: koreanName,
      ENGLISH_NAME: englishName,
      DESCRIPTION: description
    }

    await addWord(newWord);

    setKoreanName('');
    getHandler();
  }

  const clickModal = () => setShowModal(!showModal);

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <main className='w-screen h-screen p-24'>
      <section className='w-full'>
        <div className='flex flex-row justify-between p-4'>
          <h1 className='text-2xl font-bold'>Ts-Serverless-Notes</h1>
          <button
            onClick={clickModal}
            className='z-10 px-4 font-bold bg-white text-violet-950 rounded-xl hover:bg-slate-400 active:bg-slate-600'
          >{(showModal) ? 'Close Modal' : 'Open Modal'}</button>
        </div>
        <div className='px-4'>
          <div className={(showModal) ? 'modal' : 'modal closed'}>
            <input
              onChange={(e) => setKoreanName(e.target.value)}
              type='text'
              name='koreanName'
              className='w-full bg-transparent outline-none decoration-solid border-b-[2px]' placeholder='Type Korean Word'
              value={koreanName} />
            <button
              onClick={submitHandler}
              className='z-10 px-4 font-bold bg-white rounded-lg text-violet-950 hover:bg-slate-400 active:bg-slate-600'
            >Submit</button>
          </div>
        </div>
        <div className='p-4 space-y-4'>
          {
            words.length > 0 &&
            words.map((word, index) => 
              <div
                key={index}
                className='w-full px-8 py-4 border-2 border-white border-solid rounded-xl'
              >
                <h3 className='text-lg font-semibold'>{word.KOREAN_NAME}&nbsp;({word.ENGLISH_NAME})</h3>
                <h4>{word.DESCRIPTION}</h4>
              </div>
            )
          }
        </div>
      </section>
    </main>
  )
}
