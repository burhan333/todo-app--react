import { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png'

const Todo = () => {

    // const [createdAt, setCreatedAt] = useState('')
    // const [modifiedDate, setModifiedDate] = useState('')
    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [priority, setPriority] = useState('')
    const [priorityNum, setPriorityNum] = useState(0)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('')
    const [today, setToday] = useState('')
    const [renameIndex, setRenameIndex] = useState(-1)
    const [editIndex, setEditIndex] = useState(-1)

    const [data, setData] = useState([
        {
            taskName: 'Study in canada',
            createdAt: '06-01-2019',
            dueDate: '02-06-2018',
            modifiedDate: '07-01-2019',
            priority: 'Low',
            priorityNum: 1,
            isDone: true,
            isLate: false,
        },
        {
            taskName: 'Development',
            createdAt: '29-09-2020',
            dueDate: '03-06-2022',
            modifiedDate: '02-10-2020',
            priority: 'Medium',
            priorityNum: 2,
            isDone: false,
            isLate: false,
        },
        {
            taskName: 'Go the park',
            createdAt: '02-04-2022',
            dueDate: '03-06-2021',
            modifiedDate: '04-04-2022',
            priority: 'High',
            priorityNum: 3,
            isDone: false,
            isLate: false,
        },
        {
            taskName: 'Deployment on friday',
            createdAt: '25-01-2021',
            dueDate: '15-05-2022',
            modifiedDate: '05-02-2021',
            priority: 'High',
            priorityNum: 3,
            isDone: true,
            isLate: false,
        },
        {
            taskName: 'Deployment',
            createdAt: '03-06-2022',
            dueDate: '25-12-2018',
            modifiedDate: '19-12-2018',
            priority: 'High',
            priorityNum: 3,
            isDone: true,
            isLate: false,
        },
    ])
    
    useEffect(() => {
        getDate()
        handleDueDate()
    }, [today])

    const handleDueDate = () => {
        const array = []
        data.forEach((item, index) => {
            let obj = {...data[index]}
            const tempToday = today.split('-')
            const tempDue = data[index].dueDate.split('-')
    
            if (tempToday[2] > tempDue[2])
            {
                obj.isLate = true
            }
            else if (tempToday[1] > tempDue[1])
            {
                obj.isLate = true
            }
            else if (tempToday[0] > tempDue[0])
            {
                obj.isLate = true
            }

            array.push(obj)
        })
        setData(array)
    }

    // console.log('data', data);

    const getDate = () => {
        const d = new Date()
        let day = d.getDate()
        let month = d.getMonth()
        month = month+1
        const year = d.getFullYear()

        if (month < 10)
        {
            month = '0' + month;
        }
        if (day < 10)
        {
            day = '0' + day;
        }
        setToday(`${day}-${month}-${year}`)
    }

    const toggleSortCreated = () => {
        data.sort(function (a, b) {
            if(sortOrder === 'asc')
            {
                setSortOrder('desc')
                const item1 = a.createdAt.split('-'),
                    item2 = b.createdAt.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
            else if(sortOrder === 'desc')
            {
                setSortOrder('asc')
                const item2 = a.createdAt.split('-'),
                    item1 = b.createdAt.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
        });
        setSortBy('created')
    }

    const toggleSortDue = () => {
        data.sort(function (a, b) {
            if(sortOrder === 'asc')
            {
                setSortOrder('desc')
                const item1 = a.dueDate.split('-'),
                    item2 = b.dueDate.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
            else if(sortOrder === 'desc')
            {
                setSortOrder('asc')
                const item2 = a.dueDate.split('-'),
                    item1 = b.dueDate.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
        });
        setSortBy('due')
    }

    const toggleSortModified = () => {
        data.sort(function (a, b) {
            if(sortOrder === 'asc')
            {
                setSortOrder('desc')
                const item1 = a.modifiedDate.split('-'),
                    item2 = b.modifiedDate.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
            else if(sortOrder === 'desc')
            {
                setSortOrder('asc')
                const item2 = a.modifiedDate.split('-'),
                    item1 = b.modifiedDate.split('-');
                return item1[2] - item2[2] || item1[1] - item2[1] || item1[0] - item2[0];
            }
        });
        setSortBy('modified')
    }

    const toggleSortTask = () => {
        if(sortOrder === 'asc')
        {
            setSortOrder('desc')
            data.sort((a,b) => (a.taskName > b.taskName) ? 1 : ((b.taskName > a.taskName) ? -1 : 0))
        }
        else if(sortOrder === 'desc')
        {
            setSortOrder('asc')
            data.sort((a,b) => (a.taskName < b.taskName) ? 1 : ((b.taskName < a.taskName) ? -1 : 0))
        }
        setSortBy('task')
    }

    const toggleSortPriority = () => {
        if(sortOrder === 'asc')
        {
            setSortOrder('desc')
            data.sort((a,b) => a.priorityNum - b.priorityNum)
        }
        else if(sortOrder === 'desc')
        {
            setSortOrder('asc')
            data.sort((a,b) => b.priorityNum - a.priorityNum)
        }
        setSortBy('priority')
    }

    const handleOrder = (value, index) => {
        if (value === 'up')
        {
            const tempData = data
            let a = tempData[index-1]
            let b = tempData[index]
            tempData[index-1] = b
            tempData[index] = a
            setData([...tempData])
        }
        else if (value === 'down')
        {
            const tempData = data
            let a = tempData[index]
            let b = tempData[index+1]
            tempData[index] = b
            tempData[index+1] = a
            setData([...tempData])
        }
    }

    const handleCheckBox = (index) => {
        const tempData = data
        tempData[index].isDone === true ? tempData[index].isDone = false : tempData[index].isDone = true
        setData([...tempData])
    }

    const handlePriority = (e) => {
        const value = e.target.value
        if (value === 'Low')
        {
            setPriorityNum(1)
        }
        else if (value === 'Medium')
        {
            setPriorityNum(2)
        }
        else if (value === 'High')
        {
            setPriorityNum(3)
        }
        setPriority(e.target.value)
    }

    const editTaskName = (e, index) => {
        const newTaskName = e.target.value
        const newData = data
        newData[index].taskName = newTaskName
        setData([...newData])
    }

    const handleEditIndex = (index) => {
        setEditIndex(index)
        setTaskName(data[index].taskName)
        setDueDate(data[index].dueDate)
        setPriority(data[index].priority)
    }

    const handleSubmit = () => {
        const temp = dueDate.split('-').reverse().join('-')
        const newTask = {taskName, createdAt: today, dueDate: temp, modifiedDate: today, priority, priorityNum, isDone: false, isLate: false}
        setData([...data, newTask])
    }

    console.log('today', today);
    // console.log('task', taskName);
    console.log('due date', dueDate);

    return(
        <div className="todo">
            <div className="todo_top">
                <img src={Logo} alt="logo" className='todo_logo' />
                <a href="#">Logout</a>
            </div>
            <div className="todo_body">
                <div className="todo_head">
                    <p>S.NO</p>
                    <p className={sortBy === 'task' ? 'active' : ''} onClick={toggleSortTask}>TASK NAME {sortBy === 'task' && (sortOrder ==='asc' ? <span>&#8657;</span> : <span>&#8659;</span>)}</p>
                    <p className={sortBy === 'created' ? 'active' : ''} onClick={toggleSortCreated}>CREATED AT {sortBy === 'created' && (sortOrder ==='asc' ? <span>&#8657;</span> : <span>&#8659;</span>)}</p>
                    <p className={sortBy === 'due' ? 'active' : ''} onClick={toggleSortDue}>DUE DATE {sortBy === 'due' && (sortOrder ==='asc' ? <span>&#8657;</span> : <span>&#8659;</span>)}</p>
                    <p className={sortBy === 'modified' ? 'active' : ''} onClick={toggleSortModified}>MODIFIED DATE {sortBy === 'modified' && (sortOrder ==='asc' ? <span>&#8657;</span> : <span>&#8659;</span>)}</p>
                    <p className={sortBy === 'priority' ? 'active' : ''} onClick={toggleSortPriority}>PRIORITY {sortBy === 'priority' && (sortOrder ==='asc' ? <span>&#8657;</span> : <span>&#8659;</span>)}</p>
                    <p>MARK AS DONE</p>
                    <p>REORDER TASK</p>
                </div>
                {data.map((item, index) => {
                    return(
                        <div className="todo_task" key={index}>
                            <p>{index+1}</p>
                            <input type="text" disabled={renameIndex === index ? false : true} value={item.taskName} onChange={(e) => editTaskName(e, index)} />
                            <button onClick={() => setRenameIndex(renameIndex === -1 ? index : -1)}>{renameIndex === index ? 'done' : 'edit'}</button>
                            <button onClick={() => handleEditIndex(index)}> EDIT</button>
                            {/* <p>{item.taskName}</p> */}
                            <p>{item.createdAt}</p>
                            <p className={item.isLate === true ? 'late' : ''}>{item.dueDate}</p>
                            <p>{item.modifiedDate}</p>
                            <p>{item.priority}</p>
                            <input type="checkbox" checked={item.isDone ? true : false} onChange={() => handleCheckBox(index)} />
                            <p><button disabled={index === 0 ? true : false} onClick={() => handleOrder('up', index)}>UP</button> <button disabled={index === data.length-1 ? true : false} onClick={() => handleOrder('down', index)}>DOWN</button></p>
                        </div>
                    )
                })}
            </div>
            <div>
                <h1>ADD TASK</h1>
                <input type="text" placeholder='Task Name' onChange={(e) => setTaskName(e.target.value)} />
                <br />
                <input type="date" min={today.split('-').reverse().join('-')} onChange={(e) => setDueDate(e.target.value)} />
                <br />
                <select onChange={(e) => handlePriority(e)} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>SELECT PRIORITY</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={handleSubmit} disabled={(taskName && dueDate && priority) ? false : true} >ADD</button>
            </div>
            <div>
                <h1>EDIT TASK</h1>
                <input type="text" placeholder='Task Name' value={taskName && taskName} onChange={(e) => setTaskName(e.target.value)} />
                <br />
                <input type="date" min={today.split('-').reverse().join('-')} value={dueDate && dueDate} onChange={(e) => {setDueDate(e.target.value); console.log('123', e.target.value);}} />
                <br />
                <select onChange={(e) => handlePriority(e)}>
                    <option value="Low" selected={editIndex !== -1 && data[editIndex].priority === 'Low' ? true : false}>Low</option>
                    <option value="Medium" selected={editIndex !== -1 && data[editIndex].priority === 'Medium' ? true : false}>Medium</option>
                    <option value="High" selected={editIndex !== -1 && data[editIndex].priority === 'High' ? true : false}>High</option>
                </select>
                <button onClick={handleSubmit} disabled={(taskName && dueDate && priority) ? false : true} >ADD</button>
            </div>
        </div>
    )
}

export default Todo


// make sort 1 func