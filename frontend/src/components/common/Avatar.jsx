import { useState } from "react";

/**
 * Avatar component — shows uploaded profile photo if available,
 * falls back to ui-avatars.com, then to initial letter circle.
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getUIAvatarUrl(name, size) {
  const encoded = encodeURIComponent((name || "?").trim());
  return `https://ui-avatars.com/api/?name=${encoded}&size=${size}&background=random&color=fff&bold=true`;
}

export default function Avatar({ profilePhoto, name, email, size = 34, style }) {
  const [urlIndex, setUrlIndex] = useState(0);
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  const uploadedUrl = profilePhoto
    ? (profilePhoto.startsWith("http") ? profilePhoto : `${API_BASE}${profilePhoto}`)
    : null;
  const uiAvatarUrl = getUIAvatarUrl(name, size * 2);

  // Build fallback chain: uploaded photo → ui-avatars → letter
  const urls = [uploadedUrl, uiAvatarUrl].filter(Boolean);
  const currentUrl = urls[urlIndex];

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

  if (currentUrl) {
    return (
      <div style={base}>
        <img
          src={currentUrl}
          alt={initial}
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={() => setUrlIndex((i) => i + 1)}
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
