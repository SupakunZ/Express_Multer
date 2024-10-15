import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';

function App() {
  // javascript

  return (
    <BrowserRouter>
      <div>
        {/* HTML */}
        <h1>Form CRUD</h1>


        <Routes>
          <Route path='/' element={<FormProduct />} />
          <Route path='/edit/:id' element={<FormEditProduct />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
