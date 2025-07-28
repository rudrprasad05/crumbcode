type ParsedSocialLink =
  | { platform: "tiktok"; username: string; videoId?: string }
  | { platform: "pinterest"; username: string; postId?: string }
  | { platform: "instagram"; username: string; postId?: string }
  | { platform: "facebook"; username: string; postId?: string }
  | {
      platform: "youtube";
      channelId?: string;
      username?: string;
      videoId?: string;
    }
  | { platform: "unknown"; username?: string };

export function parseSocialLink(url: string): ParsedSocialLink {
  try {
    const parsed = new URL(url);

    // Normalize
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    // === TikTok ===
    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) {
      const match = parsed.pathname.match(/@([^/]+)(?:\/video\/(\d+))?/);
      if (match) {
        const [, username, videoId] = match;
        return { platform: "tiktok", username, videoId };
      }
    }

    // === Instagram ===
    if (host === "instagram.com" || host.endsWith(".instagram.com")) {
      const match = parsed.pathname.match(
        /^\/@?([^/?]+)(?:\/(reel|p|tv)\/([a-zA-Z0-9_-]+))?/
      );
      if (match) {
        const [, username, , postId] = match;
        return { platform: "instagram", username, postId };
      }
    }

    if (host === "facebook.com" || host.endsWith(".facebook.com")) {
      const match = parsed.pathname.match(/^\/([^/?]+)/);
      if (match) {
        const [_, username] = match;
        return { platform: "facebook", username };
      }
    }

    if (host === "pinterest.com" || host.endsWith(".pinterest.com")) {
      const match = parsed.pathname.match(/^\/([^\/]+)\/?$/);
      if (match) {
        const [, username, , postId] = match;
        return { platform: "pinterest", username, postId };
      }
      return { platform: "pinterest", username: "invalid" };
    }

    // === YouTube ===
    if (host === "youtube.com" || host === "youtu.be") {
      if (host === "youtu.be") {
        // youtu.be short link
        const videoId = parsed.pathname.split("/")[1];
        return { platform: "youtube", videoId };
      }

      const path = parsed.pathname;

      if (path.startsWith("/watch")) {
        const videoId = parsed.searchParams.get("v") || undefined;
        return { platform: "youtube", videoId };
      }

      if (path.startsWith("/channel/")) {
        const channelId = path.split("/")[2];
        return { platform: "youtube", channelId };
      }

      if (
        path.startsWith("/c/") ||
        path.startsWith("/user/") ||
        path.startsWith("/@")
      ) {
        const username =
          path.split("/")[2] || path.split("/")[1]?.replace("@", "");
        return { platform: "youtube", username };
      }
    }

    return { platform: "unknown" };
  } catch {
    return { platform: "unknown" };
  }
}
