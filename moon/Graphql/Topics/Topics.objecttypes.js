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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicInfo = exports.LoadMoreRules = exports.ProjectIdeaArgs = exports.ArticleArgs = exports.CourseArgs = exports.DocsArgs = exports.TopicArgs = exports.Upvote = exports.ProjectIdea = exports.Article = exports.Course = exports.Docs = exports.Topic = void 0;
const type_graphql_1 = require("type-graphql");
let Topic = class Topic {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field" }),
    __metadata("design:type", String)
], Topic.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], Topic.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field" }),
    __metadata("design:type", String)
], Topic.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_title field" }),
    __metadata("design:type", String)
], Topic.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "background_image field" }),
    __metadata("design:type", String)
], Topic.prototype, "background_image", void 0);
__decorate([
    type_graphql_1.Field(type => [Docs], { description: "Docs field", nullable: true }),
    __metadata("design:type", Array)
], Topic.prototype, "docs", void 0);
__decorate([
    type_graphql_1.Field(type => [Course], { description: "courses field", nullable: true }),
    __metadata("design:type", Array)
], Topic.prototype, "courses", void 0);
__decorate([
    type_graphql_1.Field(type => [Article], { description: "articles field", nullable: true }),
    __metadata("design:type", Array)
], Topic.prototype, "articles", void 0);
__decorate([
    type_graphql_1.Field(type => [ProjectIdea], { description: "Project Idea field", nullable: true }),
    __metadata("design:type", Array)
], Topic.prototype, "project_idea", void 0);
Topic = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents topic' })
], Topic);
exports.Topic = Topic;
let TopicInfo = class TopicInfo {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field" }),
    __metadata("design:type", String)
], TopicInfo.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], TopicInfo.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field" }),
    __metadata("design:type", String)
], TopicInfo.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_title field" }),
    __metadata("design:type", String)
], TopicInfo.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "background_image field" }),
    __metadata("design:type", String)
], TopicInfo.prototype, "background_image", void 0);
TopicInfo = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents topic' })
], TopicInfo);
exports.TopicInfo = TopicInfo;
let Docs = class Docs {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "docs_title field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "link field", nullable: true }),
    __metadata("design:type", String)
], Docs.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { description: "upvotes_count field", nullable: true }),
    __metadata("design:type", Number)
], Docs.prototype, "upvotes_count", void 0);
__decorate([
    type_graphql_1.Field(type => Boolean, { description: "upvoted field" }),
    __metadata("design:type", Boolean)
], Docs.prototype, "upvoted", void 0);
Docs = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents docs' })
], Docs);
exports.Docs = Docs;
let Course = class Course {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "course_title field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "link field", nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { description: "upvotes_count field", nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "upvotes_count", void 0);
__decorate([
    type_graphql_1.Field(type => Boolean, { description: "upvoted field", nullable: true }),
    __metadata("design:type", Boolean)
], Course.prototype, "upvoted", void 0);
Course = __decorate([
    type_graphql_1.ObjectType({ description: "This one represents course" })
], Course);
exports.Course = Course;
let Article = class Article {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "article_title field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "link field", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { description: "upvotes_count field", nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "upvotes_count", void 0);
__decorate([
    type_graphql_1.Field(type => Boolean, { description: "upvoted field", nullable: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "upvoted", void 0);
Article = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents article' })
], Article);
exports.Article = Article;
let ProjectIdea = class ProjectIdea {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "id field", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "creator_name field", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "creator_name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "This one represents project_idea_title", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "This one reqpresents description", nullable: true }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { description: "upvotes_count field", nullable: true }),
    __metadata("design:type", Number)
], ProjectIdea.prototype, "upvotes_count", void 0);
__decorate([
    type_graphql_1.Field(type => Boolean, { description: "upvoted field", nullable: true }),
    __metadata("design:type", Boolean)
], ProjectIdea.prototype, "upvoted", void 0);
ProjectIdea = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents project idea' })
], ProjectIdea);
exports.ProjectIdea = ProjectIdea;
let Upvote = class Upvote {
};
__decorate([
    type_graphql_1.Field(type => Boolean, { description: "isupvoted" }),
    __metadata("design:type", Boolean)
], Upvote.prototype, "upvoted", void 0);
Upvote = __decorate([
    type_graphql_1.ObjectType({ description: "Upvote section" })
], Upvote);
exports.Upvote = Upvote;
let TopicArgs = class TopicArgs {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], TopicArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], TopicArgs.prototype, "background_image", void 0);
TopicArgs = __decorate([
    type_graphql_1.ArgsType()
], TopicArgs);
exports.TopicArgs = TopicArgs;
let DocsArgs = class DocsArgs {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsArgs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsArgs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsArgs.prototype, "link", void 0);
DocsArgs = __decorate([
    type_graphql_1.ArgsType()
], DocsArgs);
exports.DocsArgs = DocsArgs;
let CourseArgs = class CourseArgs {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseArgs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseArgs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseArgs.prototype, "link", void 0);
CourseArgs = __decorate([
    type_graphql_1.ArgsType()
], CourseArgs);
exports.CourseArgs = CourseArgs;
let ArticleArgs = class ArticleArgs {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleArgs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleArgs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleArgs.prototype, "link", void 0);
ArticleArgs = __decorate([
    type_graphql_1.ArgsType()
], ArticleArgs);
exports.ArticleArgs = ArticleArgs;
let ProjectIdeaArgs = class ProjectIdeaArgs {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaArgs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaArgs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaArgs.prototype, "description", void 0);
ProjectIdeaArgs = __decorate([
    type_graphql_1.ArgsType()
], ProjectIdeaArgs);
exports.ProjectIdeaArgs = ProjectIdeaArgs;
let LoadMoreRules = class LoadMoreRules {
};
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], LoadMoreRules.prototype, "limit", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], LoadMoreRules.prototype, "skip", void 0);
LoadMoreRules = __decorate([
    type_graphql_1.ArgsType()
], LoadMoreRules);
exports.LoadMoreRules = LoadMoreRules;
