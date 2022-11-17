import logo from './logo.svg';
import './App.css';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';

function App() {
  return (
    <div>
      <TodoListTemplate form={<Form />}>
        <TodoItemList />
      </TodoListTemplate>
    </div>
  );
}

export default App;
