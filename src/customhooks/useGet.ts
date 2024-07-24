
import {useEffect, useState} from 'react';

export const API_URI='http://localhost:3000/api'
export interface BaseProps {
    path: string;
    start?: boolean;
    withToken?: boolean;
  }
  export type GetProps = {
    method: 'GET' | 'HEAD';
    data?: never;
  };
    export type FetchReturn = {
    result: any | undefined;
    processRequest: ({data}?: any) => void;
    loading: boolean;
    error: any | null;
  };

export function   useGet({path, start = false}: BaseProps): FetchReturn {
    const [result, setResult] = useState<object>();
    const [error, setError] = useState<object | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
      if (loading) return;
      var mainUrl = `${API_URI}${path}`; 

  
    //   var authToken = await getToken();
      try {
        setLoading(true);
        // const headers =
        //   authToken === undefined ? undefined : headerConfig(authToken!);
  
        const response = await fetch(mainUrl, {
        //   headers: headers,
          method: 'GET',
        });
  
        const text = await response.text();
  
        const dataFromText = JSON.parse(text);
            //console.log('dataFromText',dataFromText);

        if (response.status == 200) {
          setLoading(false);
          setResult(dataFromText);
          //console.log('200 yes status run');
          setError(null);
        } else {
          setLoading(false);
          setResult({});
          setError(dataFromText);
          //console.log('!status run:', dataFromText);
        }
      } catch (e) {
        setLoading(false);
        //console.log('Error:', error);
        setResult({});
      }
    };
    useEffect(() => {
      // This ensures that if the start prop is true the request will be sent directly.
      if (start) fetchData();
    }, []);
    const processRequest = () => {
      fetchData();
    };
    return {result, loading, error, processRequest};
  }