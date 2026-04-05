import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import "./Profile.css";

interface ProfileProps {
  user: any;
  onClose: () => void;
  onUpdate: (data: FormData) => void;
}

const Profile = ({ user, onUpdate }: ProfileProps) => {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [age, setAge] = useState(user?.age || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setMobileNumber(user.mobileNumber || "");
      setAge(user.age || "");
    }
  }, [user]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("age", age);
      if (avatar) formData.append("avatar", avatar);

      await onUpdate(formData);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Profile</h1>
        <p className={`status-label ${user?.profileComplete ? "active" : ""}`}>
          {user?.profileComplete
            ? "Profile is Complete"
            : "Profile is Incomplete"}
        </p>
      </div>

      <div className="step-content">
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
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="input">
          <label>Full Name</label>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <img src="/pencil.png" alt="edit" className="icon" />
          </div>
        </div>

        <div className="input">
          <label>Email</label>
          <div className="input-wrapper">
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
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="+995 599 00 00 00"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <img src="/mark.png" alt="verified" className="icon" />
            </div>
          </div>
          <div className="input flex-1">
            <label>Age</label>
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="">Age</option>
              {[...Array(60)].map((_, i) => (
                <option key={i} value={18 + i}>
                  {18 + i}
                </option>
              ))}
            </select>
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
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
