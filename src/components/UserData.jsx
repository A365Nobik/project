export default function UseData({ token }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Email- {token.user.email}</h1>
        <h1>
          Register date- {token.session.user.email_confirmed_at.slice(0, 10)} {token.session.user.email_confirmed_at.slice(11,16)}
        </h1>
        <h1>Last Sign In -{token.session.user.last_sign_in_at
.slice(0,10)} {token.session.user.last_sign_in_at
.slice(11,16)}</h1>

      </div>
    </>
  );
}
