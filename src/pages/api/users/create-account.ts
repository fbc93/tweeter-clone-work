import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@src/libs/server/withHandler";
import client from "@src/libs/server/client";

export interface ResponseType {
  ok:boolean;
  [key:string]:any;
}

const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {
  
  if(req.method === "POST"){
    const {email, password, nickname} = req.body;
   
    const isEmailExist = await client.user.findFirst({
      where:{
        email
      }
    });

    const isNicknameExist = await client.user.findFirst({
      where:{
        nickname
      }
    });

    const isBothExist = await client.user.findFirst({
      where:{
        AND:[{email},{nickname}]
      }
    });

    if(isBothExist){
      return res
        .status(400)
        .json({ 
          ok: false, 
          errors:[
            {
              type:"email",
              message:"이미 존재하는 이메일입니다."
            },
            {
              type:"nickname",
              message:"이미 존재하는 닉네임입니다."
            }
          ]
        });
      }

    if(isEmailExist){
      return res
        .status(400)
        .json({ 
          ok: false, 
          errors:[
            {
              type:"email",
              message:"이미 존재하는 이메일입니다."
            },
          ]
        });
      }

    if(isNicknameExist){
      return res
        .status(400)
        .json({ 
          ok: false,
          errors:[
            {
              type:"nickname",
              message:"이미 존재하는 닉네임입니다."
            }
          ]
        });
      }

      await client.user.create({
        data:{
          email,
          password,
          nickname
        }
      });

    return res.status(200).json({ok:true});
  }
  
  return res.status(405).end();
}

export default withHandler({
  methods:["POST"],
  isPrivate:false,
  handler
});