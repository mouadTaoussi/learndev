"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Topics_models_1 = require("./Topics.models");
const Topics_functions_1 = require("./Topics.functions");
class TopicService {
    async searchTopic(query, limit, skip) {
        try {
            const topics = await Topics_models_1.TopicModel.find().skip(skip).limit(limit);
            const topics_needed = Topics_functions_1.filterByQuery(topics, query);
            const topics_need_to_be_unduplicated = Topics_functions_1.removeDuplicates(topics_needed);
            const topics_to_be_sent = Topics_functions_1.sortByUpvotes(topics_need_to_be_unduplicated);
            if (topics_needed.length > 0) {
                return {
                    message: null,
                    found: true,
                    data: topics_to_be_sent
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
    async searchContentInTopic(query, topic_id, user_session, limit, skip) {
        try {
            const docs = await Topics_models_1.DocsModel.find().skip(skip).limit(limit);
            const courses = await Topics_models_1.CourseModel.find().skip(skip).limit(limit);
            const articles = await Topics_models_1.ArticleModel.find().skip(skip).limit(limit);
            const projectIdeas = await Topics_models_1.ProjectIdeaModel.find().skip(skip).limit(limit);
            const docs_needed = Topics_functions_1.filterByQuery(docs, query);
            const courses_needed = Topics_functions_1.filterByQuery(courses, query);
            const articles_needed = Topics_functions_1.filterByQuery(articles, query);
            const project_ideas_needed = Topics_functions_1.filterByQuery(projectIdeas, query);
            const docs_need_to_be_unduplicated = Topics_functions_1.removeDuplicates(docs_needed);
            const courses_need_to_be_unduplicated = Topics_functions_1.removeDuplicates(courses_needed);
            const articles_need_to_be_unduplicated = Topics_functions_1.removeDuplicates(articles_needed);
            const project_ideas_need_to_be_unduplicated = Topics_functions_1.removeDuplicates(project_ideas_needed);
            const docs_to_be_sent = Topics_functions_1.sortByUpvotes(docs_need_to_be_unduplicated);
            const courses_to_be_sent = Topics_functions_1.sortByUpvotes(courses_need_to_be_unduplicated);
            const articles_to_be_sent = Topics_functions_1.sortByUpvotes(articles_need_to_be_unduplicated);
            const project_ideas_to_be_sent = Topics_functions_1.sortByUpvotes(project_ideas_need_to_be_unduplicated);
            if (user_session !== null) {
                const user_id = user_session.user.id;
                for (var i = 0; docs_to_be_sent.length > i; i++) {
                    if (docs_to_be_sent[i].upvotes.includes(user_id)) {
                        docs_to_be_sent[i].upvoted = true;
                    }
                    else {
                        docs_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; courses_to_be_sent.length > i; i++) {
                    if (courses_to_be_sent[i].upvotes.includes(user_id)) {
                        courses_to_be_sent[i].upvoted = true;
                    }
                    else {
                        courses_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; articles_to_be_sent.length > i; i++) {
                    if (articles_to_be_sent[i].upvotes.includes(user_id)) {
                        articles_to_be_sent[i].upvoted = true;
                    }
                    else {
                        articles_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; project_ideas_to_be_sent.length > i; i++) {
                    if (project_ideas_to_be_sent[i].upvotes.includes(user_id)) {
                        project_ideas_to_be_sent[i].upvoted = true;
                    }
                    else {
                        project_ideas_to_be_sent[i].upvoted = false;
                    }
                }
            }
            else {
                for (var i = 0; docs_to_be_sent.length > i; i++) {
                    docs_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; courses_to_be_sent.length > i; i++) {
                    courses_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; articles_to_be_sent.length > i; i++) {
                    articles_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; project_ideas_to_be_sent.length > i; i++) {
                    project_ideas_to_be_sent[i].upvoted = false;
                }
            }
            return {
                message: null,
                found: false,
                data: {
                    docs: docs_to_be_sent,
                    courses: courses_to_be_sent,
                    articles: articles_to_be_sent,
                    project_idea: project_ideas_to_be_sent
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
    async getTopic(item_id, user_session, limit, skip) {
        try {
            const topic = await Topics_models_1.TopicModel.findById(item_id);
            const docs = await Topics_models_1.DocsModel.find({ topic_id: item_id }).skip(skip).limit(limit);
            const courses = await Topics_models_1.CourseModel.find({ topic_id: item_id }).skip(skip).limit(limit);
            const articles = await Topics_models_1.ArticleModel.find({ topic_id: item_id }).skip(skip).limit(limit);
            const projectIdeas = await Topics_models_1.ProjectIdeaModel.find({ topic_id: item_id }).skip(skip).limit(limit);
            const docs_to_be_sent = Topics_functions_1.sortByUpvotes(docs);
            const courses_to_be_sent = Topics_functions_1.sortByUpvotes(courses);
            const articles_to_be_sent = Topics_functions_1.sortByUpvotes(articles);
            const project_ideas_to_be_sent = Topics_functions_1.sortByUpvotes(projectIdeas);
            if (user_session !== null) {
                const user_id = user_session.user.id;
                for (var i = 0; docs_to_be_sent.length > i; i++) {
                    if (docs_to_be_sent[i].upvotes.includes(user_id)) {
                        docs_to_be_sent[i].upvoted = true;
                    }
                    else {
                        docs_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; courses_to_be_sent.length > i; i++) {
                    if (courses_to_be_sent[i].upvotes.includes(user_id)) {
                        courses_to_be_sent[i].upvoted = true;
                    }
                    else {
                        courses_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; articles_to_be_sent.length > i; i++) {
                    if (articles_to_be_sent[i].upvotes.includes(user_id)) {
                        articles_to_be_sent[i].upvoted = true;
                    }
                    else {
                        articles_to_be_sent[i].upvoted = false;
                    }
                }
                for (var i = 0; project_ideas_to_be_sent.length > i; i++) {
                    if (project_ideas_to_be_sent[i].upvotes.includes(user_id)) {
                        project_ideas_to_be_sent[i].upvoted = true;
                    }
                    else {
                        project_ideas_to_be_sent[i].upvoted = false;
                    }
                }
            }
            else {
                for (var i = 0; docs_to_be_sent.length > i; i++) {
                    docs_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; courses_to_be_sent.length > i; i++) {
                    courses_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; articles_to_be_sent.length > i; i++) {
                    articles_to_be_sent[i].upvoted = false;
                }
                for (var i = 0; project_ideas_to_be_sent.length > i; i++) {
                    project_ideas_to_be_sent[i].upvoted = false;
                }
            }
            return {
                message: null,
                found: false,
                data: {
                    _id: topic._id,
                    user_id: topic.user_id,
                    creator_name: topic.creator_name,
                    title: topic.title,
                    background_image: topic.background_image,
                    docs: docs_to_be_sent,
                    courses: courses_to_be_sent,
                    articles: articles_to_be_sent,
                    project_idea: project_ideas_to_be_sent
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
    async getUserTopics(user_id) {
        try {
            const topics = await Topics_models_1.TopicModel.find({ user_id: user_id });
            return {
                message: null,
                found: true,
                data: topics
            };
        }
        catch (err) {
            return {
                message: 'Something went wrong!',
                found: false,
                data: null
            };
        }
    }
    async getUpvotedContent(user_id) {
        try {
            const docs = await Topics_models_1.DocsModel.find({ upvotes: user_id });
            const articles = await Topics_models_1.ArticleModel.find({ upvotes: user_id });
            const course = await Topics_models_1.CourseModel.find({ upvotes: user_id });
            let output = await Topics_models_1.ProjectIdeaModel.find({ upvotes: user_id });
            for (var i = 0; i < docs.length; i++) {
                output.push(docs[i]);
            }
            for (var i = 0; i < articles.length; i++) {
                output.push(articles[i]);
            }
            for (var i = 0; i < course.length; i++) {
                output.push(course[i]);
            }
            return {
                message: null,
                found: true,
                data: output
            };
        }
        catch (err) {
            return {
                message: "Something went wrong!",
                found: false,
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
        let resource = null;
        if (type == "docs") {
            resource = await Topics_models_1.DocsModel.findOne({ _id: resource_id });
        }
        if (type == "course") {
            resource = await Topics_models_1.CourseModel.findOne({ _id: resource_id });
        }
        if (type == "article") {
            resource = await Topics_models_1.ArticleModel.findOne({ _id: resource_id });
        }
        if (type == "projectidea") {
            resource = await Topics_models_1.ProjectIdeaModel.findOne({ _id: resource_id });
        }
        if (resource.upvotes.includes(user_id)) {
            const index_of_upvote = resource.upvotes.indexOf(user_id);
            resource.upvotes.splice(index_of_upvote, 1);
            resource.upvotes_count--;
            await resource.save();
            return false;
        }
        else {
            resource.upvotes.push(user_id);
            resource.upvotes_count++;
            await resource.save();
            return true;
        }
    }
}
exports.default = TopicService;
