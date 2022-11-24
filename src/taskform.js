import {useState} from 'react'


function TaskForm({onAdd}) {
  
  const initialValue= ''  
  const [taskName, setTaskName] =  useState(initialValue);
  
  function handleSubmit(e){
      e.preventDefault();
      onAdd(taskName)
      setTaskName(initialValue)
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>    
            
            <button>+</button>

            <input 
                type='text' 
                placeholder='What needs to be done?'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            
        </form>
    </div>
  )
}

export default TaskForm