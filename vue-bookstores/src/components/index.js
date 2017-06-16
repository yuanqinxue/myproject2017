/*将所有的vue单文件组件全部导入后，再全部导出*/
import Navbar from './Navbar.vue'; // 导入Navbar组件
import List from './List.vue'; // 导入List组件
import Add from './Add.vue'; // 导入Add组件
import Detail from './Detail.vue'; // 导入Detail组件

export {Navbar,List,Add,Detail}; //以解构赋值的形式导出所有组件
