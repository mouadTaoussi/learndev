import { Schema, model } from 'mongoose';

const TopicSchema = new Schema({

});

const TopicModel = model('topics',TopicSchema);

export { TopicModel };