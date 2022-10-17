import React,{ useState } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


function App() {


  const [todo, setTodo] = useState([
    {"id" : 1, "title" : "task 1", "status" : false},
    {"id" : 2, "title" : "i am a good boy", "status" : false}
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState('');


  // function for adding list
  const addTask = () => {
  if(newTask){
    const num = todo.length + 1;
    const newEntry = {id : num, title: newTask, status: false}
    setTodo([...todo, newEntry])
    setNewTask('');
    }
  }


  // function for deleting list 
  const deleteTask = (id) => {
    let allTaks = todo.filter(task => task.id !== id)
    setTodo(allTaks);
  }


  //function for mark as read
  const markDone = (id) => {
   const alltask = todo.map(task => {
    if(task.id === id){
      return({...task, status : !task.status})
    }
    return task
   })
   setTodo(alltask)
  }


  //function for changing list item
  const changeTask = (e) => {
    let newEntry = {
      id : updateTask.id,
      title : e.target.value,
      status: updateTask.status ? true : false
    }
    setUpdateTask(newEntry);
  }

  //function for updateing list item
  const updateData = () => {
    let filterRecords = [...todo].filter( task=>task.id !== updateTask.id);
    let updatedObject = [...filterRecords, updateTask];
    setTodo(updatedObject);
    setUpdateTask('');
  }

  //function for canceling update
  const cancelUpdate = () => {
    setUpdateTask('');
  }


  return (
    <>
    <div className='container App'>
    <div className='row text-center'>
    <h1 className='fw-bold'>To Do List</h1>
    </div>
     {/* Update Task */}
     <div className="row">
        <div className="col">
          <input 
           value={updateTask && updateTask.title}
           onChange={(e) => changeTask(e)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
          onClick={updateData}
          className="btn btn-lg btn-success mr-20"
          >Update</button>
          <button
            onClick={cancelUpdate}
            className="btn btn-lg btn-warning"
          >Cancel</button>
          {/* <button
        onClick={deleteall}
            className="btn btn-lg btn-danger"
          >delete all</button> */}
        </div>
      </div>
      <br />  


        {/* Add Task */}
        <div className="row">
        <div className="col">
          <input 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}   
          className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
         onClick={addTask}
            className="btn btn-lg btn-success"
          >Add Task</button>
        </div>
      </div>
      <br />

      {todo && todo.length ? '' : <p className='text-light'>No Tasks...</p> }

      
        {
        todo
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
          return(
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
            <div className={task.status ? 'done' : ' '}>  
                <span className='taskNumber'>{index + 1}</span>
                <span className='taskText'>{task.title}</span>
            </div>


            <div className='iconsWrap'>
              <span onClick={() => markDone(task.id)}>
              <FontAwesomeIcon icon={faCircleCheck} />
              </span>

            {task.status ? null : (
            <span onClick={(e) => setUpdateTask({
              id: task.id,
              title: task.title,
              status: task.status ? true : false
            }) }>
            <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            )}
              
              
              <span onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>

              </div>
            </React.Fragment>
          )
        })
      }
      

      </div>
    </>
  );
}

export default App;
