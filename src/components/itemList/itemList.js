import React, {Component} from 'react';
import styled from "styled-components";

const ItemListBlock = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    }
`
class ItemList extends Component {

    render() {
        return (
            <ItemListBlock className="list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ItemListBlock>
        );
    }
}
export default ItemList