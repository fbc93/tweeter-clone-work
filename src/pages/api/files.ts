import withApiSession from "@src/libs/server/withApiSession";
import withHandler from "@src/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {

  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CF_TOKEN}`,
          }
        }
      )).json();
    
    res.json({
      ok:true,
      ...response.result,
    });

}

export default withApiSession(
  withHandler({
    methods:["GET"],
    handler
  })
);