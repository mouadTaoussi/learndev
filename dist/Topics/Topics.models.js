"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectIdeaModel = exports.ArticleModel = exports.CourseModel = exports.DocsModel = exports.TopicModel = void 0;
const mongoose_1 = require("mongoose");
const TopicSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    creator_name: {
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
    creator_name: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    docs_title: {
        type: String, required: true
    },
    level: {
        type: String, required: true
    },
    docs_link: {
        type: String, required: true
    },
    upvotes_count: {
        type: Number, default: 0, required: false
    },
    upvotes: [{ type: String }],
});
const CourseSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    creator_name: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    course_title: {
        type: String, required: true
    },
    level: {
        type: String, required: true
    },
    course_link: {
        type: String, required: true
    },
    upvotes_count: {
        type: Number, default: 0, required: false
    },
    upvotes: [{ type: String }],
});
const ArticleSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    creator_name: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    article_title: {
        type: String, required: true
    },
    level: {
        type: String, required: true
    },
    article_link: {
        type: String, required: true
    },
    upvotes_count: {
        type: Number, default: 0, required: false
    },
    upvotes: [{ type: String }],
});
const ProjectIdeaSchema = new mongoose_1.Schema({
    user_id: {
        type: String, required: true
    },
    creator_name: {
        type: String, required: true
    },
    topic_id: {
        type: String, required: true
    },
    project_idea_title: {
        type: String, required: true
    },
    level: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    upvotes_count: {
        type: Number, default: 0, required: false
    },
    upvotes: [{ type: String }],
});
const TopicModel = mongoose_1.model('topics', TopicSchema);
exports.TopicModel = TopicModel;
const DocsModel = mongoose_1.model('docs', DocsSchema);
exports.DocsModel = DocsModel;
const CourseModel = mongoose_1.model('courses', CourseSchema);
exports.CourseModel = CourseModel;
const ArticleModel = mongoose_1.model('articles', ArticleSchema);
exports.ArticleModel = ArticleModel;
const ProjectIdeaModel = mongoose_1.model('projectideas', ProjectIdeaSchema);
exports.ProjectIdeaModel = ProjectIdeaModel;
