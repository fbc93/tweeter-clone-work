import {withIronSessionApiRoute} from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?:{
      id:number;
    }
  }
}

const cookieOptions = {
  cookieName:"shareMovie",
  password:"CKRz2gPkDxgdM3J6xvvos3my6WtYtApW",
};

const withApiSession = (fn:any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export default withApiSession;