import withApiSession from "@src/libs/server/withApiSession"
import withHandler from "@src/libs/server/withHandler"
import { NextApiRequest, NextApiResponse } from "next"
import client from "@src/libs/server/client";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {

  if(req.method === "GET"){
    const profile = await client?.user.findUnique({
      where:{
        id: req.session.user?.id,
      }
    });

    res.json({
      ok:true,
      profile
    });
  }

  if(req.method === "POST"){
    const {
      session: { user },
      body: { nickname, password, avatar }
    } = req;

    const currentUser = await client.user.findUnique({
      where:{
        id:user?.id,
      }
    });

    if(nickname && nickname !== currentUser?.nickname){
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where:{
            nickname,
          },
          select:{
            id:true,
          },
        })
      );

      if(alreadyExists){
        return res.json({
          ok:false,
          error:"이미 존재하는 닉네임입니다.",
        });
      }

      await client.user.update({
        where:{
          id:user?.id,
        },
        data:{
          nickname,
        },
      });

      return res.json({ok:true});
    }

    if(password){
      await client.user.update({
        where:{
          id:user?.id,
        },
        data:{
          password,
        }
      });
    }

    if(avatar){
      await client.user.update({
        where:{
          id:user?.id,
        },
        data:{
          avatar,
        },
      });
    }

    return res.json({ok:true});
  }
}

export default withApiSession(
  withHandler({
    methods:["GET", "POST"],
    handler,
  })
)