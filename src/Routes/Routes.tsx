import HeaderOnly from '../layouts/HeaderOnly/HeaderOnly'


import Error from '../components/Error/Error'
import Following from '../pages/Following/Following'
import Home from '../pages/Home/Home'
import Live from '../pages/Live/Live'
import Logout from '../pages/Logout/Logout'
import Messages from '../pages/Messages/Messages'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Upload from '../pages/Upload/Upload'


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile },
    { path: '/live', component: Live },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/messages', component: Messages, layout: HeaderOnly },
    { path: '/logout', component: Logout, layout: null },
    { path: '*', component: Error, layout: null },
]

const privateRoutes: [] = [

]

export { publicRoutes, privateRoutes }
