import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElInput, ElForm, ElAutocomplete, ElRate, ElCarousel, ElCarouselItem, ElDialog, ElButton, ElFormItem, ElSelect, ElOption, ElInputNumber, ElDrawer, ElStep, ElSteps, ElCheckbox, ElDatePicker, ElCheckboxGroup, ElEmpty } from 'element-plus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart, faSearch, faMapMarkerAlt, faTrashAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faUser, faShoppingCart, faSearch, faMapMarkerAlt, faTrashAlt, faCreditCard)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElInput).use(ElForm).use(ElAutocomplete).use(ElRate).use(ElCarousel).use(ElCarouselItem).use(ElDialog).use(ElButton).use(ElFormItem).use(ElSelect).use(ElOption).use(ElInputNumber).use(ElDrawer).use(ElStep).use(ElSteps).use(ElCheckbox).use(ElDatePicker).use(ElCheckboxGroup).use(ElOption).use(ElSelect).use(ElEmpty)

app.use(store).use(router).mount('#app')
