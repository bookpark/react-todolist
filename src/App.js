import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';
import TodoItem from './components/js/TodoItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = 2;
    this.state = {
      input: "",
      todos: [
        { id: 0, content: '리액트 공부', isComplete: false },
        { id: 1, content: '스프링 공부', isComplete: true },
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleCreate() {
    const { input, todos } = this.state;
    if (input === "") {
      alert('오늘 할 일을 입력해주세요!');
      return;
    }
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        content: input,
        isComplete: false
      })
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle(id) {
    const todos = this.state.todos;
    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if (!window.confirm(isComplete ? "미완료 처리 하시겠습니가?" : "완료 하시겠습니까?")) {
      return;
    }

    // 파라미터로 받은 id 를 가지고 몇 번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);

    // 선택한 객체를 저장한다.
    const selected = todos[index];

    // 배열을 복사한다.
    const nextTodos = [...todos];

    // 기존의 값을 복사하고 isComplete 값을 덮어쓴다.
    nextTodos[index] = {
      ...selected,
      isComplete: !selected.isComplete
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove(id) {
    const todos = this.state.todos;

    const removeContent = todos.find(todo => todo.id === id).content;
    if (!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
      return;
    }

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    return (
      <div>
        <TodoListTemplate form={(
          <Form
            value={this.state.input}
            onChange={this.handleChange}
            onCreate={this.handleCreate}
            onKeyPress={this.handleKeyPress} />
        )}>
          <TodoItemList todos={this.state.todos}
            onToggle={this.handleToggle}
            onRemove={this.handleRemove} />
        </TodoListTemplate>
      </div >
    );
  }
}

export default App;
