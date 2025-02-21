import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store"; // Adjust the path based on your project
import { logout } from "./authSlice";

const AuthWatcher = () => {
  const dispatch = useDispatch();
  const { expiresAt } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (expiresAt) {
      const now = Date.now();
      const timeLeft = expiresAt - now;

      if (timeLeft <= 0) {
        dispatch(logout());
      } else {
        const timeout = setTimeout(() => {
          dispatch(logout());
        }, timeLeft);

        return () => clearTimeout(timeout); // Cleanup on unmount
      }
    }
  }, [expiresAt, dispatch]);

  return null; // This component doesn't render anything
};

export default AuthWatcher;
