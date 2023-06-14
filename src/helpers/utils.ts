export function getId() {
  return Math.floor(Math.random() * 999).toString();
}

export function toBuffer(str: string) {
  return Buffer.from(str);
}
