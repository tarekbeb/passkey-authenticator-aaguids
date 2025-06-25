import {
  findAuthenticatorById,
  getAuthenticator,
  getAuthenticatorId,
  getAuthenticatorName,
} from './index'

import { authenticatorNamesList } from './authenticator-names'
import { base64UrlToBase64, base64ToUint8Array, getAaguid, extractAaguid } from './lib';

const authenticatorDataBase64Url =
  "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFBUCgIutOmnd-P3TTsakYoMM292opQECAyYgASFYIGTgM0IiDgO9AqTMSMT1Tdh1sHiL99qEZJ4cdk8vJAyDIlggolBgLLxO9I2q9GuYsa8kBThr8-iXpiO4mL2z_73-Th4";

describe("base64UrlToBase64", () => {
  it("should convert Base64URL to Base64", () => {
    const expectedBase64 = "SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFBUCgIutOmnd+P3TTsakYoMM292opQECAyYgASFYIGTgM0IiDgO9AqTMSMT1Tdh1sHiL99qEZJ4cdk8vJAyDIlggolBgLLxO9I2q9GuYsa8kBThr8+iXpiO4mL2z/73+Th4=";
    expect(base64UrlToBase64(authenticatorDataBase64Url)).toBe(expectedBase64);
  });
});

describe("base64ToUint8Array", () => {
  it("should convert Base64 to Uint8Array", () => {
    const base64 = "SGVsbG8=";
    const expectedArray = new Uint8Array([72, 101, 108, 108, 111]);
    expect(base64ToUint8Array(base64)).toEqual(expectedArray);
  });

  it("should throw an error for invalid Base64", () => {
    expect(() => base64ToUint8Array("invalid_base64")).toThrow(
      "Invalid Base64 string for decoding."
    );
  });
});

describe("getAaguid", () => {
  it("should format a 16-byte Uint8Array as a UUID", () => {
    const bytes = new Uint8Array([
      0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67,
      0x89, 0xab, 0xcd, 0xef,
    ]);
    const expectedUuid = "12345678-90ab-cdef-0123-456789abcdef";
    expect(getAaguid(bytes)).toBe(expectedUuid);
  });
});

describe("extractAaguid", () => {
  it("should extract AAGUID from valid authenticatorData", () => {
    const aaguid = extractAaguid(authenticatorDataBase64Url);
    const formattedId = getAaguid(aaguid);

    expect(formattedId).toEqual("fbfc3007-154e-4ecc-8c0b-6e020557d7bd");
  });

  it("should throw an error for invalid authenticatorData", () => {
    expect(() => extractAaguid("invalid_data")).toThrow(
      "AuthenticatorData is too short to contain flags."
    );
  });

  it("should extract AAGUID from valid authenticatorData and find the authenticator", () => {
    const aaguidBytesAuth = extractAaguid(authenticatorDataBase64Url);
    const authenticatorId = getAaguid(aaguidBytesAuth);

    const foundAuthenticator = authenticatorNamesList.find(
      (authenticator) => authenticator.id === authenticatorId
    );

    expect(foundAuthenticator).toEqual({
      id: "fbfc3007-154e-4ecc-8c0b-6e020557d7bd",
      name: "iCloud Keychain",
    });
  });
});

describe("findAuthenticatorById", () => {
  it("should find an authenticator by its ID", () => {
    const foundAuthenticator = findAuthenticatorById({ authenticatorId: "fbfc3007-154e-4ecc-8c0b-6e020557d7bd" });

    expect(foundAuthenticator).toEqual({
      id: "fbfc3007-154e-4ecc-8c0b-6e020557d7bd",
      name: "iCloud Keychain",
    });
  });

  it("should return undefined for an unknown ID", () => {
    const authenticatorId = "unknown-id";
    const foundAuthenticator = findAuthenticatorById({ authenticatorId });

    expect(foundAuthenticator).toBeUndefined();
  });
});

describe("getAuthenticator", () => {
  it("should return the authenticator object for valid authenticatorData", () => {
    const authenticator = getAuthenticator({ authenticatorData: authenticatorDataBase64Url });

    expect(authenticator).toEqual({
      id: "fbfc3007-154e-4ecc-8c0b-6e020557d7bd",
      name: "iCloud Keychain",
    });
  });

  it("should return undefined for invalid authenticatorData", () => {
    expect(() => getAuthenticator({ authenticatorData: "invalid_data" })).toThrow(
      "AuthenticatorData is too short to contain flags."
    );
  });
});

describe("getAuthenticatorName", () => {
  it("should return the name of the authenticator for valid authenticatorData", () => {
    const authenticatorName = getAuthenticatorName({ authenticatorData: authenticatorDataBase64Url });

    expect(authenticatorName).toBe("iCloud Keychain");
  });

  it("should return undefined for invalid authenticatorData", () => {
    expect(() => getAuthenticatorName({ authenticatorData: "invalid_data" })).toThrow(
      "AuthenticatorData is too short to contain flags."
    );
  });
});

describe("getAuthenticatorId", () => {
  it("should return the ID of the authenticator for valid authenticatorData", () => {
    const authenticatorId = getAuthenticatorId({ authenticatorData: authenticatorDataBase64Url });

    expect(authenticatorId).toBe("fbfc3007-154e-4ecc-8c0b-6e020557d7bd");
  });

  it("should return undefined for invalid authenticatorData", () => {
    expect(() => getAuthenticatorId({ authenticatorData: "invalid_data" })).toThrow(
      "AuthenticatorData is too short to contain flags."
    );
  });
});
