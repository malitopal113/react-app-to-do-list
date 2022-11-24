import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './taskform';
import Task from './task';
import Footer from './footer';
import { isVisible } from '@testing-library/user-event/dist/utils';

function App() {

  useEffect(() => {
    document.title = "TO DO LIST"
 }, []);

  const [task, setTask] = useState([])
  function addTask(name) {
      setTask(  prev => {
        return [...prev, {name:name, done: false}];
      }  )
  }

  // to save localstorage -- useEffect -- and not to lose tasks when reflesh the page
  useEffect(() => {
    if (task.length === 0) return; 
    localStorage.setItem('task', JSON.stringify(task))
  }, [task])

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('task'))
    setTask(task || [])
  }, [])
  function updateTaskDone(taskIndex, newDone){
      setTask(prev => {
        const newTask = [...prev]
        newTask[taskIndex].done = newDone
        return newTask
      })
  }

  const numberDoneTasks = task.filter(item => item.done).length
  const totalTasks = task.length

  
  // call messages as the completed tasks
  function getMessage() {
    const percentage = numberDoneTasks / totalTasks * 100;
    if(percentage === 0 ){
      
      return '👉 Just start, more will come' 

    }
    
    if(percentage === 100){
      return 'Well Done 🚀' 
  }
    return 'Keep it going 🕒' 

}

    // DELETE TASK
    function deleteTask(IndexToRemove){
        setTask( prev => {
          return prev.filter((taskObject, index) =>  index !== IndexToRemove)
        })
    }

    
  return (
    <div className="App">
        <span className='title'>TODOS</span>
        <h1> {numberDoneTasks} / {totalTasks}</h1>
        <h2> {getMessage()} </h2>
        <TaskForm onAdd={addTask} />
        {task.map((task, index) => (
          <Task {...task} onToggle={done => updateTaskDone(index, done)} onDelete={() => deleteTask(index)} />
        ))}
        <Footer totalTasks={totalTasks} />

        
        
     


    </div>
  );
}

export default App;
