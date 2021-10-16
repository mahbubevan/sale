import React from "react";
import { url as u } from "../../helper";

export default class EditCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            mobile:'',
            email:'',
            address:'',
            customerId:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }

    componentDidMount()
    {
        this.setState({
            name:this.props.name,
            mobile:this.props.mobile,
            email:this.props.email,
            address:this.props.address,
            customerId:this.props.customerId
        })
    }

    componentWillReceiveProps(newprop)
    {
        if (newprop.customerId !== this.state.customerId) {
            this.setState({
                name:newprop.name,
                mobile:newprop.mobile,
                email:newprop.email,
                address:newprop.address,
                customerId:newprop.customerId,
            })
        }
    
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
            phone:this.state.mobile,
            email:this.state.email,
            address:this.state.address,
        }
    
        const url = `${u}customer/${this.state.customerId}`
        const data = await fetch(url,{
          method:"PUT",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json())
        console.log(data);
        this.props.changeEditComponent(data)
      }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3> Edit Customer </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Customer Name</label>
                                <input onChange={this.inputChange} type="text" name="name" value={this.state.name} className="form-control" id="name" />                         
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="mobile" className="form-label">Customer Mobile</label>
                                <input onChange={this.inputChange} type="text" name="mobile" value={this.state.mobile} className="form-control" id="mobile" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={this.inputChange} type="email" name="email" value={this.state.email} className="form-control" id="email" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input onChange={this.inputChange} type="text" name="address" value={this.state.address} className="form-control" id="address" />
                            </div>                            
                        </div>                        
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-success w-100">Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}