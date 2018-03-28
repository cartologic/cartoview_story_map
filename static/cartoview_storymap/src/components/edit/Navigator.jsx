import React, { Component } from 'react';
export default class Navigator extends Component {
	state = {}
	onClick(e, index) {

			this.props.onStepSelected(index)
		
	}
	item(label, index) {
		const { step, onStepSelected } = this.props;
		const className = index == step ? "list-group-item active" : "list-group-item" 
		
		return (
			<li key={index} className={className} onClick={(e) =>this.onClick(e, index)}>

				{label}
			</li>
		)
	}
	render() {
		const { steps } = this.props;
		return (
			<div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 list-group">
				<ul className={"list-group"} style={{"cursor":"pointer"}}>
					{steps.map((s, index) => this.item(s.label, index))}
				</ul>
			</div>
		)
	}
}
