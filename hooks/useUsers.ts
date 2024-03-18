import { UserResponse } from "@/interfaces/user.interface";
import { useContext, useEffect, useCallback } from "react";
import { UsersContext } from "@/contexts/UsersContext";
const useUsers = () => {
  const { dispatch } = useContext(UsersContext);
  const getUsers = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      "https://privatedevs.com/api-contest/api/v1/users/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: "SET_USERS",
        payload: data.payload.users,
      });
    } else {
      throw new Error("Failed to fetch users");
    }
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return { getUsers };
};
export default useUsers;
