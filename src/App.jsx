import { ListRepo } from './Components'
import { GlobalStyle } from './GlobalStyles'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css'


function App() {


  return (
    <>
      <ListRepo/>
      <GlobalStyle/>
      <ToastContainer/>
    </>
    
  )
}

export default App
