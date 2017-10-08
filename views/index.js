import ReactDOM from 'react-dom';
import React, {Component} from 'react';
// import ReactBootstrap, { Panel, Tooltip, Navbar, Button, Grid, Row, Col } from 'react-bootstrap';

import App from './components/App'

ReactDOM.render(
<App dataURL='https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json' />
	,document.getElementById('root')
);