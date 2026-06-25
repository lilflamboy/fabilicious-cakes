"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  public_id: string;
  url: string;
  width: number;
  height: number;
}

export default function AdminPage() {
  // Store password in a ref so it never gets stale across re-renders
  const passwordRef = useRef("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data.images || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        // Save to ref so it's always available for upload/delete
        passwordRef.current = passwordInput;
        setIsLoggedIn(true);
        await loadImages();
      } else {
        setLoginError("Wrong password. Please try again.");
      }
    } catch {
      setLoginError("Could not connect. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPG, PNG, etc.)");
      return;
    }
    setSelectedFile(file);
    setUploadError("");
    setUploadSuccess("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadSuccess("");
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // Use the ref value — guaranteed to be the correct password
      formData.append("password", passwordRef.current);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed. Please try again.");
      } else {
        setUploadSuccess("🎉 Photo uploaded! It's now live in your gallery!");
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        await loadImages();
      }
    } catch {
      setUploadError("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (public_id: string) => {
    setDeleting(public_id);
    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordRef.current, public_id }),
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.public_id !== public_id));
      } else {
        alert("Could not delete. Please try again.");
      }
    } catch {
      alert("Could not delete. Please try again.");
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  // ─── Login Screen ────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "48px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎂</div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--accent)", fontFamily: "serif", marginBottom: "8px" }}>
              Admin Panel
            </h1>
            <p style={{ color: "#999", fontSize: "14px" }}>Fabilicious Cakes — Gallery Manager</p>
          </div>

          <form onSubmit={handleLogin}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#444", fontSize: "14px" }}>
              Admin Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "2px solid #eee",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "#eee")}
            />
            {loginError && (
              <p style={{ color: "#e53e3e", fontSize: "13px", marginTop: "8px" }}>{loginError}</p>
            )}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loginLoading}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "14px",
                background: loginLoading ? "#ccc" : "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loginLoading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
              }}
            >
              {loginLoading ? "Checking..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ─────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--accent)", fontFamily: "serif", margin: 0 }}>
              🎂 Gallery Manager
            </h1>
            <p style={{ color: "#888", marginTop: "4px", fontSize: "14px" }}>
              Upload or remove photos from your gallery
            </p>
          </div>
          <button
            onClick={() => { setIsLoggedIn(false); passwordRef.current = ""; setPasswordInput(""); }}
            style={{ padding: "10px 20px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
          >
            Logout
          </button>
        </div>

        {/* Upload Box */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          marginBottom: "40px",
          border: "1px solid #f0f0f0"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: "#333" }}>
            📷 Upload New Photo
          </h2>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "var(--accent)" : "#ddd"}`,
              borderRadius: "16px",
              padding: "40px 20px",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "rgba(200,150,100,0.05)" : "#fafafa",
              transition: "all 0.2s",
              marginBottom: "20px",
            }}
          >
            {preview ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  style={{ borderRadius: "12px", objectFit: "cover", maxHeight: "200px", maxWidth: "100%", margin: "0 auto", display: "block" }}
                />
                <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
                  ✅ {selectedFile?.name}
                </p>
                <p style={{ color: "#aaa", fontSize: "12px", marginTop: "4px" }}>Click or drag to change photo</p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📁</div>
                <p style={{ fontSize: "16px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>
                  Drag & drop a photo here
                </p>
                <p style={{ fontSize: "13px", color: "#999" }}>or click to browse from your device</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />

          {selectedFile && (
            <button
              id="upload-photo-btn"
              onClick={handleUpload}
              disabled={uploading}
              style={{
                width: "100%",
                padding: "16px",
                background: uploading ? "#ccc" : "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: uploading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {uploading ? "⏳ Uploading... please wait" : "⬆️ Upload to Gallery"}
            </button>
          )}

          {uploadSuccess && (
            <div style={{ marginTop: "16px", padding: "14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", color: "#166534", fontWeight: "600", textAlign: "center" }}>
              {uploadSuccess}
            </div>
          )}
          {uploadError && (
            <div style={{ marginTop: "16px", padding: "14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", color: "#991b1b", textAlign: "center" }}>
              {uploadError}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#333", margin: 0 }}>
              🖼️ Current Gallery ({images.length} photos)
            </h2>
            <button
              onClick={loadImages}
              style={{ padding: "8px 16px", background: "#f0f0f0", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#555" }}
            >
              🔄 Refresh
            </button>
          </div>

          {images.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "20px", color: "#999" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏞️</div>
              <p style={{ fontSize: "16px" }}>No photos yet. Upload your first one above!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
              {images.map((img) => (
                <div key={img.public_id} style={{
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}>
                  {/* Image */}
                  <div style={{ position: "relative", aspectRatio: "1", width: "100%" }}>
                    <Image
                      src={img.url}
                      alt="Gallery photo"
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="220px"
                    />
                  </div>

                  {/* Delete area — inline confirmation, no browser dialog */}
                  <div style={{ padding: "10px" }}>
                    {confirmDelete === img.public_id ? (
                      // Step 2: Show confirm/cancel buttons
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleDelete(img.public_id)}
                          disabled={deleting === img.public_id}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "13px",
                          }}
                        >
                          {deleting === img.public_id ? "⏳ Deleting..." : "✅ Yes, Delete"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#f0f0f0",
                            color: "#555",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "13px",
                          }}
                        >
                          ✖ Cancel
                        </button>
                      </div>
                    ) : (
                      // Step 1: Show delete button
                      <button
                        onClick={() => setConfirmDelete(img.public_id)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "#fee2e2",
                          color: "#dc2626",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: "14px",
                        }}
                      >
                        🗑️ Delete Photo
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
