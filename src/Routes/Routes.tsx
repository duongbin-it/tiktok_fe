import Error from '../components/Error/Error'
import PageLogin from '../components/PageLogin/PageLogin'
import HeaderOnly from '../layouts/HeaderOnly/HeaderOnly'
import Following from '../pages/Following/Following'
import Home from '../pages/Home/Home'
import Live from '../pages/Live/Live'
import Logout from '../pages/Logout/Logout'
import Messages from '../pages/Messages/Messages'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Upload from '../pages/Upload/Upload'

const user = localStorage.getItem("user")

const totalRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile },
    { path: '/live', component: Live },
    { path: '/search', component: Search, layout: null },
    { path: '/logout', component: user ? Logout : PageLogin, layout: null },
    { path: '*', component: Error, layout: null },
    { path: '/upload', component: user ? Upload : PageLogin, layout: user ? HeaderOnly : null },
    { path: '/messages', component: user ? Messages : PageLogin, layout: user ? HeaderOnly : null },
]



export { totalRoutes }
