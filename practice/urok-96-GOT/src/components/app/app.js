import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component {

    state = {
        randomCharActive: true
    }

    toggleRandomChar = () => {
        console.log('toggleRandomChar');
        this.setState({
            randomCharActive: !this.state.randomCharActive
        });
    };

    render() {
        const randomChar = this.state.randomCharActive ? <RandomChar/> : '';
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 0}}>
                        {randomChar}
                            <Button color="primary" onClick={this.toggleRandomChar}>Toggle radom char</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );

    };
};