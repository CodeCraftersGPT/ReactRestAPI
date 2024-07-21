import logo from './logo.svg';
import './App.css';
import UserList from './Components/RestAPI/UserList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>        
      </header>
      <main>
      <UserList/>
      </main>
    </div>
  );
}

export default App;
