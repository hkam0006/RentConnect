import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabase";
import { setUser, logout, setManager, setRenter, setLoading } from '../utils/UserSlice';
import { useNavigate } from "react-router-dom";

const isPropertyManager = async (userId) => {
  const {data, error } = await supabase
    .from("PROPERTY MANAGER")
    .select("*")
    .eq('property_manager_id', userId)
  return data
}

const isAccountSetup = async (userId) => {
  const {data, error} = await supabase
    .from("ACCOUNT SETUP")
    .select("*")
    .eq('account_id', userId)
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      if (Boolean(storedUser) && event !== "SIGNED_OUT") {
        return
      }
      await dispatch(setLoading(true))
      if ((event === 'SIGNED_IN' ) && session) {
        const user = session.user;
        isAccountSetup(user.id).then(async (data) => {
          if (data.length > 0){
            switch (data[0].account_type){
              case "Property Manager":
                navigate("/AccountSetUpPM");
                break;
              case "Renter":
                navigate("/AccountSetUpR");
                break;
              default:
                console.log("Invalid account type found")
                return;
            }
            await dispatch(setLoading(false))
            return
          } 
        })

        isPropertyManager(user.id).then(async (data) => {
          if (data.length > 0) {
            getCompanyID(user.id).then(async (companyIDData) => {
              if (companyIDData[0]){
                data = data.map((item) => ({
                  ...item,
                  company_id: companyIDData[0].company_id       
                }));
              }
              await dispatch(setManager())
              await dispatch(setUser(data[0]))
              await dispatch(setLoading(false))
            });
          } 
        })
        isRenter(user.id).then(async (data) => {
          if (data.length > 0) {
            await dispatch(setRenter())
            await dispatch(setUser(data[0]))
            await dispatch(setLoading(false))
          }
        })
      } else if (event === 'SIGNED_OUT'){
        await dispatch(logout())
        navigate("/Landing")
      }
      else {
        await dispatch(setLoading(false))
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [storedUser]);
};

export default useAuthListener;