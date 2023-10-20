import { FC } from 'react';
import { useMemos } from '../../hooks/useMemos';
import { useCategory } from '../../hooks/useCategory';

export const Category: FC = () => {
  const { categories } = useMemos();
  const { pickCategories, handlePickCategoryChange, categoryLabel } = useCategory();

  return (
    <div>
      <h2 className="text-center">カテゴリー</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {categories.map((cat) => (
          <label key={cat}>
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
