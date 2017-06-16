import React, {Component} from 'react';
export default class SliderDots extends Component{
    render(){
        if(this.props.dots){
            return (
                <div className="dots">
                    {
                        this.props.images.map((image,index)=>(
                                <span key={index} onClick={()=>this.props.turn(index-this.props.pos)} className={"dot "+(index === this.props.pos?'active':'')}></span>
                            )
                        )
                    }
                </div>
            )
        }
    }
}
