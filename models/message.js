const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    from: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    to: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

MessageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);