"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Topics_models_1 = require("./Topics.models");
class TopicService {
    async searchTopic(query) {
        try {
            const topic = await Topics_models_1.TopicModel;
            return {
                message: null,
                found: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                found: false,
                data: null
            };
        }
    }
    async searchContentInTopic(query, topic_id, user_id) {
        try {
            const topic = await Topics_models_1.TopicModel;
            return {
                message: null,
                found: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                found: false,
                data: null
            };
        }
    }
    async getTopic(item_id, user_id) {
        try {
            const topic = await Topics_models_1.TopicModel.findById(item_id);
            return {
                message: null,
                found: false,
                data: topic
            };
        }
        catch (err) {
            return {
                message: null,
                found: false,
                data: null
            };
        }
    }
    async getTopics(limit, skip) {
        try {
            const topics = await Topics_models_1.TopicModel.find().skip(skip).limit(limit).exec();
            return {
                message: null,
                found: false,
                data: topics
            };
        }
        catch (err) {
            return {
                message: null,
                found: false,
                data: null
            };
        }
    }
    async addTopic(topic) {
        try {
            const addtopic = new Topics_models_1.TopicModel(topic);
            await addtopic.save();
            return {
                message: null,
                added: false,
                data: addtopic
            };
        }
        catch (err) {
            return {
                message: null,
                added: false,
                data: null
            };
        }
    }
    async deleteTopic(item_id) {
        try {
            const deletetopic = await Topics_models_1.TopicModel.findById(item_id).remove();
            const deletingDocs = await Topics_models_1.DocsModel.deleteMany({ topic_id: item_id });
            const deletingCourses = await Topics_models_1.CourseModel.deleteMany({ topic_id: item_id });
            const deletingArticles = await Topics_models_1.ArticleModel.deleteMany({ topic_id: item_id });
            const deletingProjectIdeas = await Topics_models_1.ProjectIdeaModel.deleteMany({ topic_id: item_id });
            return {
                message: null, deleted: false, data: null
            };
        }
        catch (err) {
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
    }
    async addDocs(docs) {
        try {
            const adddocs = new Topics_models_1.DocsModel(docs);
            await adddocs.save();
            return {
                message: null,
                added: false,
                data: adddocs
            };
        }
        catch (err) {
            return {
                message: null,
                added: false,
                data: null
            };
        }
    }
    async deleteDocs(item_id) {
        try {
            const deletedocs = await Topics_models_1.DocsModel.findById(item_id).remove();
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
    }
    async addCourse(course) {
        try {
            const addcourse = new Topics_models_1.CourseModel(course);
            await addcourse.save();
            return {
                message: null,
                added: false,
                data: addcourse
            };
        }
        catch (err) {
            return {
                message: null,
                added: false,
                data: null
            };
        }
    }
    async deleteCourse(item_id) {
        try {
            const deletecourse = await Topics_models_1.CourseModel.findById(item_id).remove();
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
    }
    async addArticle(article) {
        try {
            const addarticle = new Topics_models_1.ArticleModel(article);
            await addarticle.save();
            return {
                message: null,
                added: false,
                data: addarticle
            };
        }
        catch (err) {
            return {
                message: null,
                added: false,
                data: null
            };
        }
    }
    async deleteArticle(item_id) {
        try {
            const deletearticle = await Topics_models_1.ArticleModel.findById(item_id).remove();
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
    }
    async addProjectIdea(projectIdea) {
        try {
            const addprojectidea = new Topics_models_1.ProjectIdeaModel(projectIdea);
            await addprojectidea.save();
            return {
                message: null,
                added: false,
                data: addprojectidea
            };
        }
        catch (err) {
            return {
                message: null,
                added: false,
                data: null
            };
        }
    }
    async deleteProjectIdea(item_id) {
        try {
            const deleteprojectidea = await Topics_models_1.ProjectIdeaModel.findById(item_id).remove();
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
        catch (err) {
            return {
                message: null,
                deleted: false,
                data: null
            };
        }
    }
    async upvote(user_id, type, resource_id) {
        return false;
    }
}
exports.default = TopicService;
