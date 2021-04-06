import Vue from 'vue';
import { Avatar,Form,FormItem,Input,Button,Message } from 'element-ui'

// 头像
Vue.use( Avatar )
// 表单信息
Vue.use(Form);
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$message = Message;