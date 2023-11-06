import { ReactElement, useState } from 'react';

// *For scalable code the toDo card should be its own component

/**
 * 
 * implements a simple todo list that adds card elements to a list with the ability to re-order thier priority
 */
function ToDo() {
    const [toDocardList, setToDoCardList] = useState<ToDoCardProps[]>([]);
    const [error, setError] = useState<string>("");

    // toDo card interfact
    type ToDoCardProps = {
        index: number;
        title: string;
        description: string;
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
            let currentIndex = toDocardList.length;
            if(!toDocardList.length) {
                currentIndex = 0;
            }
            setError("");
            setToDoCardList([...toDocardList, {index: currentIndex,title: title.value, description: description.value}]);
            title.value = "";
            description.value = "";
        }
        else if (!title.value || !description.value) {
            setError("*You must fill in both fields");
        }
    }

    /**
     * 
     * @param props takes in the title and description of the toDo card
     * @returns ReactElement
     */
    const ToDoCard = (props: ToDoCardProps) :ReactElement => {
        return (
            <li key={props.index} className="card bg-slate-100 my-5 drop-shadow-md p-4 box-border rounded-md w-full inline-block">
                <div className="card__text float-left w-4/5">
                    <h2 className="text-lg my-2">{props.title}</h2>
                    <p className="text-sm my-2">{props.description}</p>
                </div>
                <div className="card__order float-left w-1/5">
                    <button onClick={prioritizeCard} value={props.index} className="card__order__arrow w-10 h-10 rounded-full bg-rose-800 hover:bg-rose-600 text-white text-center font-bold text-2xl m-5">↑</button>
                </div>
            </li>
        )
    }

    /**
     * If the current item clicked is not the first item in the list, swap the current item with the item above it
     * @param e takes in the event of the button click
     */
    const prioritizeCard = (e: React.MouseEvent<HTMLButtonElement>) :void => {
        const currentIndex = Number((e.currentTarget as HTMLButtonElement).value);
        if(currentIndex !== 0) {
            const temp = toDocardList[currentIndex];
            toDocardList[currentIndex] = toDocardList[currentIndex - 1];
            toDocardList[currentIndex - 1] = temp;
            setToDoCardList([...toDocardList]);
        }
    }

    /** VIEW */
    return (
        <div className="todo">
           <section className="todo__field flex-1 w-9/12 m-auto pt-16 max-w-md text-left">
                <h1 className="text-xl my-5 font-bold">To Do</h1>
                <div className="todo__field__item w-full my-1">
                    <label htmlFor="title" className="w-full my-0.5">Title</label>
                    <input type="text" name="title" placeholder="Learn Svelt" className="w-full my-0.5 border-solid border-gray-950 indent-1"/>
                </div>
                <div className="todo__field__item w-full my-1">
                    <label htmlFor="description" className="w-full my-0.5">Description</label>
                    <textarea name="description" placeholder="write a to do list in svelt as well as displaying data from a public API" className="w-full my-0.5 border-solid border-gray-950 indent-1"></textarea>
                </div>
                <button onClick={addToDoItem} className="w-full bg-rose-800 h-9 rounded-md hover:bg-rose-600 hover:text-white font-bold drop-shadow-md my-5">Add</button>
                {(error !== "") && 
                    <p className="text-red-600">{error}</p>
                }
           </section>
           <section className="todo__field flex-1 w-9/12 m-auto pt-5 max-w-md text-left">
                <h2 className="text-xl my-5 font-bold">To Do List</h2>
                <ul>
                        {toDocardList.map((card, index) => (
                            <ToDoCard index={index} title={card.title} description={card.description} />
                        ))}
                </ul>
           </section>
        </div>
    );
  }
  
  export default ToDo;