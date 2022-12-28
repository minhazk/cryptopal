import { createContext, useContext } from 'react';

const TagContext = createContext({});
export const useTagContext = () => useContext(TagContext);

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const TagContextProvider = ({ children }) => {
    // const []
};
