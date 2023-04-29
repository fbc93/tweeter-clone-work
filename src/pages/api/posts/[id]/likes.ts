import withApiSession from "@src/libs/server/withApiSession";
import withHandler, { ResponseType } from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@src/libs/server/client";

const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {
  const { 
    query:{id}, 
    session:{user},
   } = req;

   if(id){
    const likeExists = await client.like.findFirst({
      where:{
        postId: +id.toString(),
        userId: user?.id,
      },
     });

     if(likeExists){
      await client.like.delete({
        where:{
          id: likeExists.id,
        },
      });

     } else {

      //post like
      await client.like.create({
        data:{
          user:{
            connect:{
              id: user?.id,
            },
          },

          post:{
            connect:{
              id: +id.toString(),
            }
          }
        }
      });
     }

    return res.json({ok:true})
   }
}

export default withApiSession(
  withHandler({
    methods:["POST"],
    handler,
  })
)