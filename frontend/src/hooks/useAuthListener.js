import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const getCompanyID = async (userId) => {
  const {data: companyIDData, error} = await supabase
    .from("PROPERTY MANAGER COMPANY")
    .select("*")
    .eq('property_manager_id', userId)
  return companyIDData
}

const isRenter =  async (userId) => {
  const {data, error } = await supabase
    .from("RENTER")
    .select("*")
    .eq('renter_id', userId)
    return data
}

const useAuthListener = () => {
  // Example currentUser object
  // 
  // propertyManager: {
  //    property_manager_id: string,
  //    company_id: string
  // } 
  //
  // tenant: {
  //    renter_id: string,
  // }
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === "INITIAL_SESSION") && session) {
        const user = session.user;
        // Example role-checking logic
        isPropertyManager(user.id).then(async (data) => {
          if (data.length > 0) {
            getCompanyID(user.id).then(async (companyIDData) => {
              if (companyIDData[0]){
                data[0].company_id = companyIDData[0].company_id;
              }
            });
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