import { Role } from '@/generated/prisma/client.js';

// Filter in fields of record needed to update
export const filterFields = (body: any, allowed: string[]) => {
  return Object.fromEntries(
    Object.entries(body).filter(
      ([key, value]) => allowed.includes(key) && value !== undefined,
    ),
  );
};

// Pick out allowed update fields of record
export const pickAllowedFields = (role: string, body: any) => {
  const bodyKeys = Object.keys(body);

  if (role === Role.ADMIN) {
    // Admin can update these fields
    const allowed = ['title', 'description', 'status', 'assignedToId'];

    return {
      allowedData: filterFields(body, allowed),
      forbiddenFields: bodyKeys.filter((key) => !allowed.includes(key)),
    };
  }

  // Staff can ONLY update status
  const allowed = ['status'];

  return {
    allowedData: filterFields(body, allowed),
    forbiddenFields: bodyKeys.filter((key) => !allowed.includes(key)),
  };
};
