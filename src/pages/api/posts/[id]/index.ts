import withApiSession from "@src/libs/server/withApiSession";
import withHandler from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../users/create-account";


const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {
  
  if(req.method === "GET"){
    const {
      query:{ id },
      session: { user }
    } = req;
  
    if(id){
      const post = await client?.post.findUnique({
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
          },

          comments:{
            select:{
              user:{
                select:{
                  nickname:true,
                  avatar:true,
                }
              },

              content:true,
              createdAt:true,
              
            }
          },
        }
      });
  
      //console.log(post);
      const isLiked = Boolean(
        await client?.like.findFirst({
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


  if(req.method === "POST"){

    const {
      query: { id },
      session: { user },
      body: { content }
    } = req;

    if(id){
      const comment = await client?.comment.create({
        data:{
          content,

          user:{
            connect:{
              id: user?.id,
            }
          },

          post:{
            connect:{
              id: +id.toString(),
            }
          }
        }
      });

      



      return res.json({ ok:true, comment});
    }
  }
}

export default withApiSession(
  withHandler({
    methods:["GET","POST"],
    handler,
  })
)