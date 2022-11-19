import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';
import TodoItem from './components/js/TodoItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.id = 2;
    this.state = {
      // input: "",
      todos: [
        // { id: 0, content: '리액트 공부', isComplete: false },
        // { id: 1, content: '스프링 공부', isComplete: true },
      ]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.handleInitInfo();
  }

  handleInitInfo() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(todos => this.setState({ todos: todos }))
      .catch(err => console.log(err))
  }

  // handleChange(event) {
  //   this.setState({
  //     input: event.target.value
  //   });
  // }

  handleCreate(inputValue) {
    const { todos } = this.state;
    if (inputValue === "") {
      alert('오늘 할 일을 입력해주세요!');
      return;
    }
    this.setState({
      // input: '',
      todos: todos.concat({
        id: ,
        content: inputValue,
        isComplete: false
      })
    });

    const data = {
      body: JSON.stringify({ 'content': inputValue }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post'
    }

    fetch("/api/todos", data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }


  // handleKeyPress(event) {
  //   if (event.key === 'Enter') {
  //     this.handleCreate();
  //   }
  // }

  handleToggle(id) {
    const todos = this.state;
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

    const data = {
      headers: { 'Content-Type': 'application/json' },
      method: 'put'
    }

    fetch("/api/todos/" + id, data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }

  handleRemove(id) {
    const todos = this.state;

    const removeContent = todos.find(todo => todo.id === id).content;
    if (!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
      return;
    }

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });

    const data = {
      headers: { 'Content-Type': 'application/json' },
      method: 'delete'
    }

    fetch("/api/todos/" + id, data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <TodoListTemplate form={(
          <Form
            // value={this.state.input}
            // onChange={this.handleChange}
            // onKeyPress={this.handleKeyPress} 
            onCreate={this.handleCreate}
          />
        )}>
          <TodoItemList
            todos={this.state.todos}
            onToggle={this.handleToggle}
            onRemove={this.handleRemove} />
        </TodoListTemplate>
      </div >
    );
  }
}

export default App;
