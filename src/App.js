import { useCallback, useReducer, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 1000; i++) {
    array.push({
      id: i,
      text: `To do ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'REMOVE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  // ***useState의 기본값에 함수를 넣어줬다는 것이 중요
  // useState(createBulkTodos()) => 리렌더링될 때마다 함수가 호출
  // useState(createBulkTodos) => 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수 실행

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // {
  //   id: 1,
  //   text: '개강 준비',
  //   checked: false,
  // },
  // {
  //   id: 2,
  //   text: '혼자 밥먹기',
  //   checked: true,
  // },
  // {
  //   id: 3,
  //   text: '혼자 영화보기',
  //   checked: true,
  // },
  const nextId = useRef(1001);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    // setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
    // setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
    // setTodos((todos) =>
    //   todos.map(
    //     (todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo),
    //     //불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때 이렇게 map을 사용하면 짧은 코드로 쉽게 작성할 수 있습니다.
    //   ),
    // );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
