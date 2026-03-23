import { BadRequestException } from "@nestjs/common";

type ResolveDeviceIdInput = {
  header?: string;
  query?: string;
  body?: string;
};

export function resolveDeviceId({ header, query, body }: ResolveDeviceIdInput): string {
  const deviceId = header || query || body;
  if (!deviceId || typeof deviceId !== "string") {
    throw new BadRequestException("deviceId is required");
  }
  return deviceId;
}
