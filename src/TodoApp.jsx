import React, { createContext } from 'react';
import { useEffect } from 'react';
import Footer from '../src/components/Footer';
import Main from '../src/components/Main';
import Title from '../src/components/Title';
import TodoStats from '../src/components/TodoStats';
import './styles/customCSS.css'

//context API for sharing the todos globally
export const TodoContext = createContext();
export const newTodoContext = createContext();
export const todoStatusContext = createContext();

export default function TodoApp() {
    
  
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  // const listRef = React.useRef(null);
  // const btnRef = React.useRef(null);
  const [completed, setCompleted] = React.useState(0);


  useEffect(() => {
    const completedCount = todos.reduce((count, todo) => {
      return todo.isMarked ? count + 1 : count;
    }, 0);
    setCompleted(completedCount);
  }, [todos]);
  
  

  return (
    <div className='banner'>
      <div className='container'>
        <Title />
    
        <TodoContext.Provider value={{ todos, setTodos }}>
          <newTodoContext.Provider value={{ newTodo, setNewTodo }}>
            <todoStatusContext.Provider value={{ completed, setCompleted }}>
            <Main/>
            </todoStatusContext.Provider>
          </newTodoContext.Provider>
        </TodoContext.Provider>

        <todoStatusContext.Provider value={{ completed, setCompleted }}>
        <TodoStats length={todos.length} />
        </todoStatusContext.Provider>

      </div>
      <Footer />
      </div>
  );
}

