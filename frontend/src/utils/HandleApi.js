import axios from 'axios';

const baseUrl = "http://localhost:5000";

// Fetch all todos and update state
const getAllToDo = (setToDo) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            console.log('data --->', data);
            setToDo(data);
        })
        .catch((err) => console.log('Error fetching todos:', err));
};

// Add a new todo, clear the input, and refresh the todo list
const addToDo = (text, setText, setToDo) => {
    if (!text.trim()) {
        console.log('Todo text is empty');
        return;
    }

    axios
        .post(`${baseUrl}/save`, { text })
        .then(({ data }) => {
            console.log('Add response --->', data);
            setText("");
            getAllToDo(setToDo);
        })
        .catch((err) => console.log('Error adding todo:', err));
};

// Update an existing todo, reset input and update mode, and refresh the todo list
const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    if (!text.trim()) {
        console.log('Todo text is empty');
        return;
    }

    axios
        .post(`${baseUrl}/update`, { _id: toDoId, text })
        .then(({ data }) => {
            console.log('Update response --->', data);
            setText("");
            setIsUpdating(false);
            getAllToDo(setToDo);
        })
        .catch((err) => console.log('Error updating todo:', err));
};

// Delete a todo and refresh the todo list
const deleteToDo = (_id, setToDo) => {
    axios
        .post(`${baseUrl}/delete`, { _id })
        .then(({ data }) => {
            console.log('Delete response --->', data);
            getAllToDo(setToDo);
        })
        .catch((err) => console.log('Error deleting todo:', err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
