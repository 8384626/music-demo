import Vue from "vue";
import {
  Avatar,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  Carousel,
  CarouselItem,
  InfiniteScroll
} from "element-ui";

// 头像
Vue.use(Avatar);
// 登录表单
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;

// 走马灯
Vue.use(Carousel)
Vue.use(CarouselItem)

// 滚动加载更多
Vue.use(InfiniteScroll);