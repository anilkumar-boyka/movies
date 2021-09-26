import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Movies from '@/components/movies/Movies'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
Vue.use(BootstrapVue)
Vue.use(Router)

describe('Movies.vue', () => {
    const wrapper = mount(Movies);

    it('renders content correctly', () => {
        console.log(wrapper.vm)
    })
})