import { Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout"
import { totalRoutes } from "./Routes/Routes"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {totalRoutes.map((route) => {
            let Layout: any = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route key={uuidv4()} path={route.path} element={
                <Layout>
                  {route.component}
                </Layout>
              }
              ></Route>
            )
          })}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
