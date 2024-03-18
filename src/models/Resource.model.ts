import { model, Schema } from "mongoose";

export interface IResource {
  name: string; // Gold Mine, Coal Mine, Bank, Coal Storage, House
  type_id?: number; // gold = 0, coal = 1, diamonds = 2,
  information?: string;
  amount_type: string; // gold, coal, diamonds
  amount: number;
}

const resourceSchema = new Schema<IResource>(
  {
    name: { type: String, required: true },
    type_id: { type: Number, required: false },
    information: { type: String, required: false },
    amount_type: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Resource = model<IResource>("Resource", resourceSchema);

// Function to insert default data if the collection is empty
export const insertDefaultResourceData = async () => {
  try {
    const defaultData: IResource[] = [
      { name: "Gold Mine", type_id: 0, amount_type: "coal", amount: 150 },
      { name: "Coal Mine", type_id: 1, amount_type: "gold", amount: 300 },
      { name: "Bank", type_id: 2, amount_type: "coal", amount: 150 },
      { name: "Coal Storage", type_id: 3, amount_type: "gold", amount: 300 },
      { name: "House", type_id: 4, amount_type: "diamonds", amount: 500 },
      // Add more default data as needed
    ];

    for (const data of defaultData) {
      const existingData = await Resource.findOneAndUpdate(
        { name: data.name },
        data,
        { upsert: true, new: true }
      );
    }

    console.log("Resource Default data inserted successfully.");
  } catch (error) {
    console.error("Error inserting default data:", error);
  }
};

export default Resource;
