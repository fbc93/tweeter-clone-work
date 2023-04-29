import withApiSession from "@src/libs/server/withApiSession";
import withHandler, { ResponseType } from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@src/libs/server/client";

const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {
  const {
    query:{ id },
    session: { user }
  } = req;

  if(id){
    const post = await client.post.findUnique({
      where:{
        id:+id.toString(),
      },
      include:{
        author:{
          select:{
            nickname:true,
            avatar:true,
          }
        },
        _count:{
          select:{
            likes:true,
          }
        }
      }
    });

    //console.log(post);
    const isLiked = Boolean(
      await client.like.findFirst({
        where:{
          postId:post?.id,
          userId:user?.id,
        },
        select:{
          id:true,
        }
      })
    );

    return res.json({ok:true, post, isLiked});
  }
}

export default withApiSession(
  withHandler({
    methods:["GET"],
    handler,
  })
)