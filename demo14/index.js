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
//this.state 状态机,猜测为变化state以后就重新渲染dom
let LinkButton = React.createClass({
    getInitialState:function () {
        return {
            liked:false
        }
    },
    handleClick:function () {
        this.setState({
            liked:!this.state.liked
        });
    },
    render:function () {
        var text = this.state.liked ? 'like':'havan\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle
            </p>
        );
    }
});
ReactDOM.render(<LinkButton></LinkButton>,document.getElementById('link_button_div'));
//表单，用户填写的内容属于用户与组件的交互，不能用this.props来读取
let Input = React.createClass({
    getInitialState:function(){
        return {
            input_data:"value"
        }
    },
    handleChange:function(event){
        this.setState({
            input_data:event.target.value
        })
    },
    render:function(){
        var input_data = this.state.input_data;
        return (
            <div>
            <input type="text" value={input_data} onChange={this.handleChange} />
            <p>{input_data}</p>
            </div>
        );
    }
});
ReactDOM.render(<Input/>,document.getElementById('input_div'));
//组件的生命周期
/*
三个声明周期状态
    {
        Mounting:已经插入真实的DOM
        Updating:正在被重新渲染
        Unmounting:已移出真实 DOM
    }
*/
let Hello = React.createClass({
    getInitialState:function () {
        return {
            opacity:1.0
        };
    },
    componentDidMount:function() {
        this.timer = setTimeout(function(){
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1){
                opacity = 1.0
            }
            this.setState({
                opacity : opacity
            })
        }.bind(this), 100);
    },
    render:function () {
        return (
            //react的组件样式是一个对象，第一层是标识js语法，第二重标识对象
            <div style={{opacity:this.state.opacity}}>
            Hello {this.props.name}
            </div>
        );
    }
});
ReactDOM.render(<Hello name="World"/>,document.getElementById('event_div'))

//Ajax请求,从服务器获取数据渲染组件
let UserGist = React.createClass({
    PropType:{
        source:React.PropTypes.string.isRequired
    },
    getInitialState:function(){
        return {
            userName : '',
            lastGistUrl: ''
        };
    },
    componentDidMount:function () {
        setTimeout(function() {
            this.setState({
                userName:'Neojoke',
                lastGistUrl:'https://gist.github.com/Neojoke/ac6e9a3641e5e7771ecefe9805841edb'
            });
        }.bind(this),200);
    },
    render:function () {
        var name = this.state.userName;
        var url = this.state.lastGistUrl;
        return (
            <div>
                {name}'s last gist is <a href={url}>here</a>
            </div>
        );
    }
});
ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists"/>,
    document.getElementById('user_gist_div')
);
let RepoList = React.createClass({
    getInitialState:function () {
        return {
            loading:true,
            error:null,
            data:null
        };
    },
    componentDidMount:function () {
        this.props.promise.then(
            value=>this.setState({loading:false,data:value}),
            error=>this.setState({loading:false,error:error})
        );
    },
    render:function () {
        if(this.state.loading){
            return <span>Loading...</span>
        }
        else if(this.state.loading){
            return <span>Error:{this.state.error.message}</span>
        }
        else{
            var repos = this.state.data.items;
            var repoList = repos.map(function (repo,index) {
                return (<li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars)<br/>{repo.description}</li>)
            });
            return(
                <main>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            )
        }
        
    }
});
ReactDOM.render(<RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>,
document.getElementById('repo_list_div'));