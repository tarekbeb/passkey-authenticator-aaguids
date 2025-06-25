import { atob } from "js-base64";

import { authenticatorNamesList } from "./authenticator-names";
import { extractAaguid, getAaguid } from "./lib";

export function findAuthenticatorById({ authenticatorId }: { authenticatorId: string }) {
  const foundAuthenticator = authenticatorNamesList.find(
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

export * from "./authenticator-names";
