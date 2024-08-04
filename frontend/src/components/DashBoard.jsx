import axios from 'axios'
import { useState, useEffect } from 'react'
import { Users } from './Users'
import { Appbar } from './Appbar'
import { Balance } from './Balance'


export const Dashboard = ()=>{
    const[balance, setBalance] = useState([])
     axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers:{
                    Authorization:localStorage.getItem('authToken')
                }
            }
        ).then(response => {
            const result = response.data.Balance;
            setBalance(result);
        })
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>    
}

