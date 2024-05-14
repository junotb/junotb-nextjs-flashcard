import { addWord } from '../firebaseConfig';
import { useRef } from 'react';

export default function Modal({ handleIsActive, handleGetWords }: { handleIsActive: () => void, handleGetWords: () => void }) {
  const refKoreanName = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    try {
      const koreanName = refKoreanName.current!.value;

      const englishName = await fetch("/api/naver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ koreanName: koreanName })
      })
        .then(response => response.json())
        .then(data => data.englishName.toLowerCase());
      if (!englishName) {
        throw new Error('Cannot get a englishName from Naver. Please try others.');
      }

      const description = await fetch("/api/oxford", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ englishName: englishName })
      })
        .then(response => response.json())
        .then(data => data.description);
      if (!description) {
        throw new Error('Cannot get a description from Oxford. Please try others.');
      }

      await addWord({
        id: '',
        korean_name: koreanName,
        english_name: englishName,
        description: description
      });

      handleGetWords();

      refKoreanName.current!.value = '';
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
      <div className="flex flex-col border-2 w-full max-w-[32rem] bg-black rounded-sm z-10">
        <div className="flex justify-between items-center border-b">
          <h5 className="m-4 text-xl font-bold">Type a Korean Word</h5>
          <button
            type="button"
            onClick={handleIsActive}
            className="m-4"
            aria-label="Close"
          >
            <span className="text-xl font-bold" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="border-b p-4">
          <input
            type="text"
            ref={refKoreanName}
            className="border-b-[2px] px-4 py-2 w-full bg-white text-black outline-none" placeholder="안녕하세요" />
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button
            type="button"
            onClick={handleIsActive}
            className="border px-4 py-2 rounded-sm"
          >Close</button>
          <button
            type="button"
            onClick={handleClick}
            className="border px-4 py-2 rounded-sm"
          >Save</button>
        </div>
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black opacity-50"></div>
    </div>
  )
}