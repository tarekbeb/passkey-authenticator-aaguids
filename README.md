# Passkey Authenticator Name Finder

[![npm version](https://badge.fury.io/js/passkey-authenticator-aaguids.svg)](https://badge.fury.io/js/passkey-authenticator-aaguids)
[![codecov](https://codecov.io/gh/tarekbeb/passkey-authenticator-aaguids/graph/badge.svg?token=7839BI81E0)](https://codecov.io/gh/tarekbeb/passkey-authenticator-aaguids)

This package provides a simple utility function to look up the likely human-readable name of a passkey provider (authenticator) given its AAGUID (Authenticator Attestation Globally Unique Identifier).

It uses the community-driven JSON list of known AAGUIDs maintained by passkeydeveloper at:
[https://github.com/passkeydeveloper/passkey-authenticator-aaguids](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

> **This is a community-driven list of known passkey provider AAGUIDs to assist with naming passkeys in end user passkey management interfaces (e.g. account settings). It is not intended to be used for any other purpose and could go away at any time.**

## Purpose

The primary goal of this package, mirroring the source repository's intent, is to assist developers in displaying **user-friendly names** for passkeys in end-user management interfaces, such as account settings or security dashboards. You can display a more recognizable name like "iCloud Keychain".


## Installation

```bash
npm install passkey-authenticator-aaguids
```

## How to use

```ts
import {  getAuthenticator } from 'passkey-authenticator-aaguids';

const exampleAuthenticatorData = "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFBUCgIutOmnd-P3TTsakYoMM292opQECAyYgASFYIGTgM0IiDgO9AqTMSMT1Tdh1sHiL99qEZJ4cdk8vJAyDIlggolBgLLxO9I2q9GuYsa8kBThr8-iXpiO4mL2z_73-Th4"

const authenticator = getAuthenticator({ authenticatorData: exampleAuthenticatorData});
console.log(authenticator) // { id: 'fbfc3007-154e-4ecc-8c0b-6e020557d7bd', name: 'iCloud Keychain' }
```
