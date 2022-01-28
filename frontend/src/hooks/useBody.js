import { createContext, useContext, useState } from 'react';

const BodyProvider = (props) => {
    const [currFunc, setcurrFunc] = useState("GaborTransform");

    const setFunc = (func) => {
        setcurrFunc(func);
    };

    return (
        <BodyContext.Provider
          value={{
            currFunc,
            setFunc,
          }}
          {...props}
        />
      );
}

const BodyContext = createContext({
    currFunc: "",
    setFunc: () => {},
  });

function useBody() {
    return useContext(BodyContext);
}

export { BodyProvider, useBody };