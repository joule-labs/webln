// Workaround for code completion to account for values this library doesn't know about yet.
// This allows TypeScript to understand that AdditionalString is a string that is distinct from the string literal type.
export type AdditionalString = string & { _additionalString?: never };
