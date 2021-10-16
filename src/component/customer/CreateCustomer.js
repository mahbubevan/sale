import React from "react";
import { url as u } from "../../helper";

export default class CreateCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            mobile:'',
            email:'',
            address:'',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }

    inputChange(e){
        const target = e.target 
        const name = target.name 
        const value = target.value
        this.setState({
          [name]:value
        })
      }
    
      async handleSubmit(e){
        e.preventDefault()
    
        const body = {            
            name:this.state.name,        
            mobile:this.state.mobile,
            email:this.state.email,
            address:this.state.address,
        }
    
        const url = `${u}customer`
        const data = await fetch(url,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json())
        this.props.setCreatedCustomer(data.data)
        
      }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3> Create Customer </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Customer Name</label>
                                <input onChange={this.inputChange} type="text" name="name" className="form-control" id="name" />                         
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="mobile" className="form-label">Customer Mobile</label>
                                <input onChange={this.inputChange} type="text" name="mobile" className="form-control" id="mobile" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={this.inputChange} type="email" name="email" className="form-control" id="email" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input onChange={this.inputChange} type="text" name="address" className="form-control" id="address" />
                            </div>                            
                        </div>                        
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-success w-100">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}