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
exports.ProjectIdeaInput = exports.ArticleInput = exports.CourseInput = exports.DocsInput = exports.TopicInput = exports.ProjectIdea = exports.Article = exports.Course = exports.Docs = exports.Topic = void 0;
const type_graphql_1 = require("type-graphql");
let Topic = class Topic {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], Topic.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_title field" }),
    __metadata("design:type", String)
], Topic.prototype, "topic_title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "background_image field" }),
    __metadata("design:type", String)
], Topic.prototype, "background_image", void 0);
__decorate([
    type_graphql_1.Field(type => [Docs], { description: "Docs field" }),
    __metadata("design:type", Array)
], Topic.prototype, "docs", void 0);
__decorate([
    type_graphql_1.Field(type => [Course], { description: "courses field" }),
    __metadata("design:type", Array)
], Topic.prototype, "courses", void 0);
__decorate([
    type_graphql_1.Field(type => [Article], { description: "articles field" }),
    __metadata("design:type", Array)
], Topic.prototype, "articles", void 0);
__decorate([
    type_graphql_1.Field(type => [ProjectIdea], { description: "Project Idea field" }),
    __metadata("design:type", Array)
], Topic.prototype, "ProjectIdeas", void 0);
Topic = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents topic' })
], Topic);
exports.Topic = Topic;
let Docs = class Docs {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], Docs.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field" }),
    __metadata("design:type", String)
], Docs.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "docs_title field" }),
    __metadata("design:type", String)
], Docs.prototype, "docs_title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field" }),
    __metadata("design:type", String)
], Docs.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "docs_link field" }),
    __metadata("design:type", String)
], Docs.prototype, "docs_link", void 0);
Docs = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents docs' })
], Docs);
exports.Docs = Docs;
let Course = class Course {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], Course.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field" }),
    __metadata("design:type", String)
], Course.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "course_title field" }),
    __metadata("design:type", String)
], Course.prototype, "course_title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field" }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "course_link field" }),
    __metadata("design:type", String)
], Course.prototype, "course_link", void 0);
Course = __decorate([
    type_graphql_1.ObjectType({ description: "This one represents course" })
], Course);
exports.Course = Course;
let Article = class Article {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], Article.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field" }),
    __metadata("design:type", String)
], Article.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "article_title field" }),
    __metadata("design:type", String)
], Article.prototype, "article_title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field" }),
    __metadata("design:type", String)
], Article.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "article_link field" }),
    __metadata("design:type", String)
], Article.prototype, "article_link", void 0);
Article = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents article' })
], Article);
exports.Article = Article;
let ProjectIdea = class ProjectIdea {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "user_id field" }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "topic_id field" }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "This one represents project_idea_title" }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "project_idea_title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "level field" }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "This one reqpresents description" }),
    __metadata("design:type", String)
], ProjectIdea.prototype, "description", void 0);
ProjectIdea = __decorate([
    type_graphql_1.ObjectType({ description: 'This one represents project idea' })
], ProjectIdea);
exports.ProjectIdea = ProjectIdea;
let TopicInput = class TopicInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], TopicInput.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], TopicInput.prototype, "topic_title", void 0);
TopicInput = __decorate([
    type_graphql_1.InputType()
], TopicInput);
exports.TopicInput = TopicInput;
let DocsInput = class DocsInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsInput.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsInput.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsInput.prototype, "docs_title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsInput.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], DocsInput.prototype, "docs_link", void 0);
DocsInput = __decorate([
    type_graphql_1.InputType()
], DocsInput);
exports.DocsInput = DocsInput;
let CourseInput = class CourseInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseInput.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseInput.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseInput.prototype, "course_title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseInput.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], CourseInput.prototype, "course_link", void 0);
CourseInput = __decorate([
    type_graphql_1.InputType()
], CourseInput);
exports.CourseInput = CourseInput;
let ArticleInput = class ArticleInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleInput.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleInput.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleInput.prototype, "article_title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleInput.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ArticleInput.prototype, "article_link", void 0);
ArticleInput = __decorate([
    type_graphql_1.InputType()
], ArticleInput);
exports.ArticleInput = ArticleInput;
let ProjectIdeaInput = class ProjectIdeaInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaInput.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaInput.prototype, "topic_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaInput.prototype, "project_idea_title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaInput.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], ProjectIdeaInput.prototype, "description", void 0);
ProjectIdeaInput = __decorate([
    type_graphql_1.InputType()
], ProjectIdeaInput);
exports.ProjectIdeaInput = ProjectIdeaInput;
