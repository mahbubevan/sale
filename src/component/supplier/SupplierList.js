import React from "react";
import CreateSupplier from './CreateSupplier'
import { url as u } from "../../helper";

export default class SupplierList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,
            supplierList:[],
        }

        this.setCreateSupplier = this.setCreateSupplier.bind(this)
    }

    async componentDidMount(){
        const url = `${u}supplier`
        const data = await fetch(url).then(res=>res.json())
        
        this.setState({
            supplierList:data.data,
            isLoaded:true
        })
    }

    setCreateSupplier(data)
    {
        this.setState({
            supplierList:[...this.state.supplierList,data]
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
                    <h4 className='card-title'> Supplier Lists </h4>
                </div>
                <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-success table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Propriter Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.supplierList.map((val,id)=>(
                                <tr key={id++}>
                                    <th scope="row">{++id}</th>
                                    <td>{val.name}</td>
                                    <td>{val.prop_name}</td>
                                    <td>{val.phone}</td>
                                    <td>{val.address}</td>
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
                        <CreateSupplier setCreateSupplier={this.setCreateSupplier}/>
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