interface ValidatorRule {
  validator: (rule: unknown, value: unknown) => Promise<void>;
}

const isPositiveWholeNumber = (value: unknown): boolean => {
  if (value === undefined || value === null || value === "") {
    return true;
  }
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

/** Mirrors the backend contract, which rejects a ptu_count that is not a positive integer. */
export const ptuCountRules: ValidatorRule[] = [
  {
    validator: (_, value) =>
      isPositiveWholeNumber(value)
        ? Promise.resolve()
        : Promise.reject(new Error("PTU Count must be a positive whole number")),
  },
];
