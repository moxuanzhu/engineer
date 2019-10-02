import axios from 'axios'
import router from '../router'
import loading from './loading'
// 请求拦截器
var $http = axios.create({});
$http.interceptors.request.use((config) => {
    loading.showFullScreenLoading()
    return config
}, (error) => {
    console.log("请求失败");
    // return Promise.reject(error)
})
  
  // 响应拦截器
  $http.interceptors.response.use((response) => {
    loading.tryHideFullScreenLoading()
    if(response.data.state==0){
        router.push("/login");
        // this.$router.go(0);
      }else{
        return response;
      }
    return response
  }, (error) => {
    loading.tryHideFullScreenLoading()
    console.log("接口异常");
    // return Promise.reject(error)
  })
export default $http

