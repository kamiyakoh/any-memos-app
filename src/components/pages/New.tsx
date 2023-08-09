import type { MemoBody } from '../../mocks/handlers';
// import { response } from 'msw';
import { FC, useState } from 'react';

interface ErrorMessage {
  errorMessage: string;
}

export const New: FC = () => {
  const [title, setTitle] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const postMemo = (): void => {
    let markDiv = 0;
    if (isChecked) markDiv = 1;
    fetch('/api/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, markDiv }),
    })
      .then(async (response) => {
        if (response.ok) {
          setInputErrorMessage('');
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
      <button onClick={postMemo}>Submit</button>
    </div>
  );
};
