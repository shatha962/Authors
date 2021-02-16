import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate, Link } from "@reach/router"

const EditAuthorForm = props => {

    const { id } = props
    const [author, setAuthor] = useState({})
    const [exists, setExists] = useState(true)

    useEffect( ()=> {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => setAuthor(response.data.Author[0]))
            .catch(error => {
                console.log("There was an issue, ", error)
                setExists(false)
            })
    }, [])

    console.log("hello")


    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/authors/${id}`, {
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

    if (exists === false){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2 text-center" style={{marginTop: "200px"}}>
                        <h3>Oops. That author doesn't exists.</h3>
                        <p><Link to="/new">Would you like to add this author?</Link></p>
                    </div>
                </div>
            </div>)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p><Link to="/">Home</Link></p>
                    <p>Edit this author:&nbsp;
                        {
                            errors.map((err, index) => <small key={index} style={{color:"red"}}>{err}</small>)
                        }
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={ onSubmit }>
                        <div className="form-group">
                            <label>Name:</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder={author.name} className="form-control"/>
                        </div>
                        <div className="form-group text-right">
                            <button onClick={()=>navigate("/")} type="button" className="btn btn-secondary btn-sm">Cancel</button>
                            <button className="btn btn-primary btn-sm" style={{marginLeft: "10px"}}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditAuthorForm