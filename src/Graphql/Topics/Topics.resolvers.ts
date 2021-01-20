import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql';
import { 
	Topic,      Docs,      Course,      Article,      ProjectIdea,
	TopicInput, DocsInput, CourseInput, ArticleInput, ProjectIdeaInput 
} from './Topics.objecttypes';

interface topicResolver {

}

@Resolver(of => Topic)
class topicResolver implements topicResolver {

	@Query(returns => Topic, { description: "This query returns a topic" })
	public async getTopic(@Arg('topic_id') topic_id: string) : Promise<any> {

	}

	@Query(returns => [Topic], { description: "This query returns available topics" })
	public async getTopics() : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query adds new topic" })
	public async addTopic(@Arg('new_topic') new_topic: TopicInput) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a topic" })
	public async deleteTopic(@Arg('topic_id') topic_id: string) : Promise<any> {
		return "Deleted Successfully!";
	}

}

@Resolver(of => Docs)
class docsResolver {

	@Mutation(returns => Docs, { description: "This query adds new docs" })
	public async addDocs(@Arg('new_docs') new_docs: DocsInput) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a docs" })
	public async deleteDocs(@Arg('docs_id') docs_id: string) : Promise<any> {
		return "Deleted Successfully!";
	}

}

@Resolver(of => Course)
class courseResolver {
	
	@Mutation(returns => Course, { description: "This query adds new course" })
	public async addCourse(@Arg('new_course') new_course: CourseInput) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a course" })
	public async deleteCourse(@Arg('course_id') course_id: string) : Promise<any> {
		return "Deleted Successfully!";
	}

}

@Resolver(of => Article)
class articleResolver {
	
	@Mutation(returns => Article, { description: "This query adds new course" })
	public async addArticle(@Arg('new_article') new_article: ArticleInput) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a course" })
	public async deleteArticle(@Arg('article_id') article_id: string) : Promise<any> {
		return "Deleted Successfully!";
	}

}

@Resolver(of => ProjectIdea)
class projectIdeaResolver {
	
	@Mutation(returns => ProjectIdea, { description: "This query adds new Project Idea" })
	public async addProjectIdea(@Arg('new_project_idea') new_project_idea: ProjectIdeaInput) : Promise<any> {

	}

	@Mutation(returns => String, { description: "This query deletes a Project Idea" })
	public async deleteProjectIdea(@Arg('project_idea_id') project_idea_id: string) : Promise<any> {
		return "Deleted Successfully!";
	}

}


export { topicResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver };