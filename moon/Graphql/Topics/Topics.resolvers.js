"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upvoteResolver = exports.projectIdeaResolver = exports.articleResolver = exports.courseResolver = exports.docsResolver = exports.topicInfoResolver = exports.topicResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Topics_objecttypes_1 = require("./Topics.objecttypes");
const Topics_models_1 = require("../.././Topics/Topics.models");
const middlewares_graphql_1 = require("../middlewares.graphql");
const Topics_service_1 = __importDefault(require("../.././Topics/Topics.service"));
const _topicservice = new Topics_service_1.default();
let upvoteResolver = class upvoteResolver {
    async upvote(resource_id, type, context) {
        const user_id = context.req.user.id;
        const upvote = await _topicservice.upvote(user_id, type, resource_id);
        return {
            upvoted: upvote
        };
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Upvote, { description: "this mutation upvoting a content" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('resource_id')), __param(1, type_graphql_1.Arg('type')), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], upvoteResolver.prototype, "upvote", null);
upvoteResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.Upvote)
], upvoteResolver);
exports.upvoteResolver = upvoteResolver;
let topicInfoResolver = class topicInfoResolver {
    async searchTopic(search_term, { limit, skip }) {
        const query_to_search = search_term.split(' ');
        const linking_words = ["how", "to", "and", "in", "by", "the", "on", "with", "which", "while", "all", "for"];
        for (let io = 0; io < query_to_search.length; io++) {
            if (linking_words.includes(query_to_search[io])) {
                query_to_search.splice(io, 1);
            }
            else {
                continue;
            }
        }
        const topics = await _topicservice.searchTopic(query_to_search, limit, skip);
        return topics.data;
    }
    async getTopics({ limit, skip }) {
        const topics = await _topicservice.getTopics(limit, skip);
        return topics.data;
    }
};
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.TopicInfo], { description: "This query returns the topics by the search item" }),
    __param(0, type_graphql_1.Arg('search_term')), __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Topics_objecttypes_1.LoadMoreRules]),
    __metadata("design:returntype", Promise)
], topicInfoResolver.prototype, "searchTopic", null);
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.TopicInfo], { description: "This query returns available topics" }),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.LoadMoreRules]),
    __metadata("design:returntype", Promise)
], topicInfoResolver.prototype, "getTopics", null);
topicInfoResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.TopicInfo)
], topicInfoResolver);
exports.topicInfoResolver = topicInfoResolver;
let topicResolver = class topicResolver {
    async searchContentInTopic(search_term, topic_id, { limit, skip }, context) {
        const user = context.req.user;
        const query_to_search = search_term.split(' ');
        const linking_words = ["how", "to", "and", "in", "by", "the", "on", "with", "which", "while", "all", "for"];
        for (let io = 0; io < query_to_search.length; io++) {
            if (linking_words.includes(query_to_search[io].toLowerCase())) {
                query_to_search.splice(io, 1);
            }
            else {
                continue;
            }
        }
        const topic = await _topicservice.getTopic(topic_id, user, 1, 0);
        const content_in_topic = await _topicservice.searchContentInTopic(query_to_search, topic_id, user, limit, skip);
        return {
            _id: topic.data._id,
            user_id: topic.data.user_id,
            creator_name: topic.data.creator_name,
            title: topic.data.title,
            background_image: topic.data.background_image,
            docs: content_in_topic.data.docs,
            courses: content_in_topic.data.courses,
            articles: content_in_topic.data.articles,
            project_idea: content_in_topic.data.project_idea,
        };
    }
    async getTopic(topic_id, { limit, skip }, context) {
        const user = context.req.user;
        const topic = await _topicservice.getTopic(topic_id, user, limit, skip);
        return topic.data;
    }
    async addTopic({ title, background_image }, context) {
        const user = context.req.user;
        const new_topic = {
            user_id: user.id,
            creator_name: user.name,
            title: title,
            background_image: background_image
        };
        const newTopic = await _topicservice.addTopic(new_topic);
        return {
            _id: newTopic.data._id,
            user_id: newTopic.data.user_id,
            creator_name: newTopic.data.creator_name,
            title: newTopic.data.title,
            background_image: newTopic.data.background_image,
            docs: null,
            courses: null,
            articels: null,
            project_idea: null
        };
    }
    async deleteTopic(topic_id, context) {
        const user = context.req.user;
        const topic = await Topics_models_1.TopicModel.findOne({ _id: topic_id });
        if (user.id == topic.user_id) {
            const deleteTopic = await _topicservice.deleteTopic(topic_id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.UseMiddleware(middlewares_graphql_1.LoggedInUser),
    type_graphql_1.Query(returns => Topics_objecttypes_1.Topic, { description: "This query returns the contents in the topic by the search item" }),
    __param(0, type_graphql_1.Arg('search_term')), __param(1, type_graphql_1.Arg('topic_id')), __param(2, type_graphql_1.Args()), __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Topics_objecttypes_1.LoadMoreRules, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "searchContentInTopic", null);
__decorate([
    type_graphql_1.Query(returns => Topics_objecttypes_1.Topic, { description: "This query returns a topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.LoggedInUser),
    __param(0, type_graphql_1.Arg('topic_id')), __param(1, type_graphql_1.Args()), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Topics_objecttypes_1.LoadMoreRules, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "getTopic", null);
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Topic, { description: "This query adds new topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.TopicArgs, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "addTopic", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean, { description: "This query deletes a topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('topic_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "deleteTopic", null);
topicResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.Topic)
], topicResolver);
exports.topicResolver = topicResolver;
let docsResolver = class docsResolver {
    async addDocs({ topic_id, title, level, link }, context) {
        const user = context.req.user;
        const new_doc = {
            user_id: user.id,
            creator_name: user.name,
            topic_id: topic_id,
            title: title,
            level: level,
            link: link,
            upvotes_count: 0,
            upvotes: []
        };
        const newDoc = await _topicservice.addDocs(new_doc);
        return newDoc.data;
    }
    async deleteDocs(docs_id, context) {
        const user = context.req.user;
        const docs = await Topics_models_1.DocsModel.find({ _id: docs_id });
        if (user.id == docs._id) {
            const deleteDoc = await _topicservice.deleteDocs(docs_id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Docs, { description: "This query adds new docs" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.DocsArgs, Object]),
    __metadata("design:returntype", Promise)
], docsResolver.prototype, "addDocs", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean, { description: "This query deletes a docs" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('docs_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], docsResolver.prototype, "deleteDocs", null);
docsResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.Docs)
], docsResolver);
exports.docsResolver = docsResolver;
let courseResolver = class courseResolver {
    async addCourse({ topic_id, title, level, link }, context) {
        const user = context.req.user;
        const new_course = {
            user_id: user.id,
            creator_name: user.name,
            topic_id: topic_id,
            title: title,
            level: level,
            link: link,
            upvotes_count: 0,
            upvotes: []
        };
        const newCourse = await _topicservice.addCourse(new_course);
        return newCourse.data;
    }
    async deleteCourse(course_id, context) {
        const user = context.req.user;
        const course = await Topics_models_1.CourseModel.find({ _id: course_id });
        if (user.id == course._id) {
            const deleteCourse = await _topicservice.deleteCourse(course_id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Course, { description: "This query adds new course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.CourseArgs, Object]),
    __metadata("design:returntype", Promise)
], courseResolver.prototype, "addCourse", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean, { description: "This query deletes a course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('course_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], courseResolver.prototype, "deleteCourse", null);
courseResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.Course)
], courseResolver);
exports.courseResolver = courseResolver;
let articleResolver = class articleResolver {
    async addArticle({ topic_id, title, level, link }, context) {
        const user = context.req.user;
        const new_article = {
            user_id: user.id,
            creator_name: user.name,
            topic_id: topic_id,
            title: title,
            level: level,
            link: link,
            upvotes_count: 0,
            upvotes: []
        };
        const newArticle = await _topicservice.addArticle(new_article);
        return newArticle.data;
    }
    async deleteArticle(article_id, context) {
        const user = context.req.user;
        const article = await Topics_models_1.ArticleModel.find({ _id: article_id });
        if (user.id == article._id) {
            const deleteArticle = await _topicservice.deleteArticle(article_id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Article, { description: "This query adds new course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.ArticleArgs, Object]),
    __metadata("design:returntype", Promise)
], articleResolver.prototype, "addArticle", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean, { description: "This query deletes a course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('article_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], articleResolver.prototype, "deleteArticle", null);
articleResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.Article)
], articleResolver);
exports.articleResolver = articleResolver;
let projectIdeaResolver = class projectIdeaResolver {
    async addProjectIdea({ topic_id, title, level, description }, context) {
        const user = context.req.user;
        const project_idea = {
            user_id: user.id,
            creator_name: user.name,
            topic_id: topic_id,
            title: title,
            level: level,
            description: description,
            upvotes_count: 0,
            upvotes: []
        };
        const projectIdea = await _topicservice.addProjectIdea(project_idea);
        return projectIdea.data;
    }
    async deleteProjectIdea(project_idea_id, context) {
        const user = context.req.user;
        const projectIdea = await Topics_models_1.ProjectIdeaModel.find({ _id: project_idea_id });
        if (user.id == projectIdea._id) {
            const deleteProjectIdea = await _topicservice.deleteProjectIdea(project_idea_id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.ProjectIdea, { description: "This query adds new Project Idea" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.ProjectIdeaArgs, Object]),
    __metadata("design:returntype", Promise)
], projectIdeaResolver.prototype, "addProjectIdea", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean, { description: "This query deletes a Project Idea" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('project_idea_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], projectIdeaResolver.prototype, "deleteProjectIdea", null);
projectIdeaResolver = __decorate([
    type_graphql_1.Resolver(of => Topics_objecttypes_1.ProjectIdea)
], projectIdeaResolver);
exports.projectIdeaResolver = projectIdeaResolver;
