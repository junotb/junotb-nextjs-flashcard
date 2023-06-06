'use client'

import { addWord, getWords } from '../firebaseConfig';
import { ChangeEvent, FocusEventHandler, FormEvent, useEffect, useState } from 'react';

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [koreanName, setKoreanName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setKoreanName(e.target.value);
  };

  const submitHandler = async () => {
    let api_url = `${process.env.NAVER_API_URL}?`;
    api_url += 'source=ko';
    api_url += '&target=en';
    api_url += `&text=${koreanName}`;
  
    await fetch(api_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
      },
    })
    .then(response => console.log(response));
    return;
    const params = {
      koreanName: koreanName
    };
    await fetch("/api/naver", {
      method: 'POST',
      body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error(error));
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
            className='z-10 px-4 font-bold bg-white text-violet-950 rounded-xl hover:bg-slate-400 active:bg-slate-600'
          >{(showModal) ? 'Close Modal' : 'Open Modal'}</button>
        </div>
        <div className='px-4'>
          <div className={(showModal) ? 'modal' : 'modal closed'}>
            <input
              onBlur={blurHandler}
              type='text'
              name='koreanName'
              className='w-full bg-transparent outline-none decoration-solid border-b-[2px]' placeholder='Type Korean Word' />
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
