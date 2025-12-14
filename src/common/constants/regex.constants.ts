// 1. email cannot start with !?.
// 2. email contains only letters and numbers
// 3. domain contains only letters, numbers and dashes
// 4. top-level domain pattern
export const EMAIL_REGEX: RegExp = /^(?!\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/