import React from 'react';
import styled from "styled-components";
import withData from "./withData";

const ItemListBlock = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    };
    margin-top: 30px
`
/*Компоненту ItemList сделали независимой, то что она отрисует зависит от пропсов
которые в нее придут*/
const ItemList = ({renderItem, onItemSelected, data}) => {
    /*в этой ф-и отрисовываем все айтемы которые придут в стейт после запроса
    на сервер в componentDidMount и при клике на айтем вызываем ф-ю из пропсов с его id*/
    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item
            /*вызываем из пропсов ф-ю renderItem и передаем в нее поочередно каждый айтем и
            получаем те данные которые мы из родителя в результат этой ф-и вернем. таким образом
            мы снаружи управляем тем, что вернет нам эта ф-я*/
            const label = renderItem(item)
            return (
                <li key={id} className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    /*если у нас есть в стейте массив айтемов, то получаем его с помощью вызова ф-и
    которая отрисует их*/
    const items = renderItems(data)
    return (
        <ItemListBlock className="list-group">
            {items}
        </ItemListBlock>
    );
}
/*оборачиваем ItemList хоком withData, который делает запрос на сервер за данными и
отвечает за отрисовку спиннеров и тп*/
export default withData(ItemList)