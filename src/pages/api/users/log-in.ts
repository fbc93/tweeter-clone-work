import client from "@src/libs/server/client";
import withApiSession from "@src/libs/server/withApiSession";
import withHandler from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "./create-account";

const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {

  if(req.method === "POST"){
    const {email, password} = req.body;
    
    const isAccountExist = await client.user.findUnique({
      where:{
        email
      }
    });

    if(!isAccountExist){
      return res.status(400)
      .json({
        ok:false,
        error:{
          type:"email",
          message:"존재하지 않는 이메일입니다."
        }  
      });
    }

    if(password !== isAccountExist.password){
      return res.status(400)
      .json({
        ok:false,
        error:{
          type:"password",
          message:"비밀번호가 일치하지 않습니다."
        }
      });
    }
   
    //세션에 아이디 비번 저장
    req.session.user = {
      id: isAccountExist.id
    }

    await req.session.save();
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}

export default withApiSession(
  withHandler({
    methods:["POST"],
    isPrivate:false,
    handler
  })
)