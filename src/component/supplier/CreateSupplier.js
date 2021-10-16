import React from "react";
import { url as u } from "../../helper";

export default class CreateSupplier extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            prop_name:'',
            phone:'',
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
            prop_name:this.state.prop_name,
            phone:this.state.phone,
            address:this.state.address,
        }
    
        const url = `${u}supplier`
        const data = await fetch(url,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json())
        this.props.setCreateSupplier(data.data)

      }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3> Create Supplier </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Company Name</label>
                                <input onChange={this.inputChange} type="text" name="name" className="form-control" id="name" />                         
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="prop_name" className="form-label">Propriter Name</label>
                                <input onChange={this.inputChange} type="text" name="prop_name" className="form-control" id="prop_name" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input onChange={this.inputChange} type="text" name="phone" className="form-control" id="phone" />
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