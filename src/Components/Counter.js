import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row, Space, Table, Tag, Typography } from 'antd'
import { render } from '@testing-library/react';
const {Title} = Typography;

const Counter = () => {
    const tableColumns = [
        {
            title:"Key",
            dataIndex: "key",
            key: "key"
        },
        {
            title:"To Do",
            dataIndex: "todo",
            key: "todo"
        },
        {
            title:"Status",
            dataIndex: "status",
            key: "status",
            render: (index)=> {
                return(index == "Completed" ? <Tag type="success">Completed</Tag> : <Tag>Pending</Tag>)
            }
        },
        {
            title:"Action",
            dataIndex: "action",
            key: "action",
            render: (index,data)=> {return(
                <Space size="middle">
                    <Button type="primary" onClick={()=> completeTodo(data.key)}>Done</Button>
                    <Button type="primary" danger onClick={()=> deleteTodo(data.key)}>Delete</Button>
                </Space>
            )}
        }
    ];

    const [inputToDo,setInputToDo] = useState("");
    const [recordCount ,setRecordCount] = useState("");

    const[todoData,setTodoData]= useState([
        {
            key:"1",
            todo:"complete assignment",
            status: "pending"
        }
    ]);
    useEffect(() => {
        {todoData && setRecordCount(todoData.length)}
      
    }, [todoData])
    

    /*add new todo*/ 

    const addToDo = ()=>{
        let tempData = todoData;

        setTodoData([
            ...tempData,
            {
                key: recordCount + 1,
                todo: inputToDo,
                status:"Pending"
            }
        ]);

        setInputToDo("");
    }

    /* delete todo*/

    const deleteTodo = (key)=>{
        let tempData = todoData;

        tempData = tempData.filter((todo)=> {return todo.key != key});

        setTodoData(tempData);

    }

    /* change todo status to - Done*/

    const completeTodo = (key)=>{

        let tempData = todoData;

        tempData = tempData.map((todo)=> todo.key == key ? { ...todo, status: "Completed" }: todo)

        setTodoData(tempData);

    }

  return (
    <div>
        <Title level={3}>To Do List</Title>
        <div style={{marginBottom:'24px'}}>
            <Row align="middle" gutter={[16,32]} justify="start">
                <Col span={6}><label>To Do</label></Col>
                <Col span={6}><Input value={inputToDo} onChange={(e)=> setInputToDo(e.target.value)}/></Col>
                <Col span={12}><Button type="primary" onClick={()=> addToDo()}>Add To Do</Button></Col>
            </Row>
        </div>

        <Table columns={tableColumns} dataSource={todoData}/>
    </div>
  )
}

export default Counter