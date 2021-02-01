import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './rowBlock.css';

const RowBlock = ({left, right}) => {
    return(
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
    )
}

export default RowBlock;