 export type TIngredient = {
    _id: string;
    name: string;
    price: number;
    image: string;
    uniqueId: string;
    type?: string;
  }

  export interface IIngredientCardProps {
    ingredient: TIngredient;
    count: number;
    index: number;
  }

  export interface IIngredientsData extends TIngredient {
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image_large: string;
    image_mobile: string;
    __v?: number;
    count: number;
  }
  


  