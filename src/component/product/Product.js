import React from "react";
import CreateProduct from './CreateProduct'
import { url as u } from "../../helper";

export default class Product extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,
            productList:[],
            links:[]
        }

        this.setCreatedProduct = this.setCreatedProduct.bind(this)
    }


    async componentDidMount(){
        const url = `${u}product`
        const data = await fetch(url).then(res=>res.json())
        console.log(data);
        this.setState({
            productList:data.data,
            links:data.links,
            isLoaded:true
        })
    }

    setCreatedProduct(data)
    {
        this.setState({
            productList:[...this.state.productList,data]
        })
    }

    async paginationHandle(val)
    {
        let url = val.url
        const data = await fetch(url).then(res=>res.json())
        this.setState({
            productList:data.data,
            links:data.links,
            isLoaded:true
        })
        
    }


    render(){
        return (
            this.state.isLoaded ? 
            <div className='container'>
                <div className='row mt-5 mb-5'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='card-title'> Product List </h4>
                            </div>
                            <div className='card-body'>
                                <div className="table-responsive">
                                    <table className="table table-success table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Supplier Name</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">In Stock</th>
                                            <th scope="col">On Order</th>
                                            <th scope="col">Min Price (BDT)</th>
                                            <th scope="col">ASK Price (BDT)</th>
                                            <th scope="col">Buying Price (BDT)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    {
                                        this.state.productList.map((val,id)=>(
                                            <tr key={id++}>
                                                <th scope="row">{++id}</th>
                                                <td>{val.supplier.name}</td>
                                                <td>{val.name}</td>
                                                <td>{val.unitsInStock}</td>
                                                <td>{val.unitsOnOrder}</td>
                                                <td>{val.min_price}</td>
                                                <td>{val.ask_price}</td>
                                                <td>{val.buying_price}</td>
                                            </tr>    
                                        ))
                                    }
                                                        
                                </tbody>
                            </table>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                    {
                                        this.state.links.map((val,id)=>(
                                            <li key={id} className={val.url === null ? 'page-item disabled' : 'page-item' }>
                                                <a className="page-link" onClick={this.paginationHandle.bind(this,val)}>
                                                    {
                                                        (() => {
                                                            if (val.label.search(';') !== -1){
                                                                if (id===0) {
                                                                    return 'Previous'
                                                                }
                                                               else{
                                                                   return 'Next'
                                                               }
                                                            }
                                                            else{
                                                                return val.label
                                                            } 
                                                        })()                                
                                                    }
                                                </a>
                                            </li>                                        
                                        ))
                                    }                                                                                    
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <CreateProduct setCreatedProduct={this.setCreatedProduct}/>
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