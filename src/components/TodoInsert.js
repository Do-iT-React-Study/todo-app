import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //onSubmit으로 하는 이유 : 인풋에서 enter 눌렀을 때도 발생하기 때문
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');
      //새로고침 방치 위해 아래 함수 호출
      e.preventDefault();
    },
    [onInsert, value],
  );

  //onClick으로도 가능
  // const onClick = useCallback(() => {
  //   onInsert(value);
  //   setValue('');
  // }, [onInsert, value]);

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
