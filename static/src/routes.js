import Desk from './pages/desk.js';
import Login from './pages/login.js';

export default {
    desk: { page: Desk, loginRequired: true },
    login: { page: Login }
}