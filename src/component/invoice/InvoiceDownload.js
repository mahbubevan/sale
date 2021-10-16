import React from "react";
import './Invoice.css'
import { url as u } from "../../helper";

export default class InvoiceDownload extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            invoice:[],
            isLoaded:false,
            invoiceId:this.props.match.params.id
        }

    }

    async componentDidMount()
    {
        const id = this.state.invoiceId
        const url = `${u}invoice/${id}`
        const data = await fetch(url).then(res=>res.json())
        
        this.setState({
            invoice:data,
            isLoaded:true
        })
    }

    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-6'>
                        {
                        this.state.isLoaded 
                        ? 
                        <div>
                        <div className="card">
                            <div className='card-header'>
                                <h5 className="card-title">Invoice No:- {this.state.invoice.id}</h5>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-4 customer'>
                                        <h6>Customer Information</h6>
                                        <hr/>
                                        <p> Name:  {this.state.invoice.customer.name}</p>
                                        <p> Address:  {this.state.invoice.customer.address}</p>
                                        <p> Mobile:  {this.state.invoice.customer.mobile}</p>
                                        <p> Email:  {this.state.invoice.customer.email ?? 'N/A'}</p>
                                    </div>
                                    <div className='col-md-4 company'>
                                        <h6>Seller Information</h6>
                                        <hr/>
                                        <p> Name:  Rainbow Fashion</p>
                                        <p> Address:  746/C, Banarupa Road, Chandana, Chowrasta, Gazipur</p>
                                        <p> Mobile:  01976169922</p>
                                        <p> Email:  mahbub.evan00@gmail.com</p>
                                    </div>
                                    <div className='col-md-4 paymentInfo'>
                                        <h6>Payment Information</h6>
                                        <hr/>
                                        <p> Transaction Number: #{this.state.invoice.trx} </p>
                                        <p> Status: {this.state.invoice.status == 1 ? <span className='text-success'>PAID</span> : <span className='text-danger'>NOT PAID</span> } </p>
                                        <p> Payment Type:  {
                                            this.state.invoice.payment_type === 'cash' 
                                            ? 'CASH' 
                                            : 
                                            'Digital Payment'} </p>
                                        <p> Amount: {this.state.invoice.amount} (BDT) </p>
                                    </div>
                                </div>                                
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5>Order Information</h5>
                                        <hr/> 
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product Name</th>
                                                        <th scope="col">Product Description</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (BDT)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.invoice.orders.map((val,id)=>(
                                                            <tr key={id}>
                                                                <td> {++id} </td>
                                                                <td> {val.product.name} </td>
                                                                <td> {val.product.description} </td>
                                                                <td> {val.quantity} </td>
                                                                <td> {val.unit_price} </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='text-center'>
                                    <code>Sold Product Can Be Returned At Any Time If Product Is Not Damaged</code>
                                </div>
                            </div>
                        </div>
                            <div className='row justify-content-center text-center mt-3 mb-3'>
                                <button onClick={()=>{

                                    window.print()
                                }} className='w-50 btn btn-sm btn-primary'> PRINT </button>
                            </div>                         
                        </div>                        
                        : 
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>   
                    }
                    </div>
                </div>
            </div>
        )
    }
}