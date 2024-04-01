import { App } from "antd";
import { createContext, useContext, useState } from "react";
import { contextTypes } from "../types/interface";

interface ContextComponent {
  children: React.ReactNode
}
const initContext: contextTypes = {
  name: '',
  setName: () => { }
}
const ContextProvider: React.Context<contextTypes> = createContext<contextTypes>({ ...initContext });

const Context: React.FC<ContextComponent> = ({ children }): JSX.Element => {
  const [name, setName] = useState<string>('');
  return (
    <>
      <ContextProvider.Provider value={{ name, setName }}>
        <App>
          {children}
        </App>
      </ContextProvider.Provider>
    </>
  )
}
export const useGlobal = (): contextTypes => useContext<contextTypes>(ContextProvider)
export default Context