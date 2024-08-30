import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../supabase";
import { setUser, logout, setManager, setRenter } from '../utils/UserSlice';
import { useNavigate } from "react-router-dom";

const isPropertyManager = async (userId) => {
  const {data, error } = await supabase
    .from("PROPERTY MANAGER")
    .select("*")
    .eq('property_manager_id', userId)

  return data
}

const isRenter =  async (userId) => {
  const {data, error } = await supabase
    .from("RENTER")
    .select("*")
    .eq('renter_id', userId)
  
    return data
}

const useAuthListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === "INITIAL_SESSION") && session) {
        const user = session.user;
        // Example role-checking logic
        
        isPropertyManager(user.id).then((data) => {
          if (data.length > 0) {
            dispatch(setManager())
            dispatch(setUser(data[0]))
          }
        })
        isRenter(user.id).then((data) => {
          if (data.length > 0) {
            dispatch(setRenter())
            dispatch(setUser(data[0]))
          }
        })
      } else if (event === 'SIGNED_OUT'){
        dispatch(logout())
        navigate("/Landing")
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
};

export default useAuthListener;