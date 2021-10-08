import { useState } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch("/api/auth/change-password", {
        method: "PATCH",
        body: JSON.stringify({ newPassword, oldPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          onChange={(event) => setOldPassword(event.target.value)}
          type="password"
          id="old-password"
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
