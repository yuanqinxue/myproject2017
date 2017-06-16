import React, {Component} from 'react';
export default class SliderArrows extends Component{
    render(){
        if (this.props.arrows){
            return (
                <div className="arrows">
                    <span onClick={()=>this.props.turn(-1)} className="arrow arrow-left">&lt;</span>
                    <span onClick={()=>this.props.turn(1)} className="arrow arrow-right">&gt;</span>
                </div>
            )
        }
    }
}
