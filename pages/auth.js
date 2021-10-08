import { getSession } from "next-auth/client";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthPage;
