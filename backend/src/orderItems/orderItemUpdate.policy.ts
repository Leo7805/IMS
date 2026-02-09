import { Role } from '@prisma/client';

export type UpdatableItemFields = {
  name?: string;
  quantity?: number;
  unitPrice?: string;
  notes?: string;
};

type PickAllowedFieldsResult = {
  allowedData: UpdatableItemFields;
  forbiddenFields: string[];
};

const filterBody = (
  allowed: string[],
  body: UpdatableItemFields,
): PickAllowedFieldsResult => {
  return {
    allowedData: Object.fromEntries(
      Object.entries(body ?? {}).filter(
        ([key, value]) => allowed.includes(key) && value !== undefined,
      ),
    ),
    forbiddenFields: Object.keys(body ?? {}).filter(
      (k) => !allowed.includes(k),
    ),
  };
};

export const pickAllowedFields = (
  role: Role,
  body: UpdatableItemFields,
): PickAllowedFieldsResult => {
  const staffAllowed = ['quantity', 'notes'];
  const adminAllowed = ['name', 'quantity', 'unitPrice', 'notes'];

  return role === Role.ADMIN
    ? filterBody(adminAllowed, body)
    : filterBody(staffAllowed, body);
};
