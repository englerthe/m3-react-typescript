import React from 'react';
import SimpleProduct from './components/SimpleProduct'
import mongoose from 'mongoose';

interface IProps { }

export interface IProductData {
  _id: string;
  product_name: string; //description
  product_value: number; // value
  product_amount: number; // amount
  product_totalPrice: number; // total price
}

interface IState {
  products: IProductData[];
}

export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);

    const exampleProduct = {
      _id: mongoose.Types.ObjectId().toString(),
      product_name: "This is an example, press Edit to change name and Value",
      product_value: 0,
      product_amount: 0,
      product_totalPrice: 0
    }

    this.state = {
      products: [exampleProduct]
    }
  }
  render() {
    return (
      <div>
        <h1>simple product management application</h1>
        <p>to create a new product click this button:&nbsp;
          <button onClick={this.handleCreateProduct}>create product</button>
        </p>
        <table>
          <tbody>
            <tr><th>description</th><th>value</th><th>amount</th><th>total price</th><th>action</th></tr>
            {this.state.products.map(product=> 
            <SimpleProduct key={product._id} onDelete={this.handleDeleteProduct} product={product} edit={false} />)}
          </tbody>
        </table>
      </div>
    );
  }
  handleCreateProduct() {
    const newProduct: IProductData = {
      _id: mongoose.Types.ObjectId().toString(),
      product_name: "new Product",
      product_value:0,
      product_amount:0,
      product_totalPrice:0
    }
    let newProducts = this.state.products.slice();
    newProducts.push(newProduct);
    this.setState(
      {
        products: newProducts
      }
    );
    console.log(newProduct);
  }
  handleDeleteProduct(event: any) {
    const button = event.target as HTMLButtonElement
    const IdOfProductToDelete = button.id;
    console.log("Delete product with _id:" + IdOfProductToDelete);

    let newProducts = this.state.products.filter(product => {
      console.log("product._id:" + product._id + " IdOfProductToDelete:" + IdOfProductToDelete + " " + (product._id !== IdOfProductToDelete));
      return product._id !== IdOfProductToDelete;
    })
    this.setState(
      {
        products: newProducts
      }
    );
  }
  

}
