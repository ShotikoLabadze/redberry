import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { updateProfile } from "../../api/auth.service";
import "./Profile.css";

interface ProfileProps {
  user: any;
  onClose: () => void;
  onUpdate: () => void;
}

const Profile = ({ user, onClose, onUpdate }: ProfileProps) => {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [age, setAge] = useState(user?.age || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const cleanPhone = mobileNumber.replace(/\s/g, "");
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Name is required";
    else if (fullName.length < 3) newErrors.fullName = "Too short";

    if (!cleanPhone) newErrors.mobileNumber = "Required";
    else if (!cleanPhone.startsWith("5"))
      newErrors.mobileNumber = "Must start with 5";
    else if (cleanPhone.length !== 9)
      newErrors.mobileNumber = "Must be 9 digits";

    if (!age) newErrors.age = "Required";
    else if (Number(age) < 16) newErrors.age = "16+ only";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [fullName, mobileNumber, age]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("mobile_number", mobileNumber.replace(/\s/g, ""));
      formData.append("age", age.toString());
      if (avatar) formData.append("avatar", avatar);

      await updateProfile(formData);
      await onUpdate();
      onClose();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Profile</h1>
        <div className="profile-info-section">
          <div className="avatar-preview-wrapper">
            <img
              src={preview || user?.avatar || "/defAvatar.png"}
              alt="User"
              className="profile-main-img"
            />
            <span
              className={`status-dot ${user?.profileComplete ? "complete" : ""}`}
            ></span>
          </div>
          <div className="user-details-text">
            <h2 className="display-username">{user?.username || "Username"}</h2>

            <p
              className={`status-text ${user?.profileComplete ? "complete" : "incomplete"}`}
            >
              {user?.profileComplete
                ? "Profile is Complete"
                : "Profile is Incomplete"}
            </p>
          </div>
        </div>
      </div>

      <div className="step-content">
        <div className="input">
          <label>Full Name</label>
          <div
            className={`input-wrapper ${
              errors.fullName
                ? "error-border"
                : fullName.length >= 3
                  ? "success-border"
                  : ""
            }`}
          >
            <input
              type="text"
              placeholder="Username"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <img src="/pencil.png" alt="edit" className="icon" />
          </div>
        </div>

        <div className="input">
          <label>Email</label>
          <div className="input-wrapper disabled-wrapper">
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="disabled-input"
            />
            <img src="/mark.png" alt="verified" className="icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="input flex-3">
            <label>Mobile Number</label>
            <div
              className={`input-wrapper ${
                errors.mobileNumber
                  ? "error-border"
                  : mobileNumber.length >= 9
                    ? "success-border"
                    : ""
              }`}
            >
              <input
                type="text"
                placeholder="+995 599209820"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <img src="/mark.png" alt="verified" className="icon" />
            </div>
          </div>
          <div className="input flex-1">
            <label>Age</label>
            <div
              className={`input-wrapper ${
                errors.age ? "error-border" : age >= 16 ? "success-border" : ""
              }`}
            >
              <select value={age} onChange={(e) => setAge(e.target.value)}>
                <option value="">{user?.age || "Age"}</option>
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={16 + i}>
                    {16 + i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="upload">
          <label>Upload Avatar</label>
          <div className="drop">
            <input
              type="file"
              id="avatar-upload"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload" className="upload-placeholder">
              <img src="/uploadIcon.png" alt="upload" className="upload-icon" />
              <p>
                Drag and drop or{" "}
                <span className="upload-link">Upload file</span>
              </p>
              <span>JPG, PNG or WebP</span>
            </label>
          </div>
        </div>

        <button
          className="submit-btn"
          onClick={handleUpdate}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
