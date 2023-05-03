import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC=()=> {
  const{store}=useContext(Context);
  const [users, setUsers]=useState<IUser[]>([]);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  async function getUsers(){
    try{
      const response=await UserService.fetchUsers();
      setUsers(response.data);
    }catch(e){
      console.log(e);
    }
  }

  // if(store.isLoading){
  //   return <div>Загрузка..</div>
  // }

  if(!store.isAuth){
    return(
      <div>
        <LoginForm/>
      <button onClick={getUsers}>Получить пользователей</button>
      </div>
      
    )
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email} ` : `авторизуйся`}</h1>
      <h1>{store.user.isActivated ? `Пользователь активирован ` : `не активирован `}</h1>
      <button onClick={()=>store.logout()}>выйти</button>
      <div>
        <button onClick={getUsers}>получить пользователей</button>
      </div>
      {users.map(user=>
        <div key={user.id}>{user.email}</div>)}
    
    </div>
    
  );
}

export default observer(App);
