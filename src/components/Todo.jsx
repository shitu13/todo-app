import { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

function Todo() {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef(null);

    const addTodo = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodoList((prev) => {
            return prev.filter((todo) => todo.id !== id)
        })
    }

    const toogle = (id) => {
        setTodoList((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])


    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7  
        min-h-[550px] rounded-xl'>

            {/* Title  */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="todo-icon" />
                <h1 className='text-3xl font-bold text-gray-800'>Todo List</h1>
            </div>


            {/* Input Area  */}
            <div className='flex  items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none
                flex-1 h-14 pl-2 pr-2 placeholder:text placeholder:textslate-600'
                    type="text" placeholder='Add your task' />
                <button onClick={addTodo} className='border-none rounded-full bg-orange-500 w-32 h-14
                text-white text-lg font-medium cursor-pointer'>ADD +</button>
            </div>


            {/* Todo List  */}
            {todoList.map((item, index) => {
                return <TodoItems key={index} text={item.text} id={item.id}
                    isComplete={item.isComplete} deleteTodo={deleteTodo}
                    toogle={toogle} />
            })}


        </div>
    )
}

export default Todo
