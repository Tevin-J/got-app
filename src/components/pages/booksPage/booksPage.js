import React from 'react'
import gotAPI from "../../../api/api";
import ItemList from "../../itemList/itemList";
import ErrorMessage from "../../errorMessage/errorMessage";
import RowBlock from "../../rowBlock/rowBlock";
import ItemDetails, {Field} from "../../itemDetails/itemDetails";

class BooksPage extends React.Component {
    gotAPI = new gotAPI()
    state = {
        selectedBook: null,
        error: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }
    onBookSelected = (id) => {
        this.setState({selectedBook: id})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const booksList = (
            <ItemList getData={this.gotAPI.getAllBooks}
                      onItemSelected={this.onBookSelected} renderItem={(book) => book.name}/>
        )
        const bookDetails = (
            <ItemDetails itemId={this.state.selectedBook} getData={this.gotAPI.getBook}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={booksList} right={bookDetails}/>
        )
    }
}
export default BooksPage