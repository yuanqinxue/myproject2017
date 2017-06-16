## React-slider 项目

### 初始化项目
```
npm init -y
```

### 安装依赖包
1.开发依赖
```
npm install webpack webpack-dev-server babel-core babel-loader babel-preset-react babel-preset-es2015 babel-preset-stage-0 style-loader css-loader less-loader less file-loader url-loader html-webpack-plugin -D
```
2.生产依赖(代码依赖)
```
npm install react react-dom -S
```
3.依赖包说明
- webpack 是打包的
- webpack-dev-server 用来启动一个HTTP服务器预览我们的项目
- babel-core babel-loader 进行转译，把es6 和react代码转译成es5
- babel-preset-es2015 用来转译es6
- babel-preset-stage-0 用来转译es7
- babel-preset-react 用来转译react
- style-loader css-loader 用来处理css
- less-loader less 编译less
- file-loader url-loader 用来处理资源文件
- html-webpack-plugin 用来自动产出html文件
- open-browser-webpack-plugin 自动打开浏览器

### 编辑配置 package.json 文件
```
// 修改文件中 script 属性中的内容
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
```

### 编辑配置 webpack.config.js 文件
```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',// 入口文件
    output: { // 输出配置
        path: path.resolve('build'),// 输出目录
        filename: 'bundle.js'//输出的文件名
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
};
```

### index.html 入口html页面
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Slider</title>
</head>
<body>
<!-- 创建一个根元素 -->
<div id="root">

</div>
</body>
</html>
```

### index.js 入口js文件
```
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/Slider';//导入Slider组件

let images = [//导入图片
    {src: require('./images/1.jpg')},
    {src: require('./images/2.jpg')},
    {src: require('./images/3.jpg')},
    {src: require('./images/4.jpg')}
];

ReactDOM.render((
    <Slider
        images={images} //图片
        interval={2}    //轮播的间隔
        speed={1}       //轮播切换的时间
        autoplay={true} //是否启用自动轮播
        pause={true}    //当鼠标移动上去是否自动暂停
        dots={true}     //是否有点状导航
        arrows={true}   //是否有箭头导航
    />
), document.querySelector('#root'));
```

### Slider.js 组件
1.导入依赖的模块、组件
```
import React from 'react';
import ReactDOM from 'react-dom';
require('./slider.less');// 导入 less 样式文件
import SliderItems from './SliderItems';// SliderItems组件
import SliderArrows from './SliderArrows';// SliderArrows组件
import SliderDots from './SliderDots';// SliderDots组件
```
2.默认导出 Slider.js 组件
```
export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pos: 0};//默认索引
    }

    // turn方法 左右切换图片 参数n 表示切换的步长
    turn = (n) => {
        let pos = this.state.pos;
        pos += n;
        //右边界处理
        if (pos >= this.props.images.length) {
            pos = 0;
        }
        //左边界处理
        if (pos < 0) {
            pos = this.props.images.length - 1;
        }
        //改变状态
        this.setState({pos});
    };

    // play方法 开启定时器自动轮播
    play = () => {
        this.$timer = setInterval(() => {
            // 调用 turn 方法
            this.turn(1);
        }, this.props.interval * 1000)
    };

    // 在组件加载完成之后执行
    componentDidMount() {
        // 判断是否需要自动轮播
        if (this.props.autoplay) {
            // 调用 play 方法
            this.play();
        }
    }

    render() {
        let images = this.props.images;
        // 设置样式
        let style = {
            width: 200 * images.length,
            left: this.state.pos * -200,
            transitionDuration: this.props.speed + 's'
        };
        return (
            <div onMouseOver={() => clearInterval(this.$timer)} onMouseOut={() => this.play()} className="wrapper">
                <!-- SliderItems 组件 -->
                <SliderItems images={images} style={style}/>
                <!-- SliderArrows 组件 -->
                <SliderArrows turn={this.turn} arrows={this.props.arrows}/>
                <!-- SliderDots 组件 -->
                <SliderDots dots={this.props.dots} images={images} turn={this.turn} pos={this.state.pos}/>
            </div>
        )
    }
}
```

### SliderItems.js 组件
```
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
```

### SliderArrows.js 组件
```
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

```

### SliderDots.js 组件
```
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
```

### Slider.less 样式文件
```
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: yellowgreen;
}

ul, li {
  list-style: none;
}

.active {
  border: 1px solid green;
  background-color: yellowgreen;
}

.wrapper {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 30px auto;
  overflow: hidden;
  .sliders {
    height: 200px;
    position: absolute;
    transition-duration: 1s;
    .slider {
      float: left;
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .arrows {
    position: absolute;
    height: 20px;
    width: 100%;
    top: 50%;
    margin-top: -10px;
    .arrow {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      background-color: #eee;
      &:hover {
        background-color: #999;
      }
    }
    .arrow-left {
      float: left;
      margin-left: 5px;
    }
    .arrow-right {
      float: right;
      margin-right: 5px;
    }
  }
  .dots {
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 5px;
    text-align: center;
    .dot {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin-left: 5px;
      background-color: #eeeeee;
      cursor: pointer;
      &:hover {
        background-color: yellow;
      }
    }
  }
}
```