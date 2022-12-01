import React, { useState } from 'react';
import {ADD_TODO, ALL_TODOS} from "../apollo/todos";
import {useMutation} from "@apollo/client";

const Form = () => {
    const [title, setTitle] = useState('');
    const [addTodo, {error}] = useMutation(ADD_TODO, {
        update(cache, {data: { createTask }}) {
            const { tasks } = cache.readQuery({ query: ALL_TODOS });
            cache.writeQuery({
                query: ALL_TODOS,
                data: {
                    tasks: [...tasks, createTask]
                }
            })
        }
    });

    const handleForm = (e) => {
        if (title.trim().length) {
            e.preventDefault();
            addTodo({
                variables: {
                    title,
                    finished: false
                }
            });
            // store.newTask(title);
            setTitle('');
        }
    }

    if (error) {
        return (
            <h2 className="font-semibold text-3xl text-slate-800">Error</h2>
        )
    }

    return (
        <div className="bg-slate-300 w-full max-w-lg p-5 rounded-md mb-10">
            <h2 className="font-semibold text-3xl mb-6 p-0  text-slate-800">New task</h2>
            <form>
                <input
                    className="py-2 px-3 w-full max-w-md"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="bg-slate-700 px-3 py-2 mt-3 text-white"
                    onClick={handleForm}
                >
                    Отправить
                </button>
            </form>
        </div>
    );
}

export default Form;