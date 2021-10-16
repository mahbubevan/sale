import React from "react";
import { url as u } from "../../helper";

export default class CreateProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            supplier_id:'',
            code:'',
            name:'',
            description:'',
            unitsInStock:0,
            min_price:0,
            ask_price:0,
            buying_price:0,
            supplierList:[]
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
            supplier_id:this.state.supplier_id,
            code:this.state.code,
            name:this.state.name,
            description:this.state.description,
            unitsInStock:this.state.unitsInStock,
            min_price:this.state.min_price,
            ask_price:this.state.ask_price,
            buying_price:this.state.buying_price
        }
    
        const url = `${u}product`
        const data = await fetch(url,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
        }).then(result => result.json())

        this.props.setCreatedProduct(data.data)
        
      }

      async componentDidMount(){
        const url = `${u}supplier`
        const data = await fetch(url).then(res=>res.json())
        
        this.setState({
            supplierList:data.data,
            isLoaded:true
        })
      }


    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3> Create Product </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                        <div className="col-md-6">
                                <label htmlFor="supplier" className="form-label">Select Supplier</label>
                                <select onChange={this.inputChange} className="form-control" name="supplier_id">
                                    <option> Select Supplier </option>
                                    {
                                        this.state.supplierList.map((val,id)=>(
                                            <option key={id} value={val.id}> {val.name} </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="code" className="form-label">Product Code</label>
                                <input onChange={this.inputChange} type="text" name="code" className="form-control" id="code" />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>                            
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input onChange={this.inputChange} type="text" name="name" className="form-control" id="name" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input onChange={this.inputChange} type="text" name="description" className="form-control" id="description" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="unitsInStock" className="form-label">Stock</label>
                                <input onChange={this.inputChange} type="text" name="unitsInStock" className="form-control" id="unitsInStock" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="min_price" className="form-label">Min Price</label>
                                <input onChange={this.inputChange} type="text" name="min_price" className="form-control" id="min_price" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="ask_price" className="form-label">Asking Price</label>
                                <input onChange={this.inputChange} type="text" name="ask_price" className="form-control" id="ask_price" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="buying_price" className="form-label">Buying Price</label>
                                <input onChange={this.inputChange} type="text" name="buying_price" className="form-control" id="buying_price" />
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