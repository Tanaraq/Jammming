import React from 'react';
import './Track.css';

export class Track extends React.Component{
    renderAction(){
        let action;
        if(this.props.isRemoval){
            action = '-';
        } else {
            action = '+';
        }
    }
    
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>track name will go here</h3>
                    <p>track artist will go here | track album will go here</p>
                </div>
                <button className="Track-action">{this.renderAction}</button>
            </div>
        )
    }
}