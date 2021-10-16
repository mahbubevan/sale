import React from "react";
import { Link } from "react-router-dom";
import { url as u } from "../../helper";

export default class InvoiceList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,
            invoiceList:[],
        }
    }


    async componentDidMount(){
        const url = `${u}invoice`
        const data = await fetch(url).then(res=>res.json())
        console.log(data);
        this.setState({
            invoiceList:data.data,
            isLoaded:true
        })
    }


    render(){
        return (
            this.state.isLoaded ? 
            <div className="card">
                <div className='card-header bg-success text-white'>
                    <h4 className='card-title'> Invoice List </h4>
                </div>
                <div className='card-body'>
                    <div className="table-responsive">
                        <table className="table table-success table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Transaction</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.invoiceList.map((val,id)=>(
                                    <tr key={id++}>
                                        <th scope="row">{++id}</th>
                                        <td>{val.customer.name}</td>
                                        <td>{val.amount} (BDT)</td>
                                        <td>{val.payment_type}</td>
                                        <td>{val.trx}</td>
                                        <td>
                                            <Link to={
                                                {
                                                    pathname:`invoice/download/${val.id}`,
                                                    query: {
                                                        id: val.id,
                                                    }
                                                }
                                            } className='btn btn-sm btn-dark'>Download</Link>
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