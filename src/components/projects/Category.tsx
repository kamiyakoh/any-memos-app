import { FC } from 'react';
import { useMemos } from '../../hooks/useMemos';
import { useCategory } from '../../hooks/useCategory';

export const Category: FC = () => {
  const { categories } = useMemos();
  const { pickCategories, selectAllCategories, deselectAllCategories, handlePickCategoryChange, categoryLabel } =
    useCategory();

  return (
    <div>
      <div className="flex justify-center gap-8">
        <h2 className="font-bold">カテゴリー</h2>
        <label>
          <input
            type="checkbox"
            value="selectAll"
            checked={pickCategories.length === categories.length}
            onChange={() => {
              if (pickCategories.length === categories.length) {
                deselectAllCategories();
              } else {
                selectAllCategories();
              }
            }}
          />
          &nbsp;全て選択
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 break-words whitespace-pre-wrap">
        {categories.map((cat) => (
          <label key={cat} className="max-w-full">
            <input
              type="checkbox"
              value={cat}
              checked={pickCategories.includes(cat)}
              onChange={handlePickCategoryChange}
            />
            &nbsp;{categoryLabel(cat)}
          </label>
        ))}
      </div>
    </div>
  );
};
