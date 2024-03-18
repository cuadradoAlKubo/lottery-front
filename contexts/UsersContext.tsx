"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { Payload } from "@/interfaces/user.interface";

interface State {
  status: number;
  error: boolean;
  msg: string;
  payload: Payload[];
}

const initialState: State = {
  status: 200,
  error: false,
  msg: "",
  payload: [],
};

type Action =
  | { type: "SET_USERS"; payload: State }
  | { type: "SET_ERROR"; error: boolean };

const usersReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, payload: action.payload.payload };
        case "SET_ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

interface UsersContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}


export const UsersContext = createContext<UsersContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
