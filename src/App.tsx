import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Start from "./components/start/Start";

const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/start' element={<Start />} />
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="*" element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
