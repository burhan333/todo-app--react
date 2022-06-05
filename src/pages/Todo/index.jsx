import { useEffect, useState, useRef } from 'react'
import ArrUp1 from '../../assets/images/arrow-up1.png'
import ArrUp2 from '../../assets/images/arrow-up2.png'
import ArrDown1 from '../../assets/images/arrow-down1.png'
import ArrDown2 from '../../assets/images/arrow-down2.png'
import IconClose from '../../assets/images/close.png'
import Logo from '../../assets/images/logo.png'

const Todo = () => {

    // const [createdAt, setCreatedAt] = useState('')
    // const [modifiedDate, setModifiedDate] = useState('')
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
    const [location, setLocation] = useState('')
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
    // const [editId, setEditId] = useState(0)
    // const [isFiltered, setIsFiltered] = useState(false)
    const savedData = localStorage.getItem('data')
    const componentRef = useRef()
    const API_KEY = process.env.REACT_APP_API_KEY
    const [data, setData] = useState([])
    // const [data, setData] = useState([
    //     {
    //         id: 1,
    //         taskName: 'Study in canada',
    //         createdAt: '06-01-2019',
    //         dueDate: '03-06-2022',
    //         modifiedDate: '07-01-2019',
    //         priority: 'Low',
    //         location: 'Karachi',
    //         priorityNum: 1,
    //         isDone: true,
    //         isLate: false,
    //     },
    //     {
    //         id: 2,
    //         taskName: 'Development',
    //         createdAt: '29-09-2020',
    //         dueDate: '05-06-2022',
    //         modifiedDate: '02-10-2020',
    //         priority: 'Medium',
    //         location: 'Lahore',
    //         priorityNum: 2,
    //         isDone: false,
    //         isLate: false,
    //     },
    //     {
    //         id: 3,
    //         taskName: 'Go the park',
    //         createdAt: '02-04-2022',
    //         dueDate: '03-06-2021',
    //         modifiedDate: '04-04-2022',
    //         priority: 'High',
    //         location: 'Islamabad',
    //         priorityNum: 3,
    //         isDone: false,
    //         isLate: false,
    //     },
    //     {
    //         id: 4,
    //         taskName: 'Deployment on friday',
    //         createdAt: '25-01-2021',
    //         dueDate: '15-05-2022',
    //         modifiedDate: '05-02-2021',
    //         priority: 'High',
    //         location: 'Karachi',
    //         priorityNum: 3,
    //         isDone: true,
    //         isLate: false,
    //     },
    //     {
    //         id: 5,
    //         taskName: 'Deployment',
    //         createdAt: '03-06-2022',
    //         dueDate: '25-12-2018',
    //         modifiedDate: '19-12-2018',
    //         priority: 'High',
    //         location: 'Karachi',
    //         priorityNum: 3,
    //         isDone: true,
    //         isLate: false,
    //     },
    // ])

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        getDate()
        getLatLong()
    }, [])
    
    useEffect(() => {
        getInitialData()
    }, [today])

    useEffect(() => {
        // getLocation()
    }, [lat, long])

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

    console.log('ids', ids);

    const getLocation = () => {
        if (lat && long)
        {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + long} &key=${API_KEY}`
            fetch(url, { method: 'GET' }).then(res => res.json())
            .then(res => {
                let mainarr = res.results
                let city = ''
                var english = /^[0-9A-Za-z\s\-]+$/
    
                for (let i = 0; i < mainarr.length; i++)
                {
                    for (let j = 0; j < mainarr[i].address_components.length; j++) {
                        if (english.test(mainarr[i].address_components[j].short_name)) {
                            if (mainarr[i].address_components[j].types.includes('locality')) {
                                city = mainarr[i].address_components[j].short_name ? mainarr[i].address_components[j].short_name : city;
                            }
                        }
                    }
                    if(city) break
                }
                setLocation(city)
            })
        }
    }

    const getLatLong = () => {
        navigator.geolocation.getCurrentPosition((e) => {
            setLat(e.coords.latitude);
            setLong(e.coords.longitude);
        })
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

    const toggleSortLocation = () => {
        if(sortOrder === 'asc')
        {
            setSortOrder('desc')
            searchedData.sort((a,b) => (a.location > b.location) ? 1 : ((b.location > a.location) ? -1 : 0))
        }
        else if(sortOrder === 'desc')
        {
            setSortOrder('asc')
            searchedData.sort((a,b) => (a.location < b.location) ? 1 : ((b.location < a.location) ? -1 : 0))
        }
        setSortBy('location')
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

    // console.log('data', data);

    // console.log('edit Index', editIndex);

    const handleAddtask = () => {
        const id = ids.length+1
        const tempDate = dueDate.split('-').reverse().join('-')
        const newTask = {taskName, createdAt: today, dueDate: tempDate, modifiedDate: today, priority, priorityNum, isDone: false, isLate: false, location, id}
        setData([...data, newTask])
        setSearchedData([...data, newTask])
        localStorage.setItem('data', JSON.stringify([...data, newTask]))
        setIds([...ids, id])
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
    }

    const handleDelete = (id) => {
        const tempData = data.filter((item, index) => item.id !== id )
        setData(tempData)
        setSearchedData(tempData)
        localStorage.setItem('data', JSON.stringify(tempData))
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
                    <input type="search" placeholder='Search Task' value={search} onKeyDown={(e) => handleKey(e)} onChange={(e) => handleSearch(e)} onFocus={() => setShowSearchList(true)} />
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
                    <p className={sortBy === 'location' ? 'active' : ''} onClick={toggleSortLocation}>Location {sortBy === 'location' && (sortOrder ==='asc' ? <img src={ArrUp2} /> : <img src={ArrDown2} />)}</p>
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
                                <p>{item.location}</p>
                                <div className="todo_check">
                                    <input type="checkbox" checked={item.isDone ? true : false} onChange={() => handleCheckBox(index)} />
                                </div>
                                <div className='todo_updown'><button disabled={index === 0 ? true : false} onClick={() => handleOrder('up', index)}><img src={ArrUp1} /> </button> <button disabled={index === data.length-1 ? true : false} onClick={() => handleOrder('down', index)}><img src={ArrDown1} /></button></div>
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
                    <button onClick={() => setDeleteAll(true)} >DELETE ALL</button>
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


// make sort 1 func
// design checkbox
// good icon for sort
// toss notifications
