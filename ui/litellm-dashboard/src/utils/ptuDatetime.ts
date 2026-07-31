import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const WALL_CLOCK_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const ptuPickerToUtcIso = (value: Dayjs | null | undefined): string | null => {
  if (!value || typeof value.format !== "function") {
    return null;
  }
  return dayjs.utc(value.format(WALL_CLOCK_FORMAT)).toISOString();
};

export const utcIsoToPickerValue = (iso: string | null | undefined): Dayjs | null => {
  if (!iso) {
    return null;
  }
  return dayjs(dayjs.utc(iso).format(WALL_CLOCK_FORMAT));
};
