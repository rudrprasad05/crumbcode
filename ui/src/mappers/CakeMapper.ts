import { Cake, CakeType, NewCakeRequest, NewCakeTypeRequest } from "@/types";

export function FromModelToNewRequestDTO(cake: Cake): NewCakeRequest {
  return {
    name: cake.name,
    description: cake.description,
    type: cake.type,
    isAvailable: cake.isAvailable,
    price: cake.price,
    mediaId: cake.media?.id,
    cakeTypeId: cake.cakeTypeId,
  };
}
