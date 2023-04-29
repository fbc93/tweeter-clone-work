import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods:method[];
  isPrivate?:boolean;
  handler:(req:NextApiRequest, res:NextApiResponse) => void;
}

const withHandler = ({
  methods,
  isPrivate = true,
  handler,
}:ConfigType) => {
  
  return async (
    req:NextApiRequest, 
    res:NextApiResponse):Promise<any> => {
    
    if(req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    if(isPrivate && !req.session.user ){
      return res.status(400).json({ok:false, error:"로그인 해주세요!"})
    }

    try {
      await handler(req,res);

    } catch (error) {
      console.log(error);
      return res.status(500).json({error});
    }
  }
}

export default withHandler;