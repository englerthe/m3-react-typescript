import React from 'react';
import { IProductData } from '../App';

//this file defines the React component that renders a single asset to the browser window
//it also contains the logic to change asset properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
    onDelete: Function;
    edit: boolean;
    product: IProductData;
}


interface IState {
    delete_function: any;
    edit_mode: boolean;
    product: IProductData;
}

export default class SimpleProduct extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        //one new thing is, that the state will be initialized by properties that are set when the component is created in the container element:
        //look for "<SimpleAsset key={newAsset._id} onDelete={this.handleDeleteAsset} edit={true} asset={newAsset} />" in App.js
        this.state = {
            delete_function: props.onDelete,
            edit_mode: props.edit,
            product: props.product,
        }
    }

    render() {

        //if the component is in edit mode, it will render different than if it just shows the data

        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.state.product.product_name} onChange={this.handleNameChange} /></td>
                    <td><input type="number" name="value" value={this.state.product.product_value} onChange={this.handleValueChange} /> €</td>
                    <td><input type="number" name="amount" value={this.state.product.product_amount} onChange={this.handleAmountChange} />pcs.</td>
                    <td>{this.state.product.product_totalPrice} €</td>
                    <td><button onClick={this.handleSave} id={this.state.product._id}>save</button></td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.state.product.product_name}</td>
                    <td>{this.state.product.product_value} €</td>
                    <td>{this.state.product.product_amount} pcs.</td>
                    <td>{this.state.product.product_totalPrice} €</td>
                    <td>
                        <button onClick={this.handleEdit}>edit</button>
                        <button onClick={this.state.delete_function} id={this.state.product._id}>sell or dispose</button>
                    </td>
                </tr>
            )
    }

    handleEdit() {
        this.setState({ edit_mode: true });
    }
    handleNameChange(event: any) {
        const inputElement = event.target as HTMLInputElement;
        this.setState({
            product: {
                _id: this.state.product._id,
                product_name: inputElement.value,
                product_value: this.state.product.product_value,
                product_amount: this.state.product.product_amount,
                product_totalPrice: this.state.product.product_totalPrice,
            }
        });
    }
    handleValueChange(event: any) {
        const inputElement = event.target as HTMLInputElement;
        this.setState({
            product: {
                _id: this.state.product._id,
                product_name: this.state.product.product_name,
                product_value: parseFloat(inputElement.value),
                product_amount: this.state.product.product_amount,
                product_totalPrice: (this.state.product.product_amount * parseFloat(inputElement.value)),
            }
        });
    }
    handleAmountChange(event: any) {
        const inputElement = event.target as HTMLInputElement;
        this.setState({
            product: {
                _id: this.state.product._id,
                product_name: this.state.product.product_name,
                product_value: this.state.product.product_value,
                product_amount: parseFloat(inputElement.value),
                product_totalPrice: (this.state.product.product_value * parseFloat(inputElement.value)),
            }
        });
    }

    handleSave(event: any) {
        this.setState({ edit_mode: false });
    }

}