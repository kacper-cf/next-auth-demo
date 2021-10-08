import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  console.log("serverSideProps");
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
      session,
    },
  };
};

export default ProfilePage;
