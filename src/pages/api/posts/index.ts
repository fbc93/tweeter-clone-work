import withApiSession from "@src/libs/server/withApiSession";
import withHandler from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../users/create-account";

const handler = async (req:NextApiRequest, res:NextApiResponse<ResponseType>) => {

  if(req.method === "GET"){
    //get posts value
    const posts = await client?.post.findMany({
      include:{
        author:{
          select:{
            nickname:true,
            avatar:true,
          },
        },

        _count:{
          select:{
            likes:true,
          }
        }
      }
    });

    res.json({
      ok:true,
      posts,
    });
  }

  if(req.method === "POST"){
    //upload posts
    const {
      session:{ user },
      body: {imageFile, youtubeUrl, content},
    } = req;

    if(content === ""){
      res.status(400).json({ok:false, error:"글 내용 작성은 필수입니다."})
    }

    if(content != ""){
      const post = await client?.post.create({
        data:{
          image:imageFile,
          youtube: youtubeUrl,
          content:content,
          author:{
            connect:{
              id:user?.id
            }
          }
        }
      });

      return res.json({ ok:true, post});
    }
  }
}

export default withApiSession(
  withHandler({
    methods:["GET", "POST"],
    handler,
  })
)