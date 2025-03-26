import { Card } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import UserProfileForm from "../../../components/UserProfile";
import { updatedUser } from "../../../services/user.service";
import { User } from "../../../models/UserModel";

const AdminProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  
  const handleSaveChanges = async (formValues: User) => {
    const { video_url } = currentUser;
    const extendedFormValues = {
      ...formValues,
      video_url,
    };

    await updatedUser(currentUser._id, extendedFormValues);
    localStorage.setItem("user", JSON.stringify({ ...currentUser, ...extendedFormValues }));

  };
  return (
    <Card>
      {/* <div>
        <h3 className="text-2xl mt-5">Profile</h3>
        <h5 className="mb-4">Here is your information</h5>
      </div> */}
      <UserProfileForm currentUser={currentUser} onSave={handleSaveChanges} />
    </Card>
  );
};

export default AdminProfile;
