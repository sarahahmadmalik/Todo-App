import React, { useContext } from 'react'
import { TodoContext,newTodoContext, todoStatusContext} from '../TodoApp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck);

function Main() {

    const { todos, setTodos } = useContext(TodoContext);
    const { newTodo, setNewTodo } = useContext(newTodoContext);
    const { completed, setCompleted } = useContext(todoStatusContext);

    const markAll = (action) => {
        if (action === "Mark all") {
          const markedTodos = [...todos];
          if(todos.length - completed === todos.length && todos.length !==0)
            markedTodos.forEach(todo => todo.isMarked = true);
          else
          markedTodos.forEach(todo => todo.isMarked = false);
          setTodos(markedTodos);
        }
        else if (action === "Clear all") {
          if (todos.length === 0)
            alert('Nothing to clear!');
          else
            setTodos([]);
        }
        return;
      }

    const styleSetter = (index) => {
        if (todos[index].isMarked)
          return ({ backgroundColor: 'rgba(100, 237, 164, 0.884)' });
        return ({backgroundColor: '#5e4dcd9f'});
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo) return;
        setTodos([...todos, { todo: newTodo, isMarked: false }]);
        setNewTodo('');
      };
    
      const handleInputChange = (e) => {
        setNewTodo(e.target.value);
      };
    
      const handleTodoDelete = (index) => {
        const updatedTodos = todos.filter((_, todoIndex) => todoIndex !== index);
        setTodos(updatedTodos);
      };
    
      const handleMark = (index) => {
        const markedTodo = [...todos];
        markedTodo[index].isMarked = !markedTodo[index].isMarked;
        setTodos(markedTodo);
      };
    
      const modifyTodo = (id, currentTodo) => {
        setNewTodo(currentTodo.todo);
        // btnRef.current.focus();
        handleTodoDelete(id);
    }
    
  return (
    <div className='main'>
    <form onSubmit={handleSubmit} >
      <input value={newTodo} onChange={handleInputChange} placeholder="Enter todo here..." />
          <button type="submit" >Add a Todo</button>
          <div className='btns'>
            <button onClick={() => markAll("Mark all")}>{ todos.length - completed == 0 && todos.length && completed ? 'Unmark all' : 'Mark all' }</button>
          <button onClick={() => markAll("Clear all")}>Clear all</button>
        </div>
    </form>
    <ul>
      {todos &&
        todos.map((todo, index) => {
          return (
            <li key={index} style={todos[index].isMarked ? {textDecoration: 'line-through', color: 'green'} : {textDecoration: 'None', color: 'black'}}>
              {todo.todo}{' '}
              <div className='manipulate-btns'>
              <button onClick={() => handleTodoDelete(index)}>Delete</button>
              <button style={styleSetter(index)} onClick={() => handleMark(index)}>{todos[index].isMarked ? <FontAwesomeIcon icon="fa-solid fa-check" /> : 'Mark Done'}</button>
                <button onClick={() => modifyTodo(index, todos[index])}>Modify</button>
                </div>
            </li>
          );
        })}
        </ul>
        </div>
  )
}

export default Main