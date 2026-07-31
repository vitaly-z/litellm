import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { ptuPickerToUtcIso, utcIsoToPickerValue } from "./ptuDatetime";

describe("ptuDatetime", () => {
  it("stores the picked wall-clock time as UTC instead of shifting across zones", () => {
    const picked = dayjs("2024-03-10T23:00:00");
    expect(ptuPickerToUtcIso(picked)).toBe("2024-03-10T23:00:00.000Z");
  });

  it("returns null for empty picker values", () => {
    expect(ptuPickerToUtcIso(null)).toBeNull();
    expect(ptuPickerToUtcIso(undefined)).toBeNull();
  });

  it("round-trips a UTC ISO string back to the same wall-clock in the picker", () => {
    const value = utcIsoToPickerValue("2024-03-10T23:00:00.000Z");
    expect(value).not.toBeNull();
    expect(value!.format("YYYY-MM-DDTHH:mm:ss")).toBe("2024-03-10T23:00:00");
    expect(ptuPickerToUtcIso(value)).toBe("2024-03-10T23:00:00.000Z");
  });

  it("returns null for empty ISO strings", () => {
    expect(utcIsoToPickerValue(null)).toBeNull();
    expect(utcIsoToPickerValue(undefined)).toBeNull();
    expect(utcIsoToPickerValue("")).toBeNull();
  });
});
