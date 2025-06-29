import { CakeType, NewCakeTypeRequest } from "@/types";

export function FromModelToNewRequestDTO(ct: CakeType): NewCakeTypeRequest {
  return { name: ct.name, description: ct.description, color: ct.color };
}
