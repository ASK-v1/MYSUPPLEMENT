import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElInput, ElForm, ElAutocomplete, ElRate, ElCarousel, ElCarouselItem } from 'element-plus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faUser, faShoppingCart, faSearch)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElInput).use(ElForm).use(ElAutocomplete).use(ElRate).use(ElCarousel).use(ElCarouselItem)

app.use(store).use(router).mount('#app')
