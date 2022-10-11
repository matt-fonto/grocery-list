import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(false);
  //Here, we will pass an object, instead of a boolean value, because we want it to behave differently depending the case
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("I was submitted");

    if (!text) {
      // display alert if the user didn't type any value
      showAlert(true, "danger", "I guess you forgot the value");
    } else if (text && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: text };
          }
          return item;
        })
      );
      setText("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Item edited");
    } else {
      // here, we're adding items to our list
      // show alert
      showAlert(true, "success", "Item added to the list");
      // add item to the list
      const newItem = { id: new Date().getTime().toString(), title: text };
      // here we have our setList, passing all the previous value + the new one
      setList([...list, newItem]);
      // we restart our list
      setText("");
    }
  };

  //Passing default values to our function
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "List emptied");
    setList([]);
  };

  // removing the specific item
  const removeItem = (id) => {
    // we show a message
    showAlert(true, "danger", "Item removed");
    // we filter the list
    let filteredList = list.filter((item) => item.id !== id);
    // we pass the new list to the setList
    setList(filteredList);
  };

  // editing the item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setText(specificItem.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* If alert.show (our useState object) is true, then show the alert component */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {/* Conditional rendering -- just show us this div,
      if the list length is bigger than 0, meaning we have
      some item there */}
      {list.length > 0 && (
        <div className="grocery-container">
          {/* We pass our list items as props to our component */}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
