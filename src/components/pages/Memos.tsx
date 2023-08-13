import type { MemoBody } from '../../mocks/handlers';
import { FC, useState, useEffect } from 'react';

interface MemosData {
  memos: MemoBody[];
}

export const Memos: FC = () => {
  const [memos, setMeoms] = useState<null | MemoBody[]>(null);
  useEffect(() => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const memosData = (await response.json()) as MemosData;
          setMeoms(memosData.memos);
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  }, []);
  const mark = (markDiv: number): string => {
    if (markDiv === 1) {
      return '★';
    } else {
      return '-';
    }
  };

  return (
    <div>
      {memos !== null ? (
        memos.map((m) => (
          <div key={m.id}>
            <p>id: {m.id}</p>
            <p>title: {m.title}</p>
            <div>{mark(m.markDiv)}</div>
            <br />
          </div>
        ))
      ) : (
        <div>
          <p>Loading ...</p>
        </div>
      )}
    </div>
  );
};
