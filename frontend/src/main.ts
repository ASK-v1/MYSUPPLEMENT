import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElRadio, ElInput, ElForm } from 'element-plus'

const app = createApp(App)
app.use(ElButton).use(ElRadio).use(ElInput).use(ElForm)

app.use(store).use(router).mount('#app')
