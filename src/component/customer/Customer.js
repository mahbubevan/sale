import React from "react";
import CreateCustomer from './CreateCustomer'
import EditCustomer from "./EditCustomer";
import { url as u } from "../../helper";

export default class Customer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,
            customerList:[],
            isEditComponent:false,
            name:'',
            mobile:'',
            address:'',
            email:'',
            customerId:''
        }

        this.setCreatedCustomer = this.setCreatedCustomer.bind(this)
        this.editCustomer = this.editCustomer.bind(this)
        this.changeEditComponent = this.changeEditComponent.bind(this)
    }


    async componentDidMount(){
        const url = `${u}customer`
        const data = await fetch(url).then(res=>res.json())
        
        this.setState({
            customerList:data.data,
            isLoaded:true
        })
    }

    setCreatedCustomer(data)
    {
        this.setState({
            customerList:[...this.state.customerList,data]
        })
    }

    changeEditComponent(data)
    {
        let newCustomerList = this.state.customerList.filter((val,id)=> val.id !== data.data.id )
        this.setState({
            isEditComponent:false,
            customerList:[data.data,...newCustomerList]
        })
    }

    editCustomer(data)
    {
        this.setState({
            isEditComponent:true,
            name:data.name,
            email:data.email,
            address:data.address,
            mobile:data.mobile,
            customerId:data.id
        })

    }


    render(){
        return (
            this.state.isLoaded ? 
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='card-title'> Customer Lists </h4>
                            </div>
                            <div className='card-body'>
                        <div className="table-responsive">
                            <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customerList.map((val,id)=>(
                                        <tr key={id++}>
                                            <th scope="row">{++id}</th>
                                            <td>{val.name}</td>
                                            <td>{val.mobile}</td>
                                            <td>{val.email}</td>
                                            <td>{val.address}</td>                                            
                                            <td>
                                                <span onClick={this.editCustomer.bind(this,val)} className='btn btn-sm btn-info text-white me-1'>
                                                    Edit
                                                </span>
                                                <span className='btn btn-sm btn-danger'>
                                                    Delete
                                                </span>
                                            </td>
                                        </tr>    
                                    ))
                                }
                                                    
                            </tbody>
                        </table>
                        </div>    
                    </div> 
                        </div>
                    </div>
                    <div className='col-md-4'>
                        {
                            this.state.isEditComponent 
                            ? <EditCustomer name={this.state.name} mobile={this.state.mobile} email={this.state.email} address={this.state.address} customerId={this.state.customerId} changeEditComponent={this.changeEditComponent}/> 
                            : 
                            <CreateCustomer setCreatedCustomer={this.setCreatedCustomer}/>
                        }                        
                    </div>
                </div>
            </div>
        : 
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        )
    }
}