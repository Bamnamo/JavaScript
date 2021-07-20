import React, {useCallback, useReducer, useRef, useState} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
    /*[
    {
        id: 1,
        text: '리액트의 기초 알아보기',
        checked: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링해 보기',
        checked: true,
    },
    {
        id: 3,
        text: '일정 관리 앱 만들어 보기',
        checked: false,
    },
]);*/

    //고유 값으로 사용될 id
    //ref를 사용하여 변수 담기
    const nextId = useRef(2501);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            dispatch({type: 'INSERT', todo});
            nextId.current += 1; //nextId 1씩 더하기
        },
        [todos],
    );

    const onRemove = useCallback(
        id => {
            dispatch({type: 'REMOVE', id});
        }, []);

    const onToggle = useCallback(
        id => {
            dispatch({type: 'TOGGLE', id});
        }, []);

    function todoReducer(todos, action) {
        switch (action.type) {
            case 'INSERT':// 새로 추가
                return todos.concat(action.todo);
            case 'REMOVE':
                return todos.filter(todo => todo.id !== action.id);
            case 'TOGGLE':
                return todos.map(todo =>
                    todo.id === action.id ? {...todo, checked: !todo.checked} : todo,
                );
            default:
                return todos;
        }
    }

    function createBulkTodos() {
        const array = [];
        for (let i = 1; i <= 2500; i++) {
            array.push({
                id: i,
                text: `할 일 ${i}`,
                checked: false,
            });
        }
        return array;
    }


    return <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
};

export default App;
