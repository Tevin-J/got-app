import React from 'react'
import {Col, Row} from "reactstrap";
import ItemList from "../itemList/itemList";
import CharDetails from "../charDetails/charDetails";
import ErrorMessage from "../errorMessage/errorMessage";

class CharacterPage extends React.Component {
    state = {
        selectedChar: null,
        error: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }
    /*обработка клика по конкретному персонажу, чтоб в itemList затем
    показывался этот персонаж*/
    onCharSelected = (id) => {
        this.setState({selectedChar: id})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row>
        )
    }
}
export default CharacterPage