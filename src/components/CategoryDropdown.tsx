import { Category } from "../types/category";

interface CategoryDropdownProps {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (id: number) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="mb-4">
            <select
                id="category"
                className="border border-grey-400 rounded p-4"
                value={selectedCategory || ''}
                onChange={(e) => onSelectCategory(Number(e.target.value))}
            >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CategoryDropdown;