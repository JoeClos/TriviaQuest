import { Category } from "../types/category";

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void; // Updated to handle null
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelectCategory(selectedValue ? Number(selectedValue) : null); // Pass null if the empty option is selected
  };

  return (
    <div className="mb-4">
      <select
        id="category"
        className="border border-gray-400 rounded p-4"
        value={selectedCategory || ''}
        onChange={handleCategoryChange}
      >
        <option value="">Choose Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
