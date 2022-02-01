import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType =
    {
        id: string,
        title: string,
        filter: FilterValuesType
    }


function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

/*
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/


   /* let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])*/


    /*let [filter, setFilter] = useState<FilterValuesType>("all");*/

    function removeTask(toDoID: string,id: string) {
        setTasks({...tasks, [toDoID]: tasks[toDoID].filter(f=>f.id!==id)})
     /*   let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(toDoID: string,title: string) {

         let newTask = {id: v1(), title: title, isDone: false};
         setTasks({...tasks, [toDoID]: [newTask,...tasks[toDoID]]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(toDoID: string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[toDoID]: tasks[toDoID].map(m=>m.id===taskId ? {...m,isDone}:m)})

       /* let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
    }




    function changeFilter(toDoID:string,value: FilterValuesType) {
        /*    setFilter(value);*/
           setTodolists(todolists.map((m)=>m.id===toDoID ? {...m, filter: value} : m))
    }


    return (
        <div className="App">
            {todolists.map((td, index) => {
                let tasksForTodolist = tasks[td.id];

                if (td.filter === "active") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === false);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist key={index}
                              toDoID={td.id}
                              title={td.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={td.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
