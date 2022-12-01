import React from 'react';
import {useMutation, useQuery} from "@apollo/client";
import { ALL_TODOS, UPDATE_TODO, DELETE_TODO } from "../apollo/todos";
import Task from "./Task";

function Tasks() {
    const { loading, error, data} = useQuery(ALL_TODOS);
    const [toggleToDo, {error: toggleError}] = useMutation(UPDATE_TODO);
    const [deleteToDo, {error: deleteError}] = useMutation(DELETE_TODO, {
        update(cache, { data: { removeTask }}){
            cache.modify({
                fields: {
                    allTasks(currentTasks = []) {
                        // return currentTasks.filter(task => task.id !== removeTask.id)
                        return currentTasks.filter(todo => todo.__ref !== `Task:${removeTask.id}`)
                    }
                }
            })
        }
    });

    if (loading) {
        return (
            <div>Loading</div>
        )
    }

    if (error || toggleError || deleteError) {
        return (
            <h2 className="font-semibold text-3xl text-slate-800">Error</h2>
        )
    }

    return (
        <div>
            <div>
                <h2 className="font-semibold text-3xl mb-4 text-slate-800">Tasks</h2>
                {console.log(data.tasks)}
                <ul>
                    {data.tasks.map(item => {
                        return (
                            <Task
                                id={item.id}
                                title={item.title}
                                finished={item.finished}
                                toggleToDo={toggleToDo}
                                deleteToDo={deleteToDo}
                                key={item.id}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Tasks;