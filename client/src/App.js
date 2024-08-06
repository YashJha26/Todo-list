import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import {useCookies} from 'react-cookie'

const base_URl="http://localhost:5000/";
function App() {
  const [cookies,setCookies,removeCookies]= useCookies(null);
  const [task,setTask] = useState(null);
  const userEmail = cookies.email;
  const authToken = cookies.accessToken;
  const getData= async ()=>{
    try {
      const response = await fetch(`${base_URl}api/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
      setTask(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(authToken) getData();
  },[])
  console.log(task);

// Sort by date

  const sortedTask = task?.sort((a,b)=>{return new Date(a.date)});

  return (
    <div className="App">
      {!authToken&&<Auth/>}
      {authToken&&<>
        <ListHeader listName="Holiday tick list" getData={getData}/>
        <p>Welcome Back {userEmail}</p>
        {sortedTask?.map((task)=>{return <ListItem key={task.id} task={task} getData={getData}/>})}
      </>}
    </div>
  );
}

export default App;
