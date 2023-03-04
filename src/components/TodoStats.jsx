import React, { useContext} from 'react'
import { todoStatusContext } from '../TodoApp';

function TodoStats(props) {
    const { completed, setCompleted } = useContext(todoStatusContext);
  return (
    <div className='todo-stats'>
    <div className='totalTodos'>
      <p>Total Todos</p>
      {props.length}
    </div>
    <div className='completed'>
      <p>Completed Todos</p>
      {completed}
    </div>
    <div className='uncompleted'>
      <p>Uncompleted Todos</p>
      {props.length - completed}
    </div>
  </div>
  )
}

export default TodoStats