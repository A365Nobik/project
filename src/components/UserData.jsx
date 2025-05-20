import { useState } from "react";

export default function UseData({ token, regDate }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Email- {token.user.email}</h1>
        <h1>Register date- {new Date(token?.user?.email_confirmed_at).toLocaleString()}</h1>
        <h1>Last login - {new Date(token.session.user.last_sign_in_at).toLocaleString()}</h1>
      </div>
    </>
  );
}
