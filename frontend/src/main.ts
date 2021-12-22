import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElInput, ElForm, ElAutocomplete, ElRate, ElCarousel, ElCarouselItem, ElDialog, ElButton, ElFormItem, ElSelect, ElOption, ElInputNumber, ElAvatar, ElDrawer, ElStep, ElSteps } from 'element-plus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faUser, faShoppingCart, faSearch)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElInput).use(ElForm).use(ElAutocomplete).use(ElRate).use(ElCarousel).use(ElCarouselItem).use(ElDialog).use(ElButton).use(ElFormItem).use(ElSelect).use(ElOption).use(ElInputNumber).use(ElAvatar).use(ElDrawer).use(ElStep).use(ElSteps)

app.use(store).use(router).mount('#app')
