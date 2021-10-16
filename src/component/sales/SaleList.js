import React from "react";
import { url as u } from "../../helper";

export default class SaleList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,
            saleList:[],
        }
    }


    async componentDidMount(){
        const url = `${u}order`
        const data = await fetch(url).then(res=>res.json())
        
        this.setState({
            saleList:data.data,
            isLoaded:true
        })
    }


    render(){
        return (
            this.state.isLoaded ? 
            <div className='card'>
                <div className='card-header'>
                    <h4 className='card-title'> Order Lists </h4>
                </div>
                <div className='card-body'>
                <div className="table-responsive">
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.saleList.map((val,id)=>(
                                <tr key={id++}>
                                    <th scope="row">{++id}</th>
                                    <td>{val.customer.name}</td>
                                    <td>{val.product.name}</td>
                                    <td>{val.quantity}</td>
                                    <td>{val.unit_price}</td>                                    
                                    <td>
                                        <span className='btn btn-sm btn-info text-white'> Edit </span>
                                        <span className='btn btn-sm btn-danger'> Delete </span>
                                    </td>
                                </tr>    
                            ))
                        }
                                            
                    </tbody>
                </table>
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