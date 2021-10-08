import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage({ user }) {
  return <UserProfile email={user.email} name={user.name} />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    // return {
    //   notFound: true,
    // };

    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default ProfilePage;
