import React, {useState, useEffect} from "react"
import axios from "axios"
import { Link, navigate } from "@reach/router"

const AuthorsTable = props => {
    const { counter, setCounter } = props
    const [authors, setAuthors] = useState([])

    useEffect( () => {
        axios.get("http://localhost:8000/api/authors")
            .then(response => setAuthors((response.data.authors).sort((a,b) => (a.name > b.name) ? 1: -1)))
            .catch(error => console.log("There was an issue: ", error))
    }, [counter])


    const getAuthorId = author => {
        return `/${author._id}`
    }

    const editAuthorUrl = author_id => {
        return `${author_id}/edit`
    }

    const deleteAuthor = url => {
        axios.delete("http://localhost:8000/api/authors" + url)
            .then(response => console.log("Author was successfully deleted: ", response))
            .then(()=> setCounter( {count: -1} ))
            .catch(error => console.log("There was a problem: ", error))
    }

    return(
        <div className="container">
            <div className="row">
                <div>
                    <p><Link to="/new">Add an author</Link></p>
                    <p>We have quotes by:</p>
                </div>
            </div>
            <div>
                <div>
                    <table>
                        <thead className="thead-dark">
                        <tr>
                            <th>Author</th>
                            <th>Actions available</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            authors.map( (author, i) => (
                                <tr key={i}>
                                    <td>{author.name}</td>
                                    <td>
                                        <button><Link to={ getAuthorId(author) }>Edit</Link></button>
                                        <button onClick={ (e)=>{deleteAuthor(getAuthorId(author))} } className="btn btn-danger btn-sm" style={{marginLeft: "10px"}}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default AuthorsTable;