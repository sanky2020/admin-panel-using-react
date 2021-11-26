import React from 'react'
import axios from "axios"

export default class Table extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            arrAdmin : [],
            filteredAdminArray:[],
            detailArr:"true",
        }
    }
    //fetching data thru api
    componentDidMount(){
        axios.get("http://admin-panel-in-react-default-rtdb.firebaseio.com/data.json")
        .then((result) => {
        this.setState({filteredAdminArray:result.data}) 
        this.setState({arrAdmin:result.data}) 
        console.log(this.state.filteredAdminArray)           
        }).catch((err) => {
            console.log(err.message)
        });
    }
    handleClick=(userID)=>{
        this.setState({detailArr: userID });
    }
    handleChange=(e)=>{
        console.log(e.target.value);
        let filteredUsers = this.state.filteredAdminArray.filter(item=>{
            return item.firstName.toLowerCase().includes(e.target.value.toLowerCase())||item.lastName.toLowerCase().includes(e.target.value.toLowerCase());
        })
        this.setState({arrAdmin: filteredUsers})
    }
    render(){

        return <div id="container">
            <div id="wrapper">
            {/* <form > */}
                <div id="form">
                <div id="search">
                <img id="image" src="./search-icon.svg" alt="Search Icon" />
                <input onChange={this.handleChange} type="text" placeholder="Enter something" name="search-box" id="search-box" autoFocus/></div>
                
                </div>
            {/* </form> */}
            <div id="table-wrapper">
            
            <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
            {this.state.arrAdmin.map(item=>{
                return <tr onClick={()=>this.handleClick(item)} key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            })}   
            </tbody>
            </table>
            </div>
            </div>
            <div id="details-wrapper">
                <h1>Details</h1>
                <p id="info">Click on a table item to get detailed information</p>
                {this.state.detailArr !== "true" ? <div>
                    <p><b>User Selected:</b> {this.state.detailArr.firstName} {this.state.detailArr.lastName}</p>
                    <h2>Description:</h2>
                    <textarea cols="50" rows="7" readOnly value={this.state.detailArr.description}></textarea>
                    <p><b>Address:</b> {this.state.detailArr.address.streetAddress}</p>
                    <p><b>City:</b> {this.state.detailArr.address.city}</p>
                    <p><b>State:</b> {this.state.detailArr.address.state}</p>
                    <p><b>Zip:</b> {this.state.detailArr.address.zip}</p>
                </div> : "" }
            </div>
        </div>
    }
}
