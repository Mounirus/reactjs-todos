import { useState } from "react";

const TodoInput = (props) => {
  const { handleAddTodo,handleChange,handleEdit,editIndex,todoValue } = props;

  return (
    <header>
      <input
        value={todoValue}
        placeholder="Enter todo..."
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        onClick={() => {
          if(editIndex !== null){
            handleEdit(todoValue,editIndex)
          }else{
            handleAddTodo(todoValue);
          }
        }}
      >
      {editIndex!==null ? 'Edit' : 'Add' }
      </button>
    </header>
  );
};

export default TodoInput;
