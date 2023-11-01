import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/userActions";

const UserPage = () => {
  const state = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  console.log(state);
  return (
    <div>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        !state.isError && state.users.map((user) => <p>{user.name}</p>)
      )}
    </div>
  );
};

export default UserPage;
