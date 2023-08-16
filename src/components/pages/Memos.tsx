import type { MemoBody } from '../../mocks/handlers';
import { FC, useState, useEffect } from 'react';
import { Modal } from '../projects/Modal';
import { EditMemo } from '../projects/EditMemo';

interface MemosData {
  memos: MemoBody[];
}
interface ErrorMessage {
  errorMessage: string;
}

export const Memos: FC = () => {
  const [memos, setMeoms] = useState<null | MemoBody[]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');
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
  const delMemo = (id: string): void => {
    fetch('/api/memo/:id', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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

  const openModal = (id: string): void => {
    setEditId(id);
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {memos !== null ? (
        memos.map((m) => (
          <div key={m.id}>
            <p>id: {m.id}</p>
            <p>title: {m.title}</p>
            <div>{mark(m.markDiv)}</div>
            <button
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => {
                openModal(m.id);
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                delMemo(m.id);
              }}
            >
              Delete
            </button>
            <p>{inputErrorMessage}</p>
            <hr />
          </div>
        ))
      ) : (
        <div>
          <p>Loading ...</p>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EditMemo memos={memos ?? []} id={editId} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
