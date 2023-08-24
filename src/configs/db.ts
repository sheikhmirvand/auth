import mongoose from "mongoose";
import colors from "colors";

const conndb = async () => {
    const dbUri: string = process.env.MONGO_URI || "";
    try {
        await mongoose.connect(dbUri);
        console.log(colors.bgCyan("db connected"));
    } catch (error) {
        if (error instanceof Error) {
            console.log(colors.bgRed(error.message));
        }
    }
};

export default conndb;
