import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import axios from 'axios';
import lodash from 'lodash';
import ReactBootstrap, { Panel, Tooltip } from 'react-bootstrap';

import '../styles/app.scss';
		
class App extends React.Component {
	constructor() {
		super();
		this.state = {
		top: 0,
		width: 0,
		height: 900,
		showSVG: false,		
		cache: null,
		tooltipDisplay: false,
		tooltipHTML: '',
		tooltipX: 0,
		tooltipY: 0
		};
	}
	componentDidMount() {	
window.addEventListener('resize', this.componentDidMount.bind(this));		
		this.setState({
			width: d3.select("#chart").property('clientWidth'),
			showSVG: true,
      		top: d3.select('#chart').property('offsetTop')
		});
	}	
	componentDidUpdate(prevProps, prevState) {
		if(this.state.showChart === false	||
			 this.state.width === prevState.width) return; 
		d3.select('#chart svg').remove();
		d3.select('#chart').append('svg')
			.attr('width', this.state.width)
			.attr('height', this.state.height)

		 if(this.state.cache === null) {
		 	d3.json(this.props.dataURL, data => {
		 		 // console.log(data)
	// data.map()		 		 
		 		this.setState({ cache: data });
		 		this.buildSVG( data );
		 	});
		 } else {
		 	this.buildSVG( this.state.cache );
		 }
	}// end-componentDidUpdate	
	buildSVG(data) {
		let svg = d3.select('#chart svg');
		let flg = d3.select('#flags');
		let force = d3.forceSimulation()
			.force('link', d3.forceLink().distance(20))
			.force('charge', d3.forceManyBody().strength(-80))
			.force('center', d3.forceCenter(this.state.width / 2, this.state.height / 2))
			.force('x', d3.forceX(this.state.width).strength(0.06))
			.force('y', d3.forceY(this.state.height).strength(0.1))
		force
			.nodes(data.nodes).force('link')
			.links(data.links);

    let objLinks = svg.selectAll('line').data(data.links).enter();
    let objNodes = flg.selectAll('span').data(data.nodes).enter();
    let lines = objLinks.append('line').attr('stroke', '#b2dbfb').attr('stroke-width', 1);
    let flags = objNodes.append('span');
    force.on('tick', ()=>{
       lines
        .attr('x1', d=>d.source.x)
        .attr('y1', d=>d.source.y)
        .attr('x2', d=>d.target.x)
        .attr('y2', d=>d.target.y);        
    });	    
	}		
	render() {
		return(			
			<Panel header={<h1>FreeCodeCamp ForceDirectedDiagram</h1>}>			
				<Tooltip id='tooltip' placement='left' className='in'
					style={{
						display	: this.state.tooltipShow ? 'block' : 'none',
						position: 'fixed',
						left: this.state.tooltipX,
						top	: this.state.tooltipY,
						width: 190
					}}
				>{this.state.tooltipHTML}</Tooltip>			
				<div id="chart" className='panel panel-default' />			
			</Panel>
		);
	}
}

export default App;
