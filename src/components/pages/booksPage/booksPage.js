import React from 'react'
import gotAPI from "../../../api/api";
import ItemList from "../../itemList/itemList";
import ErrorMessage from "../../errorMessage/errorMessage";
import {withRouter} from "react-router-dom";

/*используем НОС withRouter, чтоб из historyAPI получить id той книги, на которую нажали,
этот id передается из роута компоненты App в компоненту BooksItem*/
class BooksPage extends React.Component {
    gotAPI = new gotAPI()
    state = {
        error: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <ItemList getData={this.gotAPI.getAllBooks}
                      onItemSelected={(itemId) => {this.props.history.push(itemId)}}
                      renderItem={(book) => book.name}/>
        )
    }
}
export default withRouter(BooksPage)