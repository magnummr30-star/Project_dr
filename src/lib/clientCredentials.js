import { randomInt } from "node:crypto";

export function generateClientPassword() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const alphabet = `${letters}${digits}`;
  const characters = [
    letters[randomInt(letters.length)],
    digits[randomInt(digits.length)]
  ];

  for (let index = 0; index < 6; index += 1) {
    characters.push(alphabet[randomInt(alphabet.length)]);
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }

  return `GG${characters.join("")}`;
}

export function createClientCredentialsMessage(record, options = {}) {
  const phone = record.clientLoginPhone || record.phoneNormalized || record.phone;
  const intro = options.isRecovery
    ? "تم طلب استرجاع بيانات الدخول الخاصة بحسابكم."
    : "يسعدنا انضمامكم، تم إنشاء حساب جديد لمتابعة طلب الاستشارة الخاص بكم.";

  return [
    "مرحباً بكم في خبراء التطوير الصناعي والاستشارات الخضراء.",
    intro,
    "",
    "بيانات الدخول:",
    `رقم الهاتف: +${phone}`,
    `الرقم السري: ${record.clientPassword}`,
    "",
    "سيتم التواصل معكم خلال 24 ساعة."
  ].join("\n");
}
