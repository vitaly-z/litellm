import { describe, expect, it } from "vitest";
import { ptuCountRules } from "./ptuValidation";

const validate = (value: unknown) => ptuCountRules[0].validator(null, value);

describe("ptuCountRules", () => {
  it("accepts positive whole numbers and empty values", async () => {
    await expect(validate(5)).resolves.toBeUndefined();
    await expect(validate("15")).resolves.toBeUndefined();
    await expect(validate("")).resolves.toBeUndefined();
    await expect(validate(null)).resolves.toBeUndefined();
    await expect(validate(undefined)).resolves.toBeUndefined();
  });

  it("rejects fractional values that the backend integer contract would refuse", async () => {
    await expect(validate(2.5)).rejects.toThrow("positive whole number");
    await expect(validate("1.25")).rejects.toThrow("positive whole number");
  });

  it("rejects zero and negatives, which the backend rejects as a non-positive ptu_count", async () => {
    await expect(validate(0)).rejects.toThrow("positive whole number");
    await expect(validate(-1)).rejects.toThrow("positive whole number");
    await expect(validate("-3")).rejects.toThrow("positive whole number");
  });

  it("rejects a value that is not a number at all", async () => {
    await expect(validate("abc")).rejects.toThrow("positive whole number");
  });
});
