import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out successful!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      //show toast
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
    >
      Log Out
    </div>
  );
};

export default SignOutButton;
