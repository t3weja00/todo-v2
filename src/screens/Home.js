import { useEffect, useState } from 'react'
import './Home.css';
import axios from 'axios'
import Row from '../components/Row';
import { useUser } from '../context/useUser.ts';
import logo from '../images/book-icon.png'

const url = 'http://localhost:3002/';

function Home() {

  const { user } = useUser();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => {
      setTasks(response.data)
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }, [])

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } }
    axios.post(url + 'create', {
      description: task
    }, headers).then(response => {
      setTasks([...tasks, { id: response.data.id, description: task }])
      setTask()
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })

  }

  const deleteTask = (id) => {
    axios.delete(url + 'delete/' + id)
      .then(response => {
        const withoutRemoved = tasks.filter((item) => item.id !== id)
        setTasks(withoutRemoved)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })

  }

  return (
    <div className='center main-cont'>
      <div className="todo-header">
        <h2>ToDo List</h2>
        <img src={logo} alt='icon' height="50px" />
      </div>

      <div class="todo-body">
        <form className='form-signin'>
          <input
            placeholder='Add new task'
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTask();
                e.target.value = ''
              }
            }}
          />
        </form>

        <ul>
          {tasks.map(item => (
            <Row key={item.id} item={item} deleteTask={deleteTask} />
          ))}
        </ul>
      </div>




    </div>
  );
}

export default Home;
