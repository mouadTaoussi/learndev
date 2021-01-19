"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = void 0;
const mongoose_1 = require("mongoose");
const TopicSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    topic_title: {
        type: String, required: true
    },
    background_image: {
        type: String, required: true
    },
});
const DocsSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    link: {
        type: String, required: true
    },
});
const CourseSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    link: {
        type: String, required: true
    },
});
const ArticleSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    link: {
        type: String, required: true
    },
});
const ProjectIdeaSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    }
});
const TopicModel = mongoose_1.model('topics', TopicSchema);
exports.TopicModel = TopicModel;
const DocsModel = mongoose_1.model('docs', DocsSchema);
const CourseModel = mongoose_1.model('courses', CourseSchema);
const ArticleModel = mongoose_1.model('articles', ArticleSchema);
const ProjectIdeaModel = mongoose_1.model('projectideas', ProjectIdeaSchema);
