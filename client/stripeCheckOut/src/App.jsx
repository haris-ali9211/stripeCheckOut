import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './screens/main';
import StripeSuccess from './screens/success'
import StripeCancel from './screens/cancel'
import NotFound from './screens/notFound'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
        <Route path="success" element={<StripeSuccess />} />
        <Route path="cancel" element={<StripeCancel />} />
        <Route path="*" element={<NotFound />} />        
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
