import type { MemoBody } from '../../mocks/handlers';
import { FC, useState, useEffect } from 'react';
import { Modal } from '../projects/Modal';
import { EditMemo } from '../projects/EditMemo';

interface MemosData {
  memos: MemoBody[];
}

export const Memos: FC = () => {
  const [memos, setMeoms] = useState<null | MemoBody[]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
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
