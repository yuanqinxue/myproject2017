import React, {Component} from 'react';
export default class SliderItems extends Component{
    render(){
        return (
            <ul style={this.props.style} className="sliders">
                {
                    this.props.images.map((image, index) => (
                        <li className="slider" key={index}>
                            <img src={image.src} alt=""/>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
