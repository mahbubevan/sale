import React from "react";
import { url as u } from "../../helper";

export default class CreateInvoice extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orderList:[],
            isLoaded:false,
            amount:0,
            payment_type:'',
            trx:'',
            orderIds:[],
            flag:this.props.flag
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.selectOrderId = this.selectOrderId.bind(this)
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
            orderIds:this.state.orderIds,        
            payment_type:this.state.payment_type,
            trx:this.state.trx,
            amount:this.state.amount,
        }
    
        const url = `${u}invoice`
        const data = await fetch(url,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json()).catch(err=>console.log(err))

        window.location.reload()
        
      }



      async componentDidMount()
      {
        const url = `${u}order`
        const data = await fetch(url).then(res=>res.json())
        this.setState({
            orderList:data.data,
            isLoaded:true
        })
      }

      async selectOrderId(event) {
        let value = Array.from(
            event.target.selectedOptions,
            (option) => option.value
          );

          let totalAmount = 0;

          for (let index = 0; index < value.length; index++) {
              const element = value[index];
              let url = `${u}order/${element}`
              let orderById = await fetch(url).then(res=>res.json())
              totalAmount += parseFloat(orderById.unit_price)
          }

          this.setState({
            orderIds: value,
            amount:totalAmount
          });
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3> Create Invoice </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label"> Select Orders </label>
                                <select onChange={this.selectOrderId} className="form-control" name="orderIds[]" multiple={true}>
                                    {
                                        this.state.orderList.map((val,id)=>(
                                            
                                            <option key={id} value={val.id}> Customer :{val.customer.name} -- Product:{val.product.name} -- Quantity: {val.quantity} -- Unit Price: {val.unit_price} </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input onChange={this.inputChange} value={this.state.amount} type="text" name="amount" className="form-control" id="amount" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="payment_type" className="form-label">Payment Type</label>
                                <input onChange={this.inputChange} type="text" name="payment_type" className="form-control" id="payment_type" />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="trx" className="form-label">Transaction Number</label>
                                <input onChange={this.inputChange} type="text" name="trx" className="form-control" id="trx" />
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