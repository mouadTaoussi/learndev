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
    async searchQuery(search_term) {
    }
    async getTopic(topic_id, context) {
        const user = context.req.user;
        console.log(user);
        return {
            user_id: "vffff",
            topic_title: topic_id,
            background_image: "string",
            docs: [{ user_id: "mouad", topic_id: topic_id, docs_title: "get data", docs_link: "ff" }],
            courses: [{ user_id: "mouad", topic_id: topic_id, course_title: "get data", course_link: "ff" }],
            articles: [{ user_id: "mouad", topic_id: topic_id, article_title: "get data", article_link: "ff" }],
            ProjectIdeas: [{ user_id: "mouad", topic_id: topic_id, project_idea_title: "get data", description: "ff" }]
        };
    }
    async getTopics() {
    }
    async addTopic(new_topic, context) {
        console.log(context.session);
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
], topicResolver.prototype, "searchQuery", null);
__decorate([
    type_graphql_1.Query(returns => Topics_objecttypes_1.Topic, { description: "This query returns a topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('topic_id')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "getTopic", null);
__decorate([
    type_graphql_1.Query(returns => [Topics_objecttypes_1.Topic], { description: "This query returns available topics" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], topicResolver.prototype, "getTopics", null);
__decorate([
    type_graphql_1.Mutation(returns => String, { description: "This query adds new topic" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('new_topic')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.TopicInput, Object]),
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
    async addDocs(new_docs, context) {
    }
    async deleteDocs(docs_id, context) {
        return "Deleted Successfully!";
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Docs, { description: "This query adds new docs" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('new_docs')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.DocsInput, Object]),
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
    async addCourse(new_course, context) {
    }
    async deleteCourse(course_id, context) {
        return "Deleted Successfully!";
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Course, { description: "This query adds new course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('new_course')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.CourseInput, Object]),
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
    async addArticle(new_article, context) {
    }
    async deleteArticle(article_id, context) {
        return "Deleted Successfully!";
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.Article, { description: "This query adds new course" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('new_article')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.ArticleInput, Object]),
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
    async addProjectIdea(new_project_idea, context) {
    }
    async deleteProjectIdea(project_idea_id, context) {
        return "Deleted Successfully!";
    }
};
__decorate([
    type_graphql_1.Mutation(returns => Topics_objecttypes_1.ProjectIdea, { description: "This query adds new Project Idea" }),
    type_graphql_1.UseMiddleware(middlewares_graphql_1.Authenticated),
    __param(0, type_graphql_1.Arg('new_project_idea')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topics_objecttypes_1.ProjectIdeaInput, Object]),
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
