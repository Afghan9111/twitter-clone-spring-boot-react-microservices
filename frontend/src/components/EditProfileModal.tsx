import { TextField } from "@mui/material";
import { SquareX, Camera } from "lucide-react";
import type { User } from "../types/Users/User";
import '../styles/components-styles/EditModal.css';

type EditProfileModalParts = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    editableUserInfo: User | null;
    setEditableUserInfo: (user: User) => void;

    profilePhotoRef: React.RefObject<HTMLInputElement | null>;
    backgroundPhotoRef: React.RefObject<HTMLInputElement |null>;

    setProfilePhoto: (file: File) => void;
    setBackgroundPhoto: (file: File) => void;

    closeModal: () => void;
};

export default function EditProfileModal({
    handleSubmit,
    handleChange,
    editableUserInfo,
    setEditableUserInfo,
    profilePhotoRef,
    backgroundPhotoRef,
    setProfilePhoto,
    setBackgroundPhoto,
    closeModal
}: EditProfileModalParts) {
    return (
        <div className="editModalContainer">
            <div className="editModalCurverContainer">
                <form onSubmit={handleSubmit}>
                    <div className="editModal">
                        <div className="closeIconHeadingContainer">
                            <SquareX
                                color="black"
                                className="closeIconForModal"
                                onClick={closeModal}
                            />
                            <p>Edit your profile</p>
                            <button className="saveProfileChangesButton" type="submit">
                                Save
                            </button>
                        </div>

                        <div className="userInformationContainer">
                            <div className="backgroundProfilephotoContainer">
                                <div className="backgroundPhotoContainerModal">
                                    <img src={editableUserInfo?.backgroundPhoto} className="backgroundPhotoModal" />
                                    <div className="cameraContainer">
                                        <input
                                            ref={backgroundPhotoRef}
                                            hidden
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            name="backgroundPhoto"
                                            onChange={(event) => {
                                                const file = event?.target?.files?.[0];
                                                if (file) {
                                                    setBackgroundPhoto(file);
                                                    const previewURL = URL.createObjectURL(file);
                                                    setEditableUserInfo({
                                                        ...editableUserInfo!,
                                                        backgroundPhoto: previewURL
                                                    });
                                                }
                                            }}
                                        />
                                        <Camera color="white" onClick={() => backgroundPhotoRef.current?.click()} />
                                    </div>
                                </div>

                                <div className="profilePhotoContainerModal">
                                    <img src={editableUserInfo?.profilePhoto} className="profilePhotoModal" />
                                    <div className="cameraContainer">
                                        <input
                                            ref={profilePhotoRef}
                                            hidden
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            name="profilePhoto"
                                            onChange={(event) => {
                                                const file = event?.target?.files?.[0];
                                                if (file) {
                                                    setProfilePhoto(file);
                                                    const previewURL = URL.createObjectURL(file);
                                                    setEditableUserInfo({
                                                        ...editableUserInfo!,
                                                        profilePhoto: previewURL
                                                    });
                                                }
                                            }}
                                        />
                                        <Camera color="white" onClick={() => profilePhotoRef.current?.click()} />
                                    </div>
                                </div>
                            </div>

                            <div className="bioLocationWebsiteContainers">
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    name="name"
                                    value={editableUserInfo?.name || ""}
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Bio"
                                    variant="outlined"
                                    fullWidth
                                    name="bio"
                                    value={editableUserInfo?.bio || ""}
                                    className="bioTextField"
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Website"
                                    variant="outlined"
                                    fullWidth
                                    className="websiteTextField"
                                    onChange={handleChange}
                                    name="website"
                                    value={editableUserInfo?.website || ""}
                                />
                                <TextField
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    className="locationTextField"
                                    onChange={handleChange}
                                    name="location"
                                    value={editableUserInfo?.location || ""}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
