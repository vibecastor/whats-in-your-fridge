function validateBase64(base64: string): boolean {
  return base64.match(/data:image\/[a-zA-Z]*;base64,[\S]*/) !== null;
}

export default validateBase64;