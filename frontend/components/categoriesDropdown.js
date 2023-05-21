import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const CategoryDropdown = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setIsOpen(false);
    onSelectCategory(category);
  };

  return (
    <Dropdown show={isOpen} onToggle={handleToggle}>
      <Dropdown.Toggle variant="secondary" id="category-dropdown">
        {selectedCategory ? selectedCategory : "All"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSelect(null)}>All</Dropdown.Item>
        {categories.map((category) => (
          <Dropdown.Item key={category} onClick={() => handleSelect(category)}>
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;
