"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Topics_models_1 = require("./Topics.models");
class TopicService {
    async searchTopic(query, limit, skip) {
        try {
            const topics = await Topics_models_1.TopicModel.find().skip(skip).limit(limit);
            let topics_needed = [];
            for (var i = 0; topics.length > i; i++) {
                for (var io = 0; query.length > io; io++) {
                    if (topics[i].topic_title.includes(query[io])) {
                        topics_needed.push(topics[i]);
                    }
                }
            }
            for (var i = 0; topics_needed.length > i; i++) {
                console.log(topics_needed[i]._id == topics_needed[i + 1]._id);
                const next = i + 1;
                if (topics_needed[i]._id == topics_needed[next]._id) {
                    topics_needed.splice(next, 1);
                }
            }
            if (topics_needed.length > 0) {
                return {
                    message: null,
                    found: true,
                    data: topics_needed
                };
            }
            else {
                return {
                    message: "No content :-(",
                    found: false,
                    data: null
                };
            }
        }
        catch (err) {
            return {
                message: null,
                found: false,
                data: null
            };
        }
    }
    async searchContentInTopic(query, topic_id, user_id, limit, skip) {
        try {
            const docs = await Topics_models_1.DocsModel.find().skip(skip).limit(limit);
            const courses = await Topics_models_1.CourseModel.find().skip(skip).limit(limit);
            const articles = await Topics_models_1.ArticleModel.find().skip(skip).limit(limit);
            const projectIdeas = await Topics_models_1.ProjectIdeaModel.find().skip(skip).limit(limit);
            if (user_id !== null) {
            }
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
    async getTopic(item_id, user_id, limit, skip) {
        try {
            const topic = await Topics_models_1.TopicModel.findById(item_id);
            const docs = await Topics_models_1.DocsModel.find().skip(skip).limit(limit);
            const courses = await Topics_models_1.CourseModel.find().skip(skip).limit(limit);
            const articles = await Topics_models_1.ArticleModel.find().skip(skip).limit(limit);
            const projectIdeas = await Topics_models_1.ProjectIdeaModel.find().skip(skip).limit(limit);
            if (user_id !== null) {
            }
            return {
                message: null,
                found: false,
                data: {
                    _id: topic._id,
                    user_id: topic.user_id,
                    creator_name: topic.creator_name,
                    topic_title: topic.topic_title,
                    background_image: topic.background_image
                }
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
