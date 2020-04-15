import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import ButtonToggle from "reactstrap/es/Button";
import CharacterPage from "../characterPage/characterPage";
import ItemList from "../itemList/itemList";
import CharDetails from "../charDetails/charDetails";
import gotAPI from "../../api/api";


class App extends Component {
    gotAPI = new gotAPI()
    state = {
        error: false,
        showRandomChar: true,
        selectedChar: null
    }
    /*этот метод жизненного цикла предназначен перехватывать ошибки и их обрабатывать.
    лучше использовать его в разных компонентах, чтоб при ошибке в каком-то блоке
    падало не все приложение а только блок*/
    componentDidCatch(error, errorInfo) {
        alert(error)
        this.setState({error: true})
    }
    /*показ блока с рандомным героем при клике на кнопку*/
    toggleRandomChar = () => {
        this.setState({
            showRandomChar: !this.state.showRandomChar
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null
        return (
            <>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <ButtonToggle color='primary' onClick={this.toggleRandomChar}>
                                Toggle random character
                            </ButtonToggle>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotAPI.getAllBooks}
                                      renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotAPI.getAllHouses}
                                      renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;