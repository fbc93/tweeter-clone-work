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
}

export default withApiSession(
  withHandler({
    methods:["GET", "POST"],
    handler,
  })
)