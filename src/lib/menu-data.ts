import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

export type Category = "Breakfast" | "Lunch" | "Dinner" | "Desserts" | "Beverages";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export const categories: Category[] = ["Breakfast", "Lunch", "Dinner", "Desserts", "Beverages"];

export const menuItems: MenuItem[] = [
  { id: 1, name: "Tropical Sunrise Bowl", description: "Coconut yogurt, papaya, mango, toasted cashews & forest honey.", price: 1800, category: "Breakfast", image: dish3 },
  { id: 2, name: "Habarana Egg Hoppers", description: "Crisp coconut milk hoppers with farm egg, lunu miris & seeni sambol.", price: 1600, category: "Breakfast", image: dish1 },
  { id: 3, name: "Village Kola Kanda", description: "Traditional herbal rice porridge with jaggery and grated coconut.", price: 1200, category: "Breakfast", image: dish3 },

  { id: 4, name: "Jungle Rice & Curry", description: "Seven-curry tasting plate with red rice, papadam and coconut sambol.", price: 3200, category: "Lunch", image: dish1 },
  { id: 5, name: "Grilled Lagoon Prawns", description: "Tamarind glaze, charred lime, fragrant pandan rice.", price: 4400, category: "Lunch", image: dish2 },
  { id: 6, name: "Garden Polos Pulao", description: "Slow-cooked young jackfruit pulao with cashews & curry leaf oil.", price: 2600, category: "Lunch", image: dish1 },

  { id: 7, name: "Cinnamon Smoked Pork Belly", description: "Ceylon cinnamon glaze, kithul molasses, charred greens.", price: 4800, category: "Dinner", image: dish2 },
  { id: 8, name: "Wild Fern & Lentil Curry", description: "Niwithi mallum, dhal & roasted coconut sambol with red rice.", price: 2900, category: "Dinner", image: dish1 },
  { id: 9, name: "Catch of the Day", description: "Pan seared seer fish, coconut velouté, seasonal jungle greens.", price: 5200, category: "Dinner", image: dish2 },

  { id: 10, name: "Watalappan", description: "Steamed jaggery & coconut custard, toasted cashew lace.", price: 1400, category: "Desserts", image: dish3 },
  { id: 11, name: "King Coconut Sorbet", description: "Habarana king coconut, lime zest, edible flower.", price: 1200, category: "Desserts", image: dish3 },
  { id: 12, name: "Mango & Treacle Pavlova", description: "Crisp meringue, kithul cream, ripe Karthakolomban mango.", price: 1500, category: "Desserts", image: dish3 },

  { id: 13, name: "Ceylon High Tea", description: "Single-estate black tea poured tableside.", price: 700, category: "Beverages", image: dish3 },
  { id: 14, name: "Jungle Spice Cooler", description: "Ginger, lemongrass, lime, sparkling soda.", price: 950, category: "Beverages", image: dish3 },
  { id: 15, name: "King Coconut Fresh", description: "Chilled, straight from the husk.", price: 600, category: "Beverages", image: dish3 },
];
