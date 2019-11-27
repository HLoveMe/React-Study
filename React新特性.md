* React.createContext 

	创建上下文 以便于父子组件进行数据交互

	```
	const Context = React.createContext(100);
function ChildView() {
    return (
        <Context.Consumer>
            {(value) => {
                return (
                    <View>
                        <Text>{value}</Text>
                    </View>
                )
            }}
        </Context.Consumer>
    )
}
class TestView extends Component {
    constructor(ops) {
        super(ops)
        this.state = {
            value: 0
        }
    }
    componentDidMount() {
        this.setState({
            value: 99999
        })
    }
    render() {
        return (
            <View>
                <Context.Provider value={this.state.value}>
                    <ChildView></ChildView>
                </Context.Provider>
            </View>
        )
    }
}
	```
	
* React.memo

	* 包装函数组件 自动帮组件执行shouldComponentUpdate() , 但是只是执行浅比较；类似于 React.PureComponent
	* 这个高阶函数存在是作为一种性能优化的方式。不要使用它去纯粹地阻止渲染

	```
	function DomeView(){
		return (<View></View)
	}
	export default React.memo(DomeView)
	```
	
* React.lazy
	* 是代码切割的一部分 用于组件的懒加载
	
* Hooks 用于函数组件中

	```
	useState
	useEffect
	useContext
	useReducer
	useRef

	只能在函数的第一层 不能包含在for 或者 if中
		react 会根据useState使用顺序来保证下一次渲染可以拿到对应的值 [如何保证多个useState的相互独立]
	```
	* useState
	
		```
		functuon View(pros){
			const [count,setCount]=useState(0);
			const [name,setName] =useState("AA");
			if(xxxx){
				//错误
				const [name,setName] =useState("AA");
			}
			return <Text>{name}{count}</Text>
		}
		```
	* useEffect 副作用函数
		
		* 创建过程中会吧副作用函数和组件绑定的副作用函数
		* 在每次渲染中都会执行所有副作用函数 
		* 函数都是异步执行
		* 每次渲染都会执行副作用函数
		
		```
		functuon View(pros){
			const [count,setCount]=useState(0);
			useEffect(()=>{
				xx
			})
			return <Text>{count}</Text>
		}
		```
		```
		资源释放
		functuon View(pros){
			function Handle(){
			}
			const [count,setCount]=useState(0);
			useEffect(()=>{
				EventEmmiter.addListener("ABCD",handle)				return function(){
					EventEmmiter.remove("ABCD");
				}	
			})
			return <Text>{count}</Text>
		}
		
		useEffect 中返回一个函数；该函数会在下一次渲染是执行
		```
		```
		减少不必要的副作用函数
		useEffect(()=>{},[arg])
			第二个参数 表示 只有在该参数值发生变化后才重新调用副作用函数
		useEffect(()=>{},[空数组]) 只会调用一次 相当于componentDidMount
		
		functuon View(pros){
			const [count,setCount]=useState(0);
			useEffect(()=>{
				xx
			},[count])
			return <Text>{count}</Text>
		}
		````
	
	