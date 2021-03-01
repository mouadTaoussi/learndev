import { ObjectType, ArgsType, Field }  from 'type-graphql';

// docs- courses- articles- projects ideas
@ObjectType({ description: 'This one represents topic' })
class Topic {
	@Field( type => String, { description: "id field" } )
	_id : string;

	@Field( type => String, { description: "user_id field" } )
	user_id : string;

	@Field( type => String, { description: "creator_name field" } )
	creator_name : string;

	@Field( type => String, { description: "topic_title field" } )
	title : string;

	@Field( type => String, { description: "background_image field" } )
	background_image : string;
	// Tags

	@Field(type => [Docs], { description: "Docs field", nullable: true } )
	docs : [Docs];

	@Field(type => [Course], { description: "courses field", nullable: true } )
	courses : [Course];

	@Field(type => [Article], { description: "articles field", nullable: true } )
	articles : [Article];

	@Field(type => [ProjectIdea], { description: "Project Idea field", nullable: true } )
	project_idea : [ProjectIdea];

}

@ObjectType({ description: 'This one represents topic' })
class TopicInfo {
	@Field( type => String, { description: "id field" } )
	_id : string;

	@Field( type => String, { description: "user_id field" } )
	user_id : string;

	@Field( type => String, { description: "creator_name field" } )
	creator_name : string;

	@Field( type => String, { description: "topic_title field" } )
	title : string;

	@Field( type => String, { description: "background_image field" } )
	background_image : string;
	// Tags
}

@ObjectType({ description: 'This one represents docs' })
class Docs {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String,{description: "user_id field" } )
	user_id : string;

	@Field( type => String,{description: "creator_name field" } )
	creator_name : string;

	@Field( type => String,{description: "topic_id field" } )
	topic_id : string;

	@Field( type => String,{description: "docs_title field" } )
	title : string;

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String,{description: "link field" } )
	link : string;

	@Field( type => Number,{description: "upvotes_count field" } )
	upvotes_count : number;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;

	@Field( type => Boolean,{description: "upvoted field" } )
	upvoted : boolean;

}

@ObjectType({ description : "This one represents course" })
class Course {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String,{description: "user_id field" } )
	user_id : string;

	@Field( type => String,{ description: "creator_name field" } )
	creator_name : string;

	@Field( type => String,{description: "topic_id field" } )
	topic_id : string;

	@Field( type => String,{description: "course_title field" } )
	title : string;

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String,{description: "link field" } )
	link : string;

	@Field( type => Number,{description: "upvotes_count field" } )
	upvotes_count : number;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;

	@Field( type => Boolean,{description: "upvoted field" } )
	upvoted : boolean;
}

@ObjectType({ description: 'This one represents article' })
class Article {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String,{ description: "user_id field" } )
	user_id : string;

	@Field( type => String,{ description: "creator_name field" } )
	creator_name : string;

	@Field( type => String,{ description: "topic_id field" } )
	topic_id : string;

	@Field( type => String,{ description: "article_title field" } )
	title : string;

	@Field( type => String,{ description: "level field" } )
	level : string;

	@Field( type => String,{ description: "link field" } )
	link : string;

	@Field( type => Number,{description: "upvotes_count field" } )
	upvotes_count : number;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;

	@Field( type => Boolean,{description: "upvoted field" } )
	upvoted : boolean;

}

@ObjectType({ description : 'This one represents project idea' })
class ProjectIdea {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String, { description: "user_id field" } )
	user_id : string;

	@Field( type => String,{ description: "creator_name field" } )
	creator_name : string;

	@Field( type => String, { description: "topic_id field" } )
	topic_id : string;

	@Field( type => String,  { description : "This one represents project_idea_title" } )
	title : string

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String , { description : "This one reqpresents description" } )
	description : string;

	@Field( type => Number,{description: "upvotes_count field" } )
	upvotes_count : number;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;

	@Field( type => Boolean,{description: "upvoted field" } )
	upvoted : boolean;
}

@ArgsType()
class TopicArgs {
	
	@Field( type => String )
	title : string;
	
	@Field( type => String )
	background_image : string;

}

@ArgsType()
class DocsArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	link : string;

}

@ArgsType()
class CourseArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	link : string;
}

@ArgsType()
class ArticleArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	link : string;

}

@ArgsType()
class ProjectIdeaArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	description : string;
}

@ArgsType()
class LoadMoreRules {
	@Field( type => Number )
	limit : number;

	@Field( type => Number )
	skip : number;
}

export { 
	Topic, Docs, Course, Article, ProjectIdea, 
	TopicArgs, DocsArgs, CourseArgs, ArticleArgs, ProjectIdeaArgs, LoadMoreRules, TopicInfo
};