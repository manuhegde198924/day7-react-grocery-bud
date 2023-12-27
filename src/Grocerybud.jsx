// GroceryBud.js

// Import necessary modules from the 'react' package
import React, { useState, useEffect } from "react";

// Define a functional component named GroceryBud
const GroceryBud = () => {
  // State variables using the 'useState' hook
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  // Load items from local storage on component mount
  useEffect(() => {
    // Retrieve stored items from local storage or default to an empty array
    const storedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];

    // Set the 'items' state with the retrieved items
    setItems(storedItems);
  }, []); // Empty dependency array ensures this effect runs only on component mount

  // Update local storage whenever items change
  useEffect(() => {
    // Convert 'items' array to JSON and store it in local storage
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]); // Run this effect whenever 'items' state changes

  // Handle item addition
  const handleAddItem = () => {
    if (itemName.trim() !== "") {
      // Add a new item to 'items' array with a default 'completed' value of false
      setItems([...items, { name: itemName, completed: false }]);

      // Clear the 'itemName' state after adding the item
      setItemName("");
    }
  };

  // Handle item removal
  const handleRemoveItem = (index) => {
    // Create a copy of 'items' array
    const updatedItems = [...items];

    // Remove the item at the specified index
    updatedItems.splice(index, 1);

    // Update the 'items' state with the modified array
    setItems(updatedItems);
  };

  // Handle item completion
  const handleCompleteItem = (index) => {
    // Create a copy of 'items' array
    const updatedItems = [...items];

    // Toggle the 'completed' property of the item at the specified index
    updatedItems[index].completed = !updatedItems[index].completed;

    // Update the 'items' state with the modified array
    setItems(updatedItems);
  };

  // Handle clearing completed items
  const handleClearCompleted = () => {
    // Filter out completed items and update the 'items' state
    const incompleteItems = items.filter((item) => !item.completed);
    setItems(incompleteItems);
  };

  // JSX structure for rendering the component
  return (
    <div>
      <h1>MY-GROCERY-BUD </h1>
      <h3>FROM-MANOJ-HEGDE</h3>
      <h4>
        FOR CLEAR-COMPLETED-OPTION,PLEASE SELECT THE ITEM(CLICK ON THE ITEM U
        ADDED FROM LIST) U WANT TO CLEAR FROM THE LIST A STRIKE THROUGH APPEARS
        AND THEN PLEASE REMOVE IT,THANKYOU
      </h4>
      <div>
        {/* Input field for entering new items */}
        <input
          type="text"
          placeholder="ENTER ITEMS ONE AFTER OTHER YOU WANT TO ADD....."
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        {/* Button to add a new item */}
        <button onClick={handleAddItem}>ADD-ITEM</button>
      </div>
      {/* List of items */}
      <ul>
        {items.map((item, index) => (
          // Each item is represented as a list item
          <li key={index} className={item.completed ? "completed" : ""}>
            {/* Clickable span for marking an item as completed */}
            <span onClick={() => handleCompleteItem(index)}>{item.name}</span>
            {/* Button for removing an item */}
            <button onClick={() => handleRemoveItem(index)}>REMOVE</button>
          </li>
        ))}
      </ul>
      {/* Button for clearing completed items */}
      <button onClick={handleClearCompleted}>
        CLEAR-COMPLETED-ITEMS-BY-SELCTING
      </button>
    </div>
  );
};

// Export the GroceryBud component as the default export
export default GroceryBud;
