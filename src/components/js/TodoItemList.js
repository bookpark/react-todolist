import { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    render() {
        return (
            <div>
                <TodoItem content='TodoItem1' />
                <TodoItem content='TodoItem2' />
                <TodoItem content='TodoItem3' />
            </div>
        )
    }
}

export default TodoItemList;