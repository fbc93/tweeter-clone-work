import withApiSession from "@src/libs/server/withApiSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {

  if(req.method === "POST"){
    await req.session.destroy();

    return res.status(200).json({
      ok:true
    });
  }

  return res.status(405).end();
}

export default withApiSession(handler);