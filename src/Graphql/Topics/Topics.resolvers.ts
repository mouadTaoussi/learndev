import { Resolver, Query, Mutation, Arg, Args, Ctx, UseMiddleware } from 'type-graphql';
import { 
	Topic,      Docs,      Course,      Article,      ProjectIdea,
	TopicInput, DocsInput, CourseInput, ArticleInput, ProjectIdeaInput 
} from './Topics.objecttypes';
import { Authenticated }  from '../middlewares.graphql';

interface topicResolver {
	searchQuery(search_term: string) :Promise<any>
	getTopic(topic_id: string) :Promise<any>
	getTopics(topic_id: string) :Promise<any>
	addTopic(new_topic: TopicInput, context:any) :Promise<any>
	deleteTopic(topic_id: string, context:any) :Promise<any>
}

@Resolver(of => Topic)
class topicResolver implements topicResolver {

	@Query(returns => [Topic], { description : "This query returns the topics by the search item"})
	public async searchQuery(@Arg('search_term') search_term : string)  {

	}

	@Query(returns => Topic, { description: "This query returns a topic" })
	@UseMiddleware(Authenticated)
	public async getTopic(@Arg('topic_id') topic_id: string) : Promise<any> {
		
		return {
			user_id : "vffff",
			topic_title : topic_id,
			background_image : "string",
			docs : [{user_id:"mouad",topic_id: topic_id, docs_title : "get data",docs_link: "ff"}],
			courses : [{user_id:"mouad",topic_id: topic_id, course_title : "get data",course_link: "ff"}],
			articles : [{user_id:"mouad",topic_id: topic_id, article_title : "get data",article_link: "ff"}],
			ProjectIdeas : [{user_id:"mouad",topic_id: topic_id, project_idea_title : "get data",description: "ff"}]
		}
	}

	@Query(returns => [Topic], { description: "This query returns available topics" })
	public async getTopics() : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query adds new topic" })
	@UseMiddleware(Authenticated)
	public async addTopic(@Arg('new_topic') new_topic: TopicInput, @Ctx() context : any) : Promise<any> {
		console.log(context.session)
	}

	@Mutation(returns => String, { description: "This query deletes a topic" })
	@UseMiddleware(Authenticated)
	public async deleteTopic(@Arg('topic_id') topic_id: string, @Ctx() context : any) : Promise<any> {
		return "Deleted Successfully!";
		console.log(context.session)
	}

}

interface docsResolver {
	addDocs(new_docs: DocsInput, context:any) :Promise<any>
	deleteDocs(docs_id: string, context:any) :Promise<any> 
}

@Resolver(of => Docs)
class docsResolver implements docsResolver {

	@Mutation(returns => Docs, { description: "This query adds new docs" })
	@UseMiddleware(Authenticated)
	public async addDocs(@Arg('new_docs') new_docs: DocsInput, @Ctx() context : any) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a docs" })
	@UseMiddleware(Authenticated)
	public async deleteDocs(@Arg('docs_id') docs_id: string, @Ctx() context : any) : Promise<any> {
		return "Deleted Successfully!";
	}

}

interface courseResolver {
	addCourse(new_course: CourseInput, context:any) : Promise<any>
	deleteCourse(course_id: string, context:any) : Promise<any>
}

@Resolver(of => Course)
class courseResolver implements courseResolver {
	
	@Mutation(returns => Course, { description: "This query adds new course" })
	@UseMiddleware(Authenticated)
	public async addCourse(@Arg('new_course') new_course: CourseInput, @Ctx() context : any) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a course" })
	@UseMiddleware(Authenticated)
	public async deleteCourse(@Arg('course_id') course_id: string, @Ctx() context : any) : Promise<any> {
		return "Deleted Successfully!";
	}

}

interface articleResolver {
	addArticle(new_article: ArticleInput, context:any) : Promise<any>
	deleteArticle(article_id: string, context:any) : Promise<any>
}

@Resolver(of => Article)
class articleResolver implements articleResolver {
	
	@Mutation(returns => Article, { description: "This query adds new course" })
	@UseMiddleware(Authenticated)
	public async addArticle(@Arg('new_article') new_article: ArticleInput, @Ctx() context : any) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a course" })
	@UseMiddleware(Authenticated)
	public async deleteArticle(@Arg('article_id') article_id: string, @Ctx() context : any) : Promise<any> {
		return "Deleted Successfully!";
	}

}

interface projectIdeaResolver {
	addProjectIdea( new_project_idea: ProjectIdeaInput, context:any) : Promise<any>
	deleteProjectIdea( project_idea_id: string, context:any) : Promise<any>
}

@Resolver(of => ProjectIdea)
class projectIdeaResolver implements projectIdeaResolver {
	
	@Mutation(returns => ProjectIdea, { description: "This query adds new Project Idea" })
	@UseMiddleware(Authenticated)
	public async addProjectIdea(@Arg('new_project_idea') new_project_idea: ProjectIdeaInput, @Ctx() context : any) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a Project Idea" })
	@UseMiddleware(Authenticated)
	public async deleteProjectIdea(@Arg('project_idea_id') project_idea_id: string, @Ctx() context : any) : Promise<any> {
		return "Deleted Successfully!";
	}

}


export { topicResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver };

// user_id : "vffff",
// topic_title : topic_id,
// background_image : "string",
// docs : [{user_id:"mouad",topic_id: topic_id, docs_title : "get data",docs_link: "ff"}],
// courses : [{user_id:"mouad",topic_id: topic_id, course_title : "get data",course_link: "ff"}],
// articles : [{user_id:"mouad",topic_id: topic_id, article_title : "get data",article_link: "ff"}],
// ProjectIdeas : [{user_id:"mouad",topic_id: topic_id, project_idea_title : "get data",description: "ff"}]