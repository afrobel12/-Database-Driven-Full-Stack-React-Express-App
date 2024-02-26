import {Route, Routes, Link} from "react-router-dom"
import Home from "./components/Home"
import FormPage from "./components/FormPage"
import DisplayPage from "./components/DisplayPage"
import NewsPage from "./components/NewsPage"

export default function App() {
    return (
        <div>
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/form'>form</Link>
                <Link to='/entertainment'>entertainment</Link>
                <Link to='/news'>news</Link>
                
            </nav>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/form' element={<FormPage />} />
                <Route path='/entertainment' element={<DisplayPage />} />
                <Route path='/news' element={<NewsPage />} />
            </Routes>
        </div>
    )
}