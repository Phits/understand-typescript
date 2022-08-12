import React, { useRef } from "react";

type NewToDoProps = {
    onAddToDo: (toDoText: string) => void;
}

const NewToDo: React.FC<NewToDoProps> = props => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const toDoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddToDo(enteredText);
    }

    return <form onSubmit={toDoSubmitHandler}>
        <div>
            <label htmlFor="todo-text">To Do Text</label><br/>
            <input type="text" id="todo-text" ref={textInputRef} />
            <button type="submit">Add To DO</button>
        </div>
    </form>;
};

export default NewToDo;
