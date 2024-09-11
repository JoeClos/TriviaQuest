import { Category } from "../types/category";

interface CategoryDropdownProps {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (id: number) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="mb-4">
            {/* <label htmlFor="category" className="mr-2 font-bold text-white">Select Category:</label> */}
            <select
                id="category"
                className="border border-gray-300 rounded p-2"
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