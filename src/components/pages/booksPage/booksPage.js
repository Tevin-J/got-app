import React from 'react'
import gotAPI from "../../../api/api";
import ItemList from "../../itemList/itemList";
import ErrorMessage from "../../errorMessage/errorMessage";
import {withRouter} from "react-router-dom";

/*используем НОС withRouter, чтоб из historyAPI получить id той книги, на которую нажали,
этот id передается из роута компоненты App в компоненту BooksItem*/
const BooksPage = (props) => {
    try {
        return (
            <ItemList getData={new gotAPI().getAllBooks}
                      onItemSelected={(itemId) => {
                          props.history.push(itemId)
                      }}
                      renderItem={(book) => book.name}/>
        )
    } catch (e) {
        return <ErrorMessage/>
    }

}
export default withRouter(BooksPage)