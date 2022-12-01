import React from 'react';

function Task({id, title, finished, toggleToDo, deleteToDo}) {
    const onChange = (id, finished) => {
        toggleToDo({
            variables: {
                id,
                finished: !finished
            }
        });
    }

    const onDelete = (id) => {
        deleteToDo({
            variables: {
                id
            }
        });
    }

    return (
        <li className="text-lg">
            <input
                className="mr-1"
                type="checkbox"
                checked={finished}
                onChange={() => onChange(id, finished)} />
            {title}
            <span
                className="cursor-pointer ml-4 font-semibold text-lg"
                onClick={() => onDelete(id)}
            >
                x
            </span>
        </li>
    );
}

export default Task;