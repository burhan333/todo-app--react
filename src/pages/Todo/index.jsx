import { useEffect, useState, useRef } from 'react'
import { toast } from "react-toastify"

import ArrUp1 from '../../assets/images/arrow-up1.png'
import ArrUp2 from '../../assets/images/arrow-up2.png'
import ArrDown1 from '../../assets/images/arrow-down1.png'
import ArrDown2 from '../../assets/images/arrow-down2.png'
import IconClose from '../../assets/images/close.png'
import Logo from '../../assets/images/logo.png'

const Todo = () => {

    const [data, setData] = useState([])
    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [newDueDate, setNewDueDate] = useState('')
    const [priority, setPriority] = useState('')
    const [priorityNum, setPriorityNum] = useState(0)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('')
    const [today, setToday] = useState('')
    const [renameIndex, setRenameIndex] = useState(-1)
    const [editIndex, setEditIndex] = useState(-1)
    const [searchList, setSearchList] = useState([])
    const [updatedSearchList, setUpdatedSearchList] = useState([])
    const [search, setSearch] = useState('')
    const [showSearchList, setShowSearchList] = useState(false)
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [searchedData, setSearchedData] = useState([])
    const [add, setAdd] = useState(false)
    const [ids, setIds] = useState([])
    const [deleteAll, setDeleteAll] = useState(false)
    const savedData = localStorage.getItem('data')
    const componentRef = useRef()
    const API_KEY = process.env.REACT_APP_API_KEY
    toast.configure()

    useEffect(() => {
        getDate()
        handleClickOutside()
    }, [])
    
    useEffect(() => {
        getInitialData()
    }, [today])

    const getInitialData = () => {
        if (savedData)
        {
            const tempData = JSON.parse(savedData)
            if (tempData.length > 0)
            {
                const array = []
                const array2 = []
                tempData.forEach((item, index) => {
                    let obj = {...tempData[index]}
                    const tempToday = today.split('-')
                    const tempDue = tempData[index].dueDate.split('-')
            
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
                    array2.push(item.id)
                })
                setData(array)
                setSearchedData(array)
                setIds(array2)
            }
        }
    }

    const handleClickOutside = () => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {
            if(componentRef && componentRef.current){
                const ref = componentRef.current
                if(!ref.contains(e.target)){
                    setShowSearchList(false)
                }
            }
        }
    }

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
        searchedData.sort(function (a, b) {
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
        searchedData.sort(function (a, b) {
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
        searchedData.sort(function (a, b) {
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
            searchedData.sort((a,b) => (a.taskName > b.taskName) ? 1 : ((b.taskName > a.taskName) ? -1 : 0))
        }
        else if(sortOrder === 'desc')
        {
            setSortOrder('asc')
            searchedData.sort((a,b) => (a.taskName < b.taskName) ? 1 : ((b.taskName < a.taskName) ? -1 : 0))
        }
        setSortBy('task')
    }

    const toggleSortPriority = () => {
        if(sortOrder === 'asc')
        {
            setSortOrder('desc')
            searchedData.sort((a,b) => a.priorityNum - b.priorityNum)
        }
        else if(sortOrder === 'desc')
        {
            setSortOrder('asc')
            searchedData.sort((a,b) => b.priorityNum - a.priorityNum)
        }
        setSortBy('priority')
    }

    const handleOrder = (value, index) => {
        if (value === 'up')
        {
            const tempData = searchedData
            let a = tempData[index-1]
            let b = tempData[index]
            tempData[index-1] = b
            tempData[index] = a
            setSearchedData([...tempData])
        }
        else if (value === 'down')
        {
            const tempData = searchedData
            let a = tempData[index]
            let b = tempData[index+1]
            tempData[index] = b
            tempData[index+1] = a
            setSearchedData([...tempData])
        }
    }

    const handleCheckBox = (index) => {
        const tempData = data
        tempData[index].isDone === true ? tempData[index].isDone = false : tempData[index].isDone = true
        setData([...tempData])
        setSearchedData([...tempData])
        localStorage.setItem('data', JSON.stringify([...tempData]))
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
        setSearchedData([...newData])
        localStorage.setItem('data', JSON.stringify([...newData]))
    }

    const handleEditIndex = (param) => {
        console.log('param', param);
        var index = data.findIndex(item => item.id === param);
        console.log('index inner', index);
        setEditIndex(index)
        setTaskName(data[index].taskName)
        setDueDate(data[index].dueDate)
        setPriority(data[index].priority)
    }

    const handleAddtask = () => {
        const id = ids.length+1
        const tempDate = dueDate.split('-').reverse().join('-')
        const newTask = {taskName, createdAt: today, dueDate: tempDate, modifiedDate: today, priority, priorityNum, isDone: false, isLate: false, id}
        setData([...data, newTask])
        setSearchedData([...data, newTask])
        localStorage.setItem('data', JSON.stringify([...data, newTask]))
        setIds([...ids, id])
        setAdd(false)

        toast.success('Task Added', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleEditTask = () => {
        const tempDate = newDueDate ? newDueDate.split('-').reverse().join('-') : dueDate
        const newData = data
        newData[editIndex].taskName = taskName
        newData[editIndex].dueDate = tempDate
        newData[editIndex].priority = priority
        newData[editIndex].priorityNum = priorityNum
        newData[editIndex].modifiedDate = today
        setData([...newData])
        setSearchedData([...newData])
        localStorage.setItem('data', JSON.stringify([...newData]))

        setEditIndex(-1)

        toast.warn('Task Edited', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleDelete = (id) => {
        const tempData = data.filter((item, index) => item.id !== id )
        setData(tempData)
        setSearchedData(tempData)
        localStorage.setItem('data', JSON.stringify(tempData))
        // toast("Task is Deleted");

        toast.error('Task Deleted!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleSearchResult = () => {
        const alreadyExist = searchList.some(e => e === search)
        if (!alreadyExist && search)
        {
            setSearchList([...searchList, search])
        }

        const newData = search ? data.filter(item => item.taskName.toLowerCase().includes(search.toLowerCase())) : data
        setSearchedData(newData)
        setShowSearchList(false)
    }

    const handleSearch = (e) => {
        const input = e.target.value
        setSearch(input)
        const newList = input ? searchList.filter(item => item.toLowerCase().includes(input.toLowerCase())) : searchList
        setUpdatedSearchList(newList)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter')
        {
            handleSearchResult()
        }
    }

    const clearSearch = () => {
        setSearchList([])
        setUpdatedSearchList([])
    }

    const handleDeleteAll = () => {
        setData([])
        setSearchedData([])
        localStorage.setItem('data', JSON.stringify([]))
        setDeleteAll(false)

        toast.error('All Task Deleted!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        window.location.reload()
    }

    return(
        <div className="todo">
            <div className="todo_top">
                <img src={Logo} alt="logo" className='todo_logo' />
                <a href="#" onClick={handleLogout}>Logout</a>
            </div>
            <div className="todo_body">
                <div className="todo_search" ref={componentRef}>
                    <input 
                        type="search" 
                        placeholder='Search Task' 
                        value={search} 
                        onKeyDown={(e) => handleKey(e)} 
                        onChange={(e) => handleSearch(e)} 
                        onFocus={() => setShowSearchList(true)} 
                    />
                    <button onClick={handleSearchResult}>Search</button>
                    {updatedSearchList.length > 0 && showSearchList && <div className="todo_list">
                        <p className='todo_recent'>Recent Searches</p>
                        <div className="todo_listInner">
                            {updatedSearchList.map((item, index) => {
                                return(
                                    <p className='todo_savedText' key={index} onClick={() => setSearch(item)}>{item}</p>
                                )
                            })}
                        </div>
                        <p className='todo_clear' onClick={clearSearch}>Clear Recent Searches</p>
                    </div>}
                </div>
                <div className="todo_head">
                    <p>S.NO</p>
                    <p className={sortBy === 'task' ? 'active' : ''} onClick={toggleSortTask}>TASK NAME {sortBy === 'task' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
                    <p className={sortBy === 'created' ? 'active' : ''} onClick={toggleSortCreated}>CREATED AT {sortBy === 'created' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
                    <p className={sortBy === 'due' ? 'active' : ''} onClick={toggleSortDue}>DUE DATE {sortBy === 'due' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
                    <p className={sortBy === 'modified' ? 'active' : ''} onClick={toggleSortModified}>MODIFIED DATE {sortBy === 'modified' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
                    <p className={sortBy === 'priority' ? 'active' : ''} onClick={toggleSortPriority}>PRIORITY {sortBy === 'priority' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
                    <p>MARK AS DONE</p>
                    <p>REORDER TASK</p>
                    <p>ACTIONS</p>
                </div>
                <div className="todo_taskMain">
                    {searchedData.map((item, index) => {
                        return(
                            <div className="todo_task" key={index}>
                                <p>{index+1}</p>
                                <div className="todo_name">
                                    <input type="text" disabled={renameIndex === index ? false : true} value={item.taskName} onChange={(e) => editTaskName(e, index)} />
                                    <button onClick={() => setRenameIndex(renameIndex === -1 ? index : -1)}>{renameIndex === index ? 'done' : 'edit'}</button>
                                </div>
                                <p>{item.createdAt}</p>
                                <p className={item.isLate === true ? 'todo_late' : ''}>{item.dueDate}</p>
                                <p>{item.modifiedDate}</p>
                                <p>{item.priority}</p>
                                <div className="todo_check">
                                    <input type="checkbox" checked={item.isDone ? true : false} onChange={() => handleCheckBox(index)} />
                                </div>
                                <div className='todo_updown'>
                                    <button disabled={index === 0 ? true : false} onClick={() => handleOrder('up', index)}><img src={ArrUp1} /> </button>
                                    <button disabled={index === data.length-1 ? true : false} onClick={() => handleOrder('down', index)}><img src={ArrDown1} /></button>
                                </div>
                                <div className="todo_actio">
                                    <button className='todo_edit' onClick={() => {handleEditIndex(item.id)}}> EDIT</button>
                                    <button className='todo_delete' onClick={() => handleDelete(item.id)}>DELETE</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {data.length == 0 && <p className='todo_err'>Currently there is no task, add a task to view</p>}
                {data.length > 0 && searchedData.length === 0 && <p className='todo_err'>Can not find any task with this name search another task name</p>}
                <div className="todo_btns">
                    <button onClick={() => setDeleteAll(true)} disabled={searchedData.length > 0 ? false : true} >DELETE ALL</button>
                    <button onClick={() => setAdd(true)}>ADD TASK</button>
                </div>
            </div>

            <div className={add ? 'add add_active' : 'add'}>
                <div className="add_inner">
                    <p className="add_title">ADD TASK</p>
                    <label>Task Name</label>
                    {add && <div>
                        <input type="text" placeholder='Task Name' onChange={(e) => setTaskName(e.target.value)} />
                        <label>Due Date</label>
                        <input type="date" min={today.split('-').reverse().join('-')} onChange={(e) => setDueDate(e.target.value)} />
                        <label>Priority</label>
                        <select onChange={(e) => handlePriority(e)} defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>SELECT PRIORITY</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>}
                    <button className='add_btn' onClick={handleAddtask} disabled={(taskName && dueDate && priority) ? false : true} >ADD</button>
                    <img src={IconClose} alt="" className='add_close' onClick={() => setAdd(false)} />
                </div>
            </div>

            <div className={editIndex !== -1 ? 'add add_active' : 'add'}>
                <div className="add_inner">
                    <p className="add_title">EDIT TASK</p>
                    <label>Task Name</label>
                    <input type="text" placeholder='Task Name' value={taskName && taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <label>Due Date</label>
                    <input type="date" min={today.split('-').reverse().join('-')} value={newDueDate ? newDueDate : dueDate.split('-').reverse().join('-')} onChange={(e) => setNewDueDate(e.target.value)} />
                    <label>Priority</label>
                    <select onChange={(e) => handlePriority(e)}>
                        <option value="Low" selected={editIndex !== -1 && data[editIndex].priority === 'Low' ? true : false}>Low</option>
                        <option value="Medium" selected={editIndex !== -1 && data[editIndex].priority === 'Medium' ? true : false}>Medium</option>
                        <option value="High" selected={editIndex !== -1 && data[editIndex].priority === 'High' ? true : false}>High</option>
                    </select>
                    <button className='add_btn' onClick={handleEditTask} disabled={(taskName && dueDate && priority) ? false : true} >EDIT TASK</button>
                    <img src={IconClose} alt="" className='add_close' onClick={() => setEditIndex(-1)} />
                </div>
            </div>

            <div className={deleteAll ? 'add add_active' : 'add'}>
                <div className="add_inner">
                    <p className="add_title">Are you sure you want to delete all task</p>
                    <button className='add_btn' onClick={handleDeleteAll}>DELETE</button>
                    <button className='add_btn' onClick={() => setDeleteAll(false)}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}

export default Todo
