import Customer from "./component/customer/Customer";
import Product from "./component/product/Product";
import Sale from "./component/sales/Sale";
import SupplierList from "./component/supplier/SupplierList";
import Navbar from "./component/navbar/Navbar";
import {BrowserRouter as Router,Route ,Switch} from 'react-router-dom'

import React from "react";
import InvoiceDownload from "./component/invoice/InvoiceDownload";

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      isCreateProduct:true,
      flag:true
    }

    this.inputChange = this.inputChange.bind(this)
  }

  inputChange(e){
    this.setState({
      isCreateProduct:!this.state.isCreateProduct
    })
  }

  render(){
    return (
      <>
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/customer" component={Customer} />
              <Route exact path="/product" component={Product} />
              <Route exact path="/sale" component={Sale} />
              <Route exact path="/supplier" component={SupplierList} />
              <Route exact path="/invoice/download/:id" component={InvoiceDownload} />
            </Switch>
        </Router>
      </>
    );
  }
}

export default App;
