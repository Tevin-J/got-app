import React from 'react'
import gotAPI from "../../../api/api";
import ItemDetails, {Field} from "../../itemDetails/itemDetails";

/*компонента с информацией о конкретной книге*/
class BooksItem extends React.Component {
    gotAPI = new gotAPI()
    render() {
        return (
            /*получили id из объекта match роутера где отрисовывается BooksItem.
            эта id пойдет в компоненту itemDetails*/
            <ItemDetails itemId={this.props.bookId} getData={this.gotAPI.getBook}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}
export default BooksItem