import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetCompanies = () =>{
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("COMPANY")
                .select("*");

            if (error) {
                setLoading(false);
                setCompanies([]);
            } else {
                setLoading(false);
                setCompanies(data || []);
            }
        }
        fetchCompanies();
    }, []);
    return {companies, loading};
};

export default useGetCompanies;