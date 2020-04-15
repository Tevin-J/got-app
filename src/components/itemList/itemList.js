import React, {Component} from 'react';
import styled from "styled-components";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ItemListBlock = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    };
    margin-top: 30px
`
class ItemList extends Component {
    state = {
        itemList: null,
        isError: false
    }
    componentDidMount() {
        const {getData} = this.props
        getData()
            .then(itemList => {
                this.setState({itemList})
            })
    }
    componentDidCatch(error, errorInfo) {
        this.setState({isError: true})
    }
    /*в этой ф-и отрисовываем всех персонажей которые придут в стейт после запроса
    на сервер в componentDidMount и при клике на персонажа вызываем ф-ю из пропсов с его id*/
    renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item
            const label = this.props.renderItem(item)
            return (
                <li key={id} className="list-group-item" onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state
        if (!itemList) {
            return <Spinner/>
        }
        if (this.state.isError) {
            return <ErrorMessage/>
        }
        const items = this.renderItems(itemList)
        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    }
}
export default ItemList