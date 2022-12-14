import { Component } from 'react';
import { ArrowRight, Trash } from 'react-bootstrap-icons';
import '../css/TodoItem.css';

class TodoItem extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.isComplete !== nextProps.isComplete;
    // }

    render() {
        const { content, isComplete, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation();    // onToggle 이 실행되지 않도록 함
                    onRemove(id)
                }
                }>
                <Trash size={30}/>
                </div>
                <div className={`todo-item-text ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>
                {
                    isComplete && (<div className="isComplete-mark">✓</div>)
                }
            </div>
        )
    }
}

export default TodoItem;