# Passkey Authenticator Name Finder

[![npm version](https://badge.fury.io/js/passkey-authenticator-aaguids.svg)](https://badge.fury.io/js/passkey-authenticator-aaguids)

This package provides a simple utility function to look up the likely human-readable name of a passkey provider (authenticator) given its AAGUID (Authenticator Attestation Globally Unique Identifier).

It uses the community-driven JSON list of known AAGUIDs maintained by passkeydeveloper at:
[https://github.com/passkeydeveloper/passkey-authenticator-aaguids](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

## Purpose

The primary goal of this package, mirroring the source repository's intent, is to assist developers in displaying **user-friendly names** for passkeys in end-user management interfaces, such as account settings or security dashboards. Instead of showing a raw AAGUID like `e9b8987b-8036-49f7-b41c-df75f5447b91`, you can display a more recognizable name like "iCloud Keychain".

## Important Disclaimer

This package directly utilizes the data and inherits the disclaimer from the `passkeydeveloper/passkey-authenticator-aaguids` repository:

> **This is a community-driven list of known passkey provider AAGUIDs to assist with naming passkeys in end user passkey management interfaces (e.g. account settings). It is not intended to be used for any other purpose and could go away at any time.**

**Therefore, you MUST NOT use the output of this package for any security-related decisions.** The mapping is purely for display convenience and relies on potentially incomplete, inaccurate, or changing community-contributed data.

## Installation

```bash
npm install your-package-name
