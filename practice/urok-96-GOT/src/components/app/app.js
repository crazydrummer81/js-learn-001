import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemDetails from '../itemDetails';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import GOTService from '../../services/gotService';
import BookPage from '../bookPage';

export default class App extends Component {
    gotService = new GOTService();

    state = {
        randomCharActive: true,
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        console.log('App -> componentDidCatch()');
        this.setState({error: true})
    }

    toggleRandomChar = () => {
        console.log('toggleRandomChar');
        this.setState({
            randomCharActive: !this.state.randomCharActive
        });
    };

    render() {
        const randomChar = this.state.randomCharActive ? <RandomChar/> : '';

        if (this.state.error) {
            return <ErrorMessage/>
        }

        console.log(this);

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 0}}>
                        {randomChar}
                            <Button color="primary" onClick={this.toggleRandomChar}>Toggle random char</Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BookPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => `${item.name}`}/>
                        </Col>
                        <Col md='6'>
                            <ItemDetails itemId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );

    };
};