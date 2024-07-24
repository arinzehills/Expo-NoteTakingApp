import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { API_URI } from './useGet';

const usePost = (path:any,{ method = 'POST' } = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    var mainUrl = `${API_URI}${path}`; 

    const postData = useCallback(
      async (payload:any) => {
        console.log("payload",payload)
        setLoading(true);
        try {
          const response = await fetch(mainUrl,{
            method:method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
          const text = await response.text();
          const result = JSON.parse(text);
          console.log("STATUS",text,response.status)
          if (response.status === 200) {
            setLoading(false);
            setData(result);
            setError(null);
          } else {
            setLoading(false);
            setData(null);
            setError(result);
          }
        } catch (err:any) {
          setError(err);
          console.log("EROR",err);
          setData(null);
        } finally {
          setLoading(false);
        }
      },
      [path]
    );
  
    return { data, error, loading, postData };
  };
  
export default usePost;
