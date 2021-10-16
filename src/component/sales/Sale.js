import React from "react";
import Invoice from './../invoice/InvoiceList'
import CreateInvoice from './../invoice/CreateInvoice'
import { url as u } from "../../helper";

export default class Sale extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customerList:[],
            productList:[],
            quantity:0,
            unit_price:0,
            customer_id:'',
            product_id:'',
            flag:false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }

    inputChange(e){
        console.log(e.target.value,e.target.name);
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
            customer_id:this.state.customer_id,
            product_id:this.state.product_id,
            quantity:this.state.quantity,
            unit_price:this.state.unit_price,
        }
    
        const url = `${u}order`
        const data = await fetch(url,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json())
        this.setState({
            flag:!this.state.flag
        })
        window.location.reload()

      }

      async componentDidMount(){
        let url = `${u}customer`
        const customer = await fetch(url).then(res=>res.json())
        
        this.setState({
            customerList:customer.data,
            isLoaded:true
        })

        url = `${u}product`
        const product = await fetch(url).then(res=>res.json())
        
        this.setState({
            productList:product.data,
            isLoaded:true
        })
      }

    render(){
        return(
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-header">
                                <h3> Create Order </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="customer_id" className="form-label">Select Customer</label>
                                            <select onChange={this.inputChange} className="form-control" name="customer_id">
                                                <option>Select One</option>
                                                {
                                                    this.state.customerList.map((val,id)=>(
                                                        <option key={id} value={val.id}> {val.name} </option>
                                                    ))
                                                }
                                            </select>                         
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="product_id" className="form-label">Select Product</label>
                                            <select onChange={this.inputChange} className="form-control" name="product_id">
                                                <option>Select One</option>
                                                {
                                                    this.state.productList.map((val,id)=>(
                                                        <option key={id} value={val.id}> {val.code} {val.name} - available : {val.unitsInStock} - min price : {val.min_price} - ask price : {val.ask_price} - buy price: {val.buying_price} </option>
                                                    ))
                                                }
                                            </select>  
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input onChange={this.inputChange} type="text" name="quantity" className="form-control" id="quantity" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="unit_price" className="form-label">Unit Price</label>
                                            <input onChange={this.inputChange} type="text" name="unit_price" className="form-control" id="unit_price" />
                                        </div>                            
                                    </div>                        
                                    <div className="row mt-3">
                                <div className="col-md-6 h5">
                                    Total Price : {this.state.quantity * this.state.unit_price} (BDT)
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-success w-100">Create</button>
                                </div>
                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-7'>
                        <CreateInvoice flag={this.state.flag}/>
                    </div>
                    <div className='col-md-5'>
                        <Invoice />
                    </div>
                </div>
            </div>
        )
    }
}