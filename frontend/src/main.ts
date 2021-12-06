import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElRadio, ElInput, ElForm } from 'element-plus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faShoppingCart)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElButton).use(ElRadio).use(ElInput).use(ElForm)

app.use(store).use(router).mount('#app')
