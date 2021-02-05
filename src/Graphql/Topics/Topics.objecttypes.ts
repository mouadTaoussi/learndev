import { ObjectType, InputType, Field }  from 'type-graphql';

// docs- courses- articles- projects ideas
@ObjectType({ description: 'This one represents topic' })
class Topic {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String,{ description: "user_id field" } )
	user_id : string;

	@Field( type => String,{ description: "creator_name field" } )
	creator_name : string;

	@Field( type => String,{ description: "topic_title field" } )
	topic_title : string;

	@Field( type => String,{ description: "background_image field" } )
	background_image : string;


	@Field(type => [Docs], { description: "Docs field" } )
	docs : [Docs];

	@Field(type => [Course], { description: "courses field" } )
	courses : [Course];

	@Field(type => [Article], { description: "articles field" } )
	articles : [Article];

	@Field(type => [ProjectIdea], { description: "Project Idea field" } )
	ProjectIdeas : [ProjectIdea];

}

@ObjectType({ description: 'This one represents docs' })
class Docs {
	@Field( type => String,{description: "id field" } )
	_id : string;

	@Field( type => String,{description: "user_id field" } )
	user_id : string;

	@Field( type => String,{ description: "creator_name field" } )
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

	@Field( type => String,{description: "level field" } )
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

@InputType()
class TopicInput {
	@Field( type => String )
	user_id : string;

	@Field( type => String )
	topic_title : string;

}

@InputType()
class DocsInput {
	@Field( type => String )
	user_id : string;

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	docs_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	docs_link : string;

}

@InputType()
class CourseInput {
	@Field( type => String )
	user_id : string;

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	course_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	course_link : string;
}

@InputType()
class ArticleInput {
	@Field( type => String )
	user_id : string;

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	article_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	article_link : string;

}

@InputType()
class ProjectIdeaInput {
	@Field( type => String )
	user_id : string;

	@Field( type => String )
	topic_id : string;

	@Field( type => String )
	project_idea_title : string;

	@Field( type => String )
	level : string;

	@Field( type => String )
	description : string;
}

export { 
	Topic, Docs, Course, Article, ProjectIdea, 
	TopicInput, DocsInput, CourseInput, ArticleInput, ProjectIdeaInput 
};