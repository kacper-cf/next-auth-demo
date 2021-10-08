import { getSession, useSession } from "next-auth/client";
import { useEffect, useReducer } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useRouter } from "next/router";
function UserProfile({ email, name }) {
  // const [session, loading] = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth");
  //   }
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <h2>{email || name}</h2>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
