import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://root:9939357285@cluster0.5ah66bf.mongodb.net/todo-nextapp?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog database connection is successfull"))
    .catch((error) => console.log(error));
};



export default connectToDB;