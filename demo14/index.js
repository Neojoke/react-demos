//创建自定义模板
var HelloMessage = React.createClass({
    render: function () {
        return <h1>Hello {this.props.name}</h1>;
    }
});
ReactDOM.render(
    <HelloMessage name="John"/>, document.getElementById('example'));

//使用thi.props.children
var child_list = ['Neo', 'Longly', 'Fary'];
var NameList = React.createClass({
    render: function () {
        var childs = this.props.children;
        return (
            <ul>{
                React
                    .Children
                    .map(this.props.children, function (child) {
                        var idx = childs
                            .indexOf(child);
                        return <li>{idx+1}.{child}</li>                        
                    })
}</ul>
        )
    }
})
ReactDOM.render(
    <NameList>
    <a>a</a>
    <a>b</a>
    <a>c</a>
</NameList>, document.getElementById('list_div'));

//propTypes
let PropType = React.createClass({
    PropType:{
        title:React.PropTypes.string.isRequired,
    },
    getDefaultProps:function(){
        return {
            title:"Hello World!"
        }
    },
    render:function(){
        return <h1>{this.props.title}</h1>
    }
});
var titleData = '这是个标题';
ReactDOM.render(<PropType title={titleData}></PropType>,document.getElementById('proptype_ele'));

//获取真实节点,通过this.refs来获取真实DOM
let InputRef = React.createClass({
    handleClick:function(){
        this.refs.myTextInput.focus();
    },
    render:function(){
        return (
            <div>
                <input type="text" ref = 'myTextInput' />
                <input type='button' value='focus the text input' onClick={this.handleClick} />
            </div>
        );
    }
});
ReactDOM.render(<InputRef/>,document.getElementById('input_refs'))