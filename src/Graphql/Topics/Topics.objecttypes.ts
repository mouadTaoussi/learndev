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
	topic_title : string;

	@Field( type => String, { description: "background_image field" } )
	background_image : string;


	@Field(type => [Docs], { description: "Docs field", nullable: true } )
	docs : [Docs];

	@Field(type => [Course], { description: "courses field", nullable: true } )
	courses : [Course];

	@Field(type => [Article], { description: "articles field", nullable: true } )
	articles : [Article];

	@Field(type => [ProjectIdea], { description: "Project Idea field", nullable: true } )
	project_idea : [ProjectIdea];

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
	docs_title : string;

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String,{description: "docs_link field" } )
	docs_link : string;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;

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
	course_title : string;

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String,{description: "course_link field" } )
	course_link : string;

	@Field( type => String,{description: "upvotes field" } )
	upvotes : string;
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
	article_title : string;

	@Field( type => String,{ description: "level field" } )
	level : string;

	@Field( type => String,{ description: "article_link field" } )
	article_link : string;

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
	project_idea_title : string

	@Field( type => String,{description: "level field" } )
	level : string;

	@Field( type => String , { description : "This one reqpresents description" } )
	description : string;
}

@ArgsType()
class TopicArgs {
	
	@Field( type => String )
	topic_title : string;
	
	@Field( type => String )
	background_image : string;

}

@ArgsType()
class DocsArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	docs_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	docs_link : string;

}

@ArgsType()
class CourseArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	course_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	course_link : string;
}

@ArgsType()
class ArticleArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	article_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	article_link : string;

}

@ArgsType()
class ProjectIdeaArgs {

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	project_idea_title : string;

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
	TopicArgs, DocsArgs, CourseArgs, ArticleArgs, ProjectIdeaArgs, LoadMoreRules
};