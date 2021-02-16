import React, { useState } from "react"
import axios from "axios"
import { navigate, Link } from "@reach/router"

const CreateAuthorForm = props => {

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const onSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/authors", {
            name: name,
        })
            .then(() => navigate("/"))
            .catch(err =>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return(
        <div >
            <div>
                <div>
                    <p><Link to="/">Home</Link></p>
                    <p>Add a new author:&nbsp;
                        {
                            errors.map((err, index) => <small key={index} style={{color:"red"}}>{err}</small>)
                        }
                    </p>
                </div>
            </div>
            <div>
                
                    <form onSubmit={ onSubmit }>
                        <div>
                            <label>Name:</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <button onClick={()=>navigate("/")}>Cancel</button>
                            <button  style={{marginLeft: "10px"}}>Submit</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default CreateAuthorForm