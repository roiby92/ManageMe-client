import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { inject, observer } from 'mobx-react'



const TodosChart = inject('user')(observer((props) =>  {

    const { user } = props

    const COLORS = ['#023047', '#fb8500'];

    const [allTodoStatus, setAllTodoStatus] = useState([
        {
            name: "Completed",
            value: user.todosCompleted
        },
        {
            name: "Uncompleted",
            value: user.todosNotCompleted
        }
    ])


    return (
        <ResponsiveContainer width='100%' height={400} >
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={allTodoStatus}
                    cx={200}
                    cy={250}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {
                        allTodoStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );

}))




export default TodosChart