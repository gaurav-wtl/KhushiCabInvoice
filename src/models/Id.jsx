import mongoose, { Document, Schema } from 'mongoose';

// Define the schema
const idSchema = new Schema({
    id: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

if (mongoose.models.ID) {
    delete mongoose.models.ID; // Force Mongoose to re-compile the model
}

const ID = mongoose.model('ID', idSchema);

export default ID;
