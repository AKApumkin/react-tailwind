import { useState } from 'react';

function ToDo() {
    const [toDocardList, setToDoCardList] = useState<ToDoCardProps[]>([]);

    // toDo card interfact
    type ToDoCardProps = {
    title: string;
    description: string;
    }

    const ToDoCard = (props: ToDoCardProps) => {
        return (
            <li className="card">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </li>
        )
    }

    const addToDoItem = () => {
        const title = document.querySelector('input[name="title"]') as HTMLInputElement;
        const description = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;

        if (title.value && description.value) {
            setToDoCardList([...toDocardList, {title: title.value, description: description.value}]);
            title.value = "";
            description.value = "";
        }
    }
    /** VIEW */
    return (
        <div className="todo">
           <div className="todo__field">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Learn Svelt" />
                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="write a tolist in svelt as well as displaying data from a public API"></textarea>
                <button onClick={addToDoItem}>Add</button>
           </div>
           <ul>
                {toDocardList.map((card, index) => (
                     <ToDoCard key={index} title={card.title} description={card.description} />
                ))}
           </ul>
        </div>
    );
  }
  
  export default ToDo;