import type { MemoBody } from '../../mocks/handlers';
import { FC, useState } from 'react';

interface Props {
  memos: MemoBody[];
  id: string;
  closeModal: () => void;
}
interface ErrorMessage {
  errorMessage: string;
}

export const EditMemo: FC<Props> = ({ memos, id, closeModal }) => {
  const thisMemo = memos.find((m) => m.id === id);
  let initChecked = false;
  if (thisMemo?.markDiv === 1) initChecked = true;
  const [title, setTitle] = useState(thisMemo?.title);
  const [isChecked, setIsChecked] = useState(initChecked);
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const putMemo = (): void => {
    let markDiv = 0;
    if (isChecked) markDiv = 1;
    fetch('/api/memo/:id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, markDiv }),
    })
      .then(async (response) => {
        if (response.ok) {
          setInputErrorMessage('');
          closeModal();
          return (await response.json()) as MemoBody;
        } else {
          const responseError = (await response.json()) as ErrorMessage;
          setInputErrorMessage(responseError.errorMessage);
          return responseError;
        }
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  return (
    <div>
      <p>{inputErrorMessage}</p>
      <p>ID: {id}</p>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked((prevState) => !prevState);
        }}
      />
      <button onClick={putMemo}>Submit</button>
    </div>
  );
};
