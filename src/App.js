import logo from './logo.svg';
import './App.css';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';

function App() {
  return (
    <div>
      <TodoListTemplate form={<Form />}>
        안녕하세요?
      </TodoListTemplate>
    </div>
  );
}

export default App;
