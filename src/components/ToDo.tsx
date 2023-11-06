import { ReactElement, useState } from 'react';

function ToDo() {
    const [toDocardList, setToDoCardList] = useState<ToDoCardProps[]>([]);

    // toDo card interfact
    type ToDoCardProps = {
        title: string;
        description: string;
    }

    /**
     * 
     * @param props takes in the title and description of the toDo card
     * @returns ReactElement
     */
    const ToDoCard = (props: ToDoCardProps) :ReactElement => {
        return (
            <li className="card">
                <h2 className="text-lg my-2">{props.title}</h2>
                <p className="text-sm my-2">{props.description}</p>
            </li>
        )
    }

    /**
     * Add a new toDo card to the list by getting the title and description from the input fields
     * If no title or description is provided, the card will not be added and an error will dislay
     * @returns void
     */
    const addToDoItem = () :void => {
        const title = document.querySelector('input[name="title"]') as HTMLInputElement;
        const description = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;

        if (title.value && description.value) {
            setToDoCardList([...toDocardList, {title: title.value, description: description.value}]);
            title.value = "";
            description.value = "";
        }
        else if (!title.value) {
            
        }
        else if (!description.value) {
           
        }
    }

    /** VIEW */
    return (
        <div className="todo">
           <section className="todo__field flex-1 w-9/12 m-auto pt-28 max-w-md text-left">
                <h1 className="text-xl my-5 font-bold">To Do</h1>
                <div className="todo__field__item w-full my-1">
                    <label htmlFor="title" className="w-full my-0.5">Title</label>
                    <input type="text" name="title" placeholder="Learn Svelt" className="w-full my-0.5 border-solid border-gray-950 indent-1"/>
                </div>
                <div className="todo__field__item w-full my-1">
                    <label htmlFor="description" className="w-full my-0.5">Description</label>
                    <textarea name="description" placeholder="write a to do list in svelt as well as displaying data from a public API" className="w-full my-0.5 border-solid border-gray-950 indent-1"></textarea>
                </div>
                <button onClick={addToDoItem} className="w-full bg-rose-800 h-9 rounded-md hover:bg-rose-600 hover:text-white font-bold">Add</button>
           </section>
           <section className="todo__field flex-1 w-9/12 m-auto pt-28 max-w-md text-left">
                <h2 className="text-xl my-5 font-bold">To Do List</h2>
                <ul>
                        {toDocardList.map((card, index) => (
                            <ToDoCard key={index} title={card.title} description={card.description} />
                        ))}
                </ul>
           </section>
        </div>
    );
  }
  
  export default ToDo;