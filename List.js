import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;

        return (
          // Once we add the items to our list, we will...
          <article key={id} className="grocery-item">
            {/* ... add the value of our event object -- what we typed */}
            <p className="title">{title}</p>
            {/* ... we will render two buttons, one to edit, other to delete */}
            <div className="btn-container">
              {/* Editing button */}
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              {/* Deleting button */}
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
