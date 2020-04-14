import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import ButtonToggle from "reactstrap/es/Button";
import CharacterPage from "../characterPage/characterPage";


class App extends Component {
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
                            <ButtonToggle color='primary' onClick={this.toggleRandomChar}>Toggle random character</ButtonToggle>
                        </Col>
                    </Row>
                   <CharacterPage/>
                </Container>
            </>
        );
    }
}

export default App;