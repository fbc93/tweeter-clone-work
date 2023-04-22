import { useState } from "react";

interface useMutationState<T> {
  isLoading:boolean;
  data?:T;
  error?:object;
}

export type useMutationResult<T> = [
  (data?:T)=> void, 
  useMutationState<T>
]

const useMutation = <T>(url:string):useMutationResult<T> => {

  // state 초기값
  const [state, setState] = useState<useMutationState<T>>({
    isLoading:false,
    data:undefined,
    error:undefined,
  });

  // mutate
  const mutation = (data?:T) => {
   setState((prev) => ({...prev, loading:true}));

   fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data),

   })
   .then((res) => res.json().catch(()=>{}))
   .then((data) => setState((prev) => ({...prev, data, isLoading:false})))
   .catch((error) => setState((prev) => ({...prev, error, isLoading:false}))
   );
  }

  return [mutation, {...state}]
}

export default useMutation;