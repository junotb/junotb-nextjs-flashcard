import { addWord } from '../firebaseConfig';
import { useRef, useState } from 'react';
import { modalProps } from '@/types/props';

export default function Modal({ isHidden, callGetWords}: modalProps) {
  const refKoreanName = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    try {
      const koreanName = refKoreanName.current!.value;
      const englishName = await handleNaver(koreanName);
      const description = await handleOxford(englishName);
      handleAddWord(englishName, description);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const handleNaver = async (koreanName: string) => {
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
      return response.englishName.toLowerCase();
    });
  }

  const handleOxford = async (englishName: string) => {
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

  const handleAddWord = async (englishName: string, description: string) => {
    const koreanName = refKoreanName.current!.value;
    const newWord: Word = {
      ID: '',
      KOREAN_NAME: koreanName,
      ENGLISH_NAME: englishName,
      DESCRIPTION: description
    }
    await addWord(newWord);
    callGetWords();
    refKoreanName.current!.value = '';
  }

  return (
    <div className={(isHidden) ? 'modal' : 'modal closed'}>
      <input
        ref={refKoreanName}
        type='text'
        className='w-full bg-transparent outline-none decoration-solid border-b-[2px]' placeholder='Type Korean Word' />
      <button
        onClick={handleClick}
        className='z-10 px-4 font-bold bg-white rounded-lg text-violet-950 hover:bg-slate-400 active:bg-slate-600'
      >Submit</button>
    </div>
  )
}
