import * as authenticatorsList from "./authenticator-names.json";
/**
 * Converts a Base64URL string to a standard Base64 string.
 * @param {string} base64url - The Base64URL encoded string.
 * @returns {string} The standard Base64 encoded string.
 */
export function base64UrlToBase64(base64url: string) {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if necessary
  const padding = base64.length % 4;
  if (padding === 2) {
    base64 += "==";
  } else if (padding === 3) {
    base64 += "=";
  }
  return base64;
}

/**
 * Converts a standard Base64 string to a Uint8Array.
 * @param {string} base64 - The standard Base64 encoded string.
 * @returns {Uint8Array} The decoded data as a Uint8Array.
 */
export function base64ToUint8Array(base64: string) {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) {
    console.error("Failed to decode Base64 string:", e);
    throw new Error("Invalid Base64 string for decoding.");
  }
}

/**
 * Formats a 16-byte Uint8Array (like an AAGUID) into a standard UUID string.
 * @param {Uint8Array} aaguid - The 16 bytes representing the AAGUID.
 * @returns {string} The formatted UUID string.
 */
export function getAaguid(aaguid: Uint8Array): string {
  if (aaguid.length !== 16) {
    throw new Error("AAGUID must be 16 bytes.");
  }
  // Format as UUID: 8-4-4-4-12
  return [
    [...aaguid.slice(0, 4)].map((b) => b.toString(16).padStart(2, "0")).join(""),
    [...aaguid.slice(4, 6)].map((b) => b.toString(16).padStart(2, "0")).join(""),
    [...aaguid.slice(6, 8)].map((b) => b.toString(16).padStart(2, "0")).join(""),
    [...aaguid.slice(8, 10)].map((b) => b.toString(16).padStart(2, "0")).join(""),
    [...aaguid.slice(10, 16)].map((b) => b.toString(16).padStart(2, "0")).join(""),
  ].join("-");
}

/**
 * Extracts the AAGUID from Base64URL encoded WebAuthn authenticatorData.
 * @param {string} authenticatorDataBase64Url - The Base64URL encoded authenticatorData.
 * @returns {Uint8Array} The AAGUID as a Uint8Array.
 */
export function extractAaguid(authenticatorDataBase64Url: string): Uint8Array {
  const authenticatorData = base64ToUint8Array(base64UrlToBase64(authenticatorDataBase64Url));
  if (authenticatorData.length < 37) {
    throw new Error("AuthenticatorData is too short to contain flags.");
  }
  // Extract the AAGUID (16 bytes starting at byte 37)
  return authenticatorData.slice(37, 53);
}

export function findAuthenticatorById({ authenticatorId }: { authenticatorId: string }) {
  const foundAuthenticator = authenticatorsList.find(
    (authenticator) => authenticator.id === authenticatorId
  );

  return foundAuthenticator;
}

export function getAuthenticator({ authenticatorData }: { authenticatorData: string }) {
  const aaguidBytesAuth = extractAaguid(authenticatorData);
  const authenticatorId = getAaguid(aaguidBytesAuth);

  return findAuthenticatorById({ authenticatorId });
}

export function getAuthenticatorName({ authenticatorData }: { authenticatorData: string }) {
  const aaguidBytesAuth = extractAaguid(authenticatorData);
  const authenticatorId = getAaguid(aaguidBytesAuth);

  return findAuthenticatorById({ authenticatorId })?.name;
}

export function getAuthenticatorId({ authenticatorData }: { authenticatorData: string }) {
  const aaguidBytesAuth = extractAaguid(authenticatorData);
  const authenticatorId = getAaguid(aaguidBytesAuth);

  return findAuthenticatorById({ authenticatorId })?.id;
}
