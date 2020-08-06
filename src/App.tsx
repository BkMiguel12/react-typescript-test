import React, { useState, useRef } from 'react';
import 'bootswatch/dist/superhero/bootstrap.min.css';

type FormElement = React.FormEvent<HTMLFormElement>;

interface Task {
  name: string,
  done: boolean
}

function App() {

  const [newTask, setNewTask] = useState<string>('');
  const [listTasks, setListTasks] = useState<Task[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e:FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  }

  const addTask = (name: string) => {
    const newTasks:Task[] = [...listTasks, {name, done: false}];
    setListTasks(newTasks);
  }

  const toggleComplete = (id:number) => {
    const copyTasks:Task[] = [...listTasks];

    copyTasks[id].done = !copyTasks[id].done;
    setListTasks(copyTasks);
  }

  const deleteTask = (id: number) => {
    const copyTasks: Task[] = [...listTasks];

    copyTasks.splice(id, 1);
    setListTasks(copyTasks);
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <form className="text-center" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="form-control" 
                  value={ newTask }
                  onChange={ e => setNewTask(e.target.value) }
                  ref={taskInput}
                  placeholder="Type your task"
                  autoFocus
                />
                <button className="btn btn-success mt-3">Save</button>
              </form>
            </div>
          </div>

          {
            listTasks.map((task: Task, index: number) => {
              return (
                <div className="card card-body mt-2" key={index}>
                  <h2 style={{textDecoration: (task.done) ? 'line-through' : 'none'}}>{task.name}</h2>
                  <div>
                    <button 
                      className={`btn ${task.done ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => toggleComplete(index)}
                    >
                      {task.done ? '✅' : '❌'}
                    </button>
                    <button 
                      className="btn btn-danger ml-2" 
                      onClick={() => deleteTask(index)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
