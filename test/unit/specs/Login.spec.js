import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Login from '@/components/movies/Login'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/* jest.mock("firebase/auth", () => {

  jest.mock('getAuth')
  const auth = jest.fn;
  const signInWithEmailAndPassword = jest.fn((auth, 'anil@gmail.com', '12345'))

});
 */
describe('Login.vue', () => {
  const div = document.createElement('div')
  div.id = 'root'
  document.body.appendChild(div)
  const wrapper = mount(Login, {
    attachTo: '#root'
  })
  beforeEach(() => {
    login: jest.fn()
  })
  it('Contents rendering corectly', () => {
    expect(wrapper.findAll('input').length).toEqual(2)
    expect(wrapper.vm.loginButton).toBe(true)
    expect(wrapper.vm.credentials.email).toBe('')
    expect(wrapper.vm.credentials.password).toBe('')
  })

  it('login successfull', async () => {
    await wrapper.find("[type='submit']").trigger('click')
    expect(wrapper.vm.loginButton).toBe(false)
  })

})