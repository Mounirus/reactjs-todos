import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

  const [todos,setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex,setEditIndex] = useState(null);


  function persistData(newTodos){
    localStorage.setItem('todos',JSON.stringify({'todos' : newTodos}));
  }

  function handleChange(e) {
    setTodoValue(e.target.value);
  }
  
  function handleAddTodo(newTodo) {
    const newTodos = [...todos,newTodo];
    persistData(newTodos);
    setTodos(newTodos);
    setTodoValue("");
  }

  function handleDelete(index){
    const newTodos = todos.filter((todo,todoIndex) => {
      return todoIndex !== index;
    })
    persistData(newTodos);
    setTodos(newTodos);
  }

  function handleEdit(newTodo,index) {
    const newTodos = todos.map((todo,indexTodo) => {
      if(indexTodo === index )
        return newTodo
      return todo;
    })
    persistData(newTodos);
    setTodos(newTodos);
    setTodoValue("");
    setEditIndex(null);
  }

  function onEditClick(index){
    setTodoValue(todos[index]);
    setEditIndex(index);
  }


  useEffect(()=>{
    if(!localStorage){
      return;
    }

    let localTodos = localStorage.getItem('todos');
    if(!localTodos){
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);

  },[]);

  return (
    <>
      <TodoInput handleAddTodo={handleAddTodo} handleChange={handleChange} todoValue={todoValue} handleEdit={handleEdit} editIndex={editIndex}/>
      <TodoList todos={todos} handleDelete={handleDelete} onEditClick={onEditClick}/>
    </>
  );
}

export default App;
