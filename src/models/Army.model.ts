import { model, Schema } from "mongoose";

export interface IArmy {
  name: string; // Fall In!, Barracks, Training Camp, Command Center, Hangar
  type_id?: number; // Fall In = 0, Barracks = 1, Training Camp = 2, Command Center = 3, Hangar = 4
  information?: string;
  amount_type: string; // gold, coal, diamonds
  amount: number;
}

const armySchema = new Schema<IArmy>(
  {
    name: { type: String, required: true },
    type_id: { type: Number, required: false },
    information: { type: String, required: false },
    amount_type: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Army = model<IArmy>("Army", armySchema);

// Function to insert default data if the collection is empty
export const insertDefaultArmyData = async () => {
  try {
    const defaultData: IArmy[] = [
      { name: "Fall In!", type_id: 0, amount_type: "coal", amount: 250 },
      { name: "Barracks", type_id: 1, amount_type: "coal", amount: 200 },
      { name: "Training Camp", type_id: 2, amount_type: "coal", amount: 25000 },
      {
        name: "Command Center",
        type_id: 3,
        amount_type: "diamonds",
        amount: 1,
      },
      { name: "Hangar", type_id: 4, amount_type: "gold", amount: 10000 },
      // Add more default data as needed
    ];

    for (const data of defaultData) {
      const existingData = await Army.findOneAndUpdate(
        { name: data.name },
        data,
        { upsert: true, new: true }
      );
    }

    console.log("Army Default data inserted successfully.");
  } catch (error) {
    console.error("Error inserting default data:", error);
  }
};

export default Army;
