import React, { useState } from 'react';
import '../css/Form.css';

function Form({ onCreate }) {

    // React hook
    const [input, setInput] = useState('');

    // input 값 변경
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    // enter키 이벤트
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onCreate(input);
            setInput('');
        }
    }

    return (
        <div className='form'>
            <input value={input}
                placeholder='오늘 할 일을 입력하세요.'
                onChange={handleChange}
                onKeyPress={handleKeyPress} />
            <div className='create-button' onClick={() => {
                onCreate(input);
                setInput('');
            }}>추가</div>
        </div>
    )
}

export default Form;