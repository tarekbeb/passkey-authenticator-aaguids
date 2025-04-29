/**
 * Converts a Base64URL string to a standard Base64 string.
 * @param {string} base64url - The Base64URL encoded string.
 * @returns {string} The standard Base64 encoded string.
 */
function base64UrlToBase64(base64url) {
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
function base64ToUint8Array(base64) {
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
 * @param {Uint8Array} bytes - The 16 bytes representing the AAGUID.
 * @returns {string|null} The formatted UUID string, or null if input is invalid.
 */
function formatAaguid(bytes) {
  if (!bytes || bytes.length !== 16) {
    return null; // AAGUID must be 16 bytes
  }
  const hex = (byte) => byte.toString(16).padStart(2, "0");
  // UUID format: 8-4-4-4-12 hex digits
  return (
    `${hex(bytes[0])}${hex(bytes[1])}${hex(bytes[2])}${hex(bytes[3])}-` +
    `${hex(bytes[4])}${hex(bytes[5])}-` +
    `${hex(bytes[6])}${hex(bytes[7])}-` +
    `${hex(bytes[8])}${hex(bytes[9])}-` +
    `${hex(bytes[10])}${hex(bytes[11])}${hex(bytes[12])}${hex(bytes[13])}${hex(
      bytes[14]
    )}${hex(bytes[15])}`
  );
}

/**
 * Extracts the AAGUID from Base64URL encoded WebAuthn authenticatorData.
 * @param {string} authenticatorDataBase64Url - The Base64URL encoded authenticatorData.
 * @returns {Uint8Array | null} The AAGUID as a Uint8Array if present, otherwise null.
 */
function extractAaguid(authenticatorDataBase64Url) {
  if (
    !authenticatorDataBase64Url ||
    typeof authenticatorDataBase64Url !== "string"
  ) {
    console.error(
      "Invalid input: authenticatorData must be a non-empty string."
    );
    return null;
  }

  try {
    // 1. Convert Base64URL to Base64
    const base64 = base64UrlToBase64(authenticatorDataBase64Url);

    // 2. Decode Base64 to Uint8Array
    const authenticatorDataBytes = base64ToUint8Array(base64);

    // 3. Define offsets and lengths based on WebAuthn spec
    const RP_ID_HASH_LENGTH = 32;
    const FLAGS_LENGTH = 1;
    const SIGN_COUNT_LENGTH = 4;
    const AAGUID_LENGTH = 16;

    const flagsOffset = RP_ID_HASH_LENGTH; // Starts right after rpIdHash
    const signCountOffset = flagsOffset + FLAGS_LENGTH;
    const attestedDataOffset = signCountOffset + SIGN_COUNT_LENGTH; // Start of potential attested data
    const aaguidOffset = attestedDataOffset; // AAGUID is the first part of attested data

    // 4. Check minimum length required to read flags
    if (authenticatorDataBytes.length < flagsOffset + FLAGS_LENGTH) {
      console.warn("AuthenticatorData is too short to contain flags.");
      return null;
    }

    // 5. Read the flags byte
    const flagsByte = authenticatorDataBytes[flagsOffset];
    const AT_FLAG_MASK = 0x40; // Bit 6 (Attested credential data included)

    // 6. Check if the AT (Attested Credential Data) flag is set
    const isAtFlagSet = (flagsByte & AT_FLAG_MASK) !== 0;

    if (!isAtFlagSet) {
      // console.log("AT flag is not set. Attested Credential Data (including AAGUID) is not present.");
      return null; // AAGUID is only present if AT flag is set
    }

    // 7. Check if data is long enough to contain AAGUID
    const requiredLengthForAaguid = aaguidOffset + AAGUID_LENGTH;
    if (authenticatorDataBytes.length < requiredLengthForAaguid) {
      console.warn(
        `AuthenticatorData has AT flag set but is too short (${authenticatorDataBytes.length} bytes) to contain AAGUID (requires ${requiredLengthForAaguid} bytes).`
      );
      return null;
    }

    // 8. Extract the AAGUID bytes
    const aaguidBytes = authenticatorDataBytes.slice(
      aaguidOffset,
      aaguidOffset + AAGUID_LENGTH
    );

    return aaguidBytes;
  } catch (error) {
    console.error("Error extracting AAGUID:", error);
    return null;
  }
}


module.exports = {
  extractAaguid,
  formatAaguid,
  base64UrlToBase64,
  base64ToUint8Array,
};
