export function getExtensionFromBlob(blob: Blob) {
  const type = blob.type;
  switch (type) {
    // Images
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/gif":
      return ".gif";
    case "image/bmp":
      return ".bmp";
    case "image/webp":
      return ".webp";
    // Videos
    case "video/mp4":
      return ".mp4";
    case "video/quicktime":
      return ".mov";
    case "video/x-msvideo":
      return ".avi";
    case "video/x-ms-wmv":
      return ".wmv";
    case "video/webm":
      return ".webm";
    // Add more cases as needed
    default:
      return null; // or throw an error if you prefer
  }
}
