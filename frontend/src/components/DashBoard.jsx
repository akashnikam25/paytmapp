import axios from 'axios'
import { useState, useEffect } from 'react'


export const Dashboard = ()=>{
    const[filter, setFilter] = useState("all")
    const[users, setUsers] = useState([])
    const[accHolderName, setAccHolderName] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,
            {
                headers:{
                    Authorization:localStorage.getItem('authToken')
                }
            }
        ).then(response => {
            const result = response.data.userList;
            setUsers(result);
            setAccHolderName(response.data.accounHolderName[0].firstName)
            users.map(u=>{
                console.log(u)
            })
        })
    }, [filter])

    return <>
    <div className="flex flex-row ">
      <div> Payment A</div>
       <div>Hello {accHolderName}</div>
    </div>
    <input type="text" placeholder="search users..." onClick={(e)=>{
       setFilter(e.target.value)
    }}/>

       <div>
            {users.map(u => <User key={u._id} user={u} />)}
        </div> 

    </>
}

function User({user}){
  //const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            {/* <Button onClick={(e) => {
               // navigate("/send?id=" + u._id + "&name=" + u.firstName);
            }} label={"Send Money"} /> */}
        </div>
    </div>
}
