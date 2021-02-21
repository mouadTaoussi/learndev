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
exports.projectIdeaResolver = exports.articleResolver = exports.courseResolver = exports.docsResolver = exports.topicResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Topics_objecttypes_1 = require("./Topics.objecttypes");
const middlewares_graphql_1 = require("../middlewares.graphql");
const Topics_service_1 = __importDefault(require("../.././Topics/Topics.service"));
const _topicservice = new Topics_service_1.default();
let topicResolver = class topicResolver {
    async searchTopic(search_term) {
    }
    async searchContentInTopic(search_term, topic_id, context) {
        const user = context.req.session.passport.user || null;
    }
    async getTopic(topic_id, context) {
        const user = context.req.session.passport.user || null;
        const topic = await _topicservice.getTopic(topic_id, user.id);
        return topic.data;
    }
    async getTopics({ limit, skip }) {
        const topics = await _topicservice.getTopics(limit, skip);
        return topics.data;
    }
    async addTopic({ topic_title, background_image }, context) {
        console.log(context.req.user);
        const new_topic = {
            user_id: context.req.user.id,
            creator_name: context.req.user.name,
            topic_title: topic_title,
            background_image: background_image
        };
        console.log(new_topic);
        const newTopic = await _topicservice.addTopic(new_topic);
        if (newTopic.added)
            return newTopic.data;
    }
    async deleteTopic(topic_id, context) {
        return "Deleted Successfully!";
        console.log(context.session);
    }
};
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.Topic], { description: "This query returns the topics by the search item" }),
    __param(0, type_graphql_1.Arg('search_term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "searchTopic", null);
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.Topic], { description: "This query returns the contents in the topic by the search item" }),
    __param(0, type_graphql_1.Arg('search_term')), __param(1, type_graphql_1.Arg('topic_id')), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "searchContentInTopic", null);
__decorate([
    type_graphql_1.Query(returns => Topics_objecttypes_1.Topic, { description: "This query returns a topic" }),
    __param(0, type_graphql_1.Arg('topic_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "getTopic", null);
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.Topic], { description: "This query returns available topics" }),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.LoadMoreRules]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "getTopics", null);
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Topic, { description: "This query adds new topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.TopicArgs, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "addTopic", null);
__decorate([
    type_graphql_1.Mutation(returns => String, { description: "This query deletes a topic" }),
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
    async addDocs({ topic_id, docs_title, level, docs_link }, context) {
        const newDoc = {
            user_id: context.req.user.id,
            creator_name: context.req.user.name,
            topic_id: topic_id,
            docs_title: docs_title,
            level: level,
            docs_link: docs_link,
            upvotes_count: 0,
            upvotes: []
        };
    }
    async deleteDocs(docs_id, context) {
        return "Deleted Successfully!";
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
    type_graphql_1.Mutation(returns => String, { description: "This query deletes a docs" }),
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
    async addCourse({ topic_id, course_title, level, course_link }, context) {
        const newCourse = {
            user_id: context.req.user.id,
            creator_name: context.req.user.name,
            topic_id: topic_id,
            course_title: course_title,
            level: level,
            course_link: course_link,
            upvotes_count: 0,
            upvotes: []
        };
    }
    async deleteCourse(course_id, context) {
        return "Deleted Successfully!";
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
    type_graphql_1.Mutation(returns => String, { description: "This query deletes a course" }),
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
    async addArticle({ topic_id, article_title, level, article_link }, context) {
        const newArticle = {
            user_id: context.req.user.id,
            creator_name: context.req.user.name,
            topic_id: topic_id,
            article_title: article_title,
            level: level,
            article_link: article_link,
            upvotes_count: 0,
            upvotes: []
        };
    }
    async deleteArticle(article_id, context) {
        return "Deleted Successfully!";
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
    type_graphql_1.Mutation(returns => String, { description: "This query deletes a course" }),
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
    async addProjectIdea({ topic_id, project_idea_title, level, description }, context) {
        const newArticle = {
            user_id: context.req.user.id,
            creator_name: context.req.user.name,
            topic_id: topic_id,
            project_idea_title: project_idea_title,
            level: level,
            description: description,
            upvotes_count: 0,
            upvotes: []
        };
    }
    async deleteProjectIdea(project_idea_id, context) {
        return "Deleted Successfully!";
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
    type_graphql_1.Mutation(returns => String, { description: "This query deletes a Project Idea" }),
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
