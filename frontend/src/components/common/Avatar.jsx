import { useState } from "react";
import { getAvatarUrl } from "../../utils/gravatar";

/**
 * Avatar component — shows uploaded profile photo if available,
 * falls back to gravatar, then to initial letter circle.
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Avatar({ profilePhoto, name, email, size = 34, style }) {
  const [imgError, setImgError] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  const uploadedUrl = profilePhoto
    ? (profilePhoto.startsWith("http") ? profilePhoto : `${API_BASE}${profilePhoto}`)
    : null;
  const gravatarUrl = email ? getAvatarUrl(email, size) : null;
  const url = uploadedUrl || gravatarUrl;

  const base = {
    width: size,
    height: size,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...style,
  };

  if (url && !imgError) {
    return (
      <div style={base}>
        <img
          src={url}
          alt={initial}
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className="avatar-sm"
      style={{ ...base, fontSize: Math.round(size * 0.38) }}
    >
      {initial}
    </div>
  );
}
