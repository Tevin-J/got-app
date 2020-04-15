import React from 'react'
import gotAPI from "../../../api/api";
import ErrorMessage from "../../errorMessage/errorMessage";
import ItemList from "../../itemList/itemList";
import RowBlock from "../../rowBlock/rowBlock";
import ItemDetails, {Field} from "../../itemDetails/itemDetails";

class HousesPage extends React.Component {
    gotAPI = new gotAPI()
    state = {
        error: false,
        selectedHouse: null
    }
    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }
    onHouseSelected = (id) => {
        this.setState({selectedHouse: id})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const housesList = (
            <ItemList getData={this.gotAPI.getAllHouses} onItemSelected={this.onHouseSelected}
                      renderItem={(house) => house.name}/>
        )
        const bookDetails = (
            <ItemDetails getData={this.gotAPI.getHouse} itemId={this.state.selectedHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral weapons'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={housesList} right={bookDetails}/>
        )
    }
}
export default HousesPage