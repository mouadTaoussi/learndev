import { Resolver, Query, Mutation, Arg, Args, Ctx, UseMiddleware } from 'type-graphql';
import { 
	Topic,      Docs,      Course,      Article,      ProjectIdea, Upvote,
	TopicArgs, DocsArgs, CourseArgs, ArticleArgs, ProjectIdeaArgs, LoadMoreRules, TopicInfo
} from './Topics.objecttypes';
import { TopicModel, DocsModel, ArticleModel, CourseModel, ProjectIdeaModel } from "../.././Topics/Topics.models";
import { Authenticated }  from '../middlewares.graphql';
import TopicService from "../.././Topics/Topics.service";

const _topicservice = new TopicService();


// Upvotes function
interface upvoteResolver {
	upvote (resource_id:string, type:string, context:any) :Promise<any>
}

@Resolver(of  => Upvote)
class upvoteResolver implements upvoteResolver{
	@Mutation(returns => Upvote, {description: "this mutation upvoting a content"})
	@UseMiddleware(Authenticated)
	public async upvote(@Arg('resource_id') resource_id:string, @Arg('type') type: string, @Ctx() context:any) :Promise<any>{
		
		const user_id = context.req.user.id
		const upvote: boolean = await _topicservice.upvote(user_id, type, resource_id);

		return {
			upvoted : upvote
		}
	}
}

interface topicInfoResolver {
	searchTopic(search_term: string,{limit,skip}: LoadMoreRules) :Promise<any> // Load more
	getTopics({limit,skip}: LoadMoreRules) :Promise<any> // Load more
}

@Resolver(of => TopicInfo)
class topicInfoResolver implements topicInfoResolver {

	@Query(returns => [TopicInfo], { description : "This query returns the topics by the search item"})
	public async searchTopic(@Arg('search_term') search_term : string, @Args() {limit,skip}: LoadMoreRules)  {

		// Get the query 
		// Split the query to array
		const query_to_search :string[] = search_term.split(' ');

		// Delete logical tools (in-and...)
		const linking_words = ["how","to","and","in","by","the","on","with","which","while","all","for"];

		// Delete linking words
		for (let io = 0; io < query_to_search.length; io++) {

			if (linking_words.includes(query_to_search[io])) {
				query_to_search.splice(io, 1);
			}
			else { continue; }
		}

		// Find the right documents
		const topics = await _topicservice.searchTopic(query_to_search, limit, skip);
		return topics.data;
	}

	@Query(returns => [TopicInfo], { description: "This query returns available topics" })
	public async getTopics(@Args() {limit,skip}: LoadMoreRules) : Promise<any> {

		const topics = await _topicservice.getTopics (limit, skip);

		return topics.data;
 
	}
}

interface topicResolver {
	searchTopic(search_term: string,{limit,skip}: LoadMoreRules) :Promise<any> // Load more
	searchContentInTopic(search_term: string,topic_id:string,{limit,skip}: LoadMoreRules, context : any) :Promise<any> // Load more
	getTopic(topic_id: string,{limit,skip}: LoadMoreRules,context : any) :Promise<any> // Load more
	getTopics({limit,skip}: LoadMoreRules) :Promise<any> // Load more
	addTopic(new_topic: TopicArgs, context:any) :Promise<any>
	deleteTopic(topic_id: string, context:any) :Promise<any>
}

@Resolver(of => Topic)
class topicResolver implements topicResolver {

	@Query(returns => Topic, { description : "This query returns the contents in the topic by the search item"})
	public async searchContentInTopic(@Arg('search_term') search_term : string, @Arg('topic_id') topic_id : string, @Args() {limit,skip}: LoadMoreRules, @Ctx() context : any)  {
		// User if authenticated 
		const user = context.req.session.passport || null;
		// Get the query and topic_id
		// Split the query to array
		const query_to_search :string[] = search_term.split(' ');

		// Delete logical tools (in-and...)
		const linking_words = ["how","to","and","in","by","the","on","with","which","while","all","for"];

		// Delete linking words
		for (let io = 0; io < query_to_search.length; io++) {
			if (linking_words.includes(query_to_search[io].toLowerCase())) {
				query_to_search.splice(io, 1);
			}
			else { continue; }
		}

		// Get topic
		const topic = await _topicservice.getTopic(topic_id ,user, 1, 0);
		// Find the right documents
		const content_in_topic  = await _topicservice.searchContentInTopic(query_to_search, topic_id, user, limit, skip);
		console.log({
			_id              : topic.data._id,
			user_id          : topic.data.user_id,
			creator_name     : topic.data.creator_name,
			title            : topic.data.title,
			background_image : topic.data.background_image,
			docs          : content_in_topic.data.docs,
			courses       : content_in_topic.data.courses,
			articles      : content_in_topic.data.articles,
			project_idea   : content_in_topic.data.project_idea,
		})
		return {
			_id              : topic.data._id,
			user_id          : topic.data.user_id,
			creator_name     : topic.data.creator_name,
			title            : topic.data.title,
			background_image : topic.data.background_image,
			docs          : content_in_topic.data.docs,
			courses       : content_in_topic.data.courses,
			articles      : content_in_topic.data.articles,
			project_idea   : content_in_topic.data.project_idea,
		}
	}

	@Query(returns => Topic, { description: "This query returns a topic" })
	public async getTopic(@Arg('topic_id') topic_id: string,@Args() {limit,skip}: LoadMoreRules, @Ctx() context : any) : Promise<any> {

		const user = context.req.session.passport || null;
		const topic = await _topicservice.getTopic(topic_id, user, limit, skip);
		// Get content of the topic
		return topic.data;
	}

	@Mutation(returns => Topic, { description: "This query adds new topic" })
	@UseMiddleware(Authenticated)
	public async addTopic(@Args() { title, background_image } : TopicArgs, @Ctx() context : any) : Promise<any> {

		// User
	 	const user_id = context.req.user.id

		const new_topic :{
			user_id          :string,
			creator_name     :string,
			title      :string,
			background_image :string
		} = {
			user_id          : context.req.user.id,
			creator_name     : context.req.user.name,
			title      : title,
			background_image : background_image
		}

		const newTopic = await _topicservice.addTopic(new_topic);

		// return null for now
		return {
			_id          : newTopic.data._id,
			user_id      : newTopic.data.user_id,
			creator_name : newTopic.data.creator_name,
			title        : newTopic.data.title,
			background_image : newTopic.data.background_image,
			docs             : null,
			courses      : null,
			articels     : null,
			project_idea : null
		};
		// return "Something went wrong!";
	}

	@Mutation(returns => Boolean, { description: "This query deletes a topic" })
	@UseMiddleware(Authenticated)
	public async deleteTopic(@Arg('topic_id') topic_id: string, @Ctx() context : any) : Promise<any> {

		// User
	 	const user_id = context.req.user.id

		// Find that article
	 	const topic = await TopicModel.findOne({ _id:topic_id });
			console.log(topic)
			// console.log(user_id == topic.user_id)

		// Check if the user owns the target topic
		if (user_id == topic.user_id) {
			const deleteTopic = await _topicservice.deleteTopic(topic_id);

			return true;
		}
		else {
			return false;
		}
	}

}

interface docsResolver {
	addDocs(new_docs: DocsArgs, context:any) :Promise<any>
	deleteDocs(docs_id: string, context:any) :Promise<any> 
}

@Resolver(of => Docs)
class docsResolver implements docsResolver {

	@Mutation(returns => Docs, { description: "This query adds new docs" })
	@UseMiddleware(Authenticated)
	public async addDocs(@Args() { topic_id, title, level, link }: DocsArgs, @Ctx() context : any) : Promise<any> {

		// User
	 	const user_id = context.req.user.id

	 	const new_doc : {
			user_id	     : string,
			creator_name : string,
			topic_id     : string,
			title   : string,
			level        : string,
			link    : string,
			upvotes_count: number,
			upvotes      : number[]
		} = {
			user_id      : context.req.user.id,
			creator_name : context.req.user.name,
			topic_id     : topic_id,
			title   : title,
			level        : level,
			link    : link,
			upvotes_count: 0,
			upvotes      : []
		}

		const newDoc = await _topicservice.addDocs(new_doc);

		return newDoc.data;
	}

	@Mutation(returns => Boolean, { description: "This query deletes a docs" })
	@UseMiddleware(Authenticated)
	public async deleteDocs(@Arg('docs_id') docs_id: string, @Ctx() context : any) : Promise<any> {
		
	 	// User
	 	const user_id = context.req.user.id

		// Find that article
	 	const docs = await DocsModel.find({ _id:docs_id });

		// Check if the user owns the target topic
		if (user_id == docs._id) {

			const deleteDoc = await _topicservice.deleteDocs(docs_id);

			return true;
		}
		else {
			return false;
		}
	}

}

interface courseResolver {
	addCourse(new_course: CourseArgs, context:any) : Promise<any>
	deleteCourse(course_id: string, context:any) : Promise<any>
}

@Resolver(of => Course)
class courseResolver implements courseResolver {
	
	@Mutation(returns => Course, { description: "This query adds new course" })
	@UseMiddleware(Authenticated)
	public async addCourse(@Args() { topic_id, title, level, link }: CourseArgs, @Ctx() context : any) : Promise<any> {
		
		// User
	 	const user_id = context.req.user.id

	 	const new_course : {
			user_id	     : string,
			creator_name : string,
			topic_id     : string,
			title : string,
			level        : string,
			link  : string,
			upvotes_count: number,
			upvotes      : number[]
		} = {
			user_id      : context.req.user.id,
			creator_name : context.req.user.name,
			topic_id     : topic_id,
			title : title,
			level        : level,
			link  : link,
			upvotes_count: 0,
			upvotes      : []
		}

		const newCourse = await _topicservice.addCourse(new_course);

		return newCourse.data;
	}

	@Mutation(returns => Boolean, { description: "This query deletes a course" })
	@UseMiddleware(Authenticated)
	public async deleteCourse(@Arg('course_id') course_id: string, @Ctx() context : any) : Promise<any> {
		
	 	// User
	 	const user_id = context.req.user.id

		// Find that article
	 	const course = await CourseModel.find({ _id:course_id });

		// Check if the user owns the target topic
		if (user_id == course._id) {

			const deleteCourse = await _topicservice.deleteCourse(course_id);

			return true;
		}
		else {
			return false;
		}
	}

}

interface articleResolver {
	addArticle(new_article: ArticleArgs, context:any) : Promise<any>
	deleteArticle(article_id: string, context:any) : Promise<any>
}

@Resolver(of => Article)
class articleResolver implements articleResolver {
	
	@Mutation(returns => Article, { description: "This query adds new course" })
	@UseMiddleware(Authenticated)
	public async addArticle(@Args() {topic_id,title,level,link}: ArticleArgs, @Ctx() context : any) : Promise<any> {
		
	 	// User
	 	const user_id = context.req.user.id

		const new_article : {
			user_id	      : string,
			creator_name  : string,
			topic_id      : string,
			title : string,
			level         : string,
			link  : string,
			upvotes_count : number,
			upvotes       : number[]
		} = {
			user_id       : context.req.user.id,
			creator_name  : context.req.user.name,
			topic_id      : topic_id,
			title : title,
			level         : level,
			link  : link,
			upvotes_count : 0,
			upvotes       : []
		}

		const newArticle = await _topicservice.addArticle(new_article);

		return newArticle.data;
	}

	@Mutation(returns => Boolean, { description: "This query deletes a course" })
	@UseMiddleware(Authenticated)
	public async deleteArticle(@Arg('article_id') article_id: string, @Ctx() context : any) : Promise<any> {
		
	 	// User
	 	const user_id = context.req.user.id
	 	// Find that article
	 	const article = await ArticleModel.find({ _id:article_id });

		// Check if the user owns the target topic
		if (user_id == article._id) {

			const deleteArticle = await _topicservice.deleteArticle(article_id);

			return true;
		}
		else {
			return false;
		}

	}

}

interface projectIdeaResolver {
	addProjectIdea( new_project_idea: ProjectIdeaArgs, context:any) : Promise<any>
	deleteProjectIdea( project_idea_id: string, context:any) : Promise<any>
}

@Resolver(of => ProjectIdea)
class projectIdeaResolver implements projectIdeaResolver {
	
	@Mutation(returns => ProjectIdea, { description: "This query adds new Project Idea" })
	@UseMiddleware(Authenticated)
	public async addProjectIdea(@Args() { topic_id, title, level, description }: ProjectIdeaArgs, @Ctx() context : any)
	 : Promise<any> {

	 	// User
	 	const user_id = context.req.user.id

		const project_idea : {
			user_id	      : string,
			creator_name  : string,
			topic_id      : string,
			title : string,
			level         : string,
			description   : string,
			upvotes_count : number,
			upvotes       : number[]
		} = {
			user_id       : context.req.user.id,
			creator_name  : context.req.user.name,
			topic_id      : topic_id,
			title : title,
			level         : level,
			description   : description,
			upvotes_count : 0,
			upvotes       : []
		}

		const projectIdea = await _topicservice.addProjectIdea(project_idea);

		return projectIdea.data;
	}

	@Mutation(returns => Boolean, { description: "This query deletes a Project Idea" })
	@UseMiddleware(Authenticated)
	public async deleteProjectIdea(@Arg('project_idea_id') project_idea_id: string, @Ctx() context : any) : Promise<any> {
		
		// User
	 	const user_id = context.req.user.id

	 	// Find that article
	 	const projectIdea = await ProjectIdeaModel.find({ _id:project_idea_id });

		// Check if the user owns the target topic
		if (user_id == projectIdea._id) {

			const deleteProjectIdea = await _topicservice.deleteProjectIdea(project_idea_id);

			return true;
		}
		else {
			return false;
		}
	}

}


export { topicResolver, topicInfoResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver, upvoteResolver };

// user_id : "vffff",
// title : topic_id,
// background_image : "string",
// docs : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// courses : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// articles : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// ProjectIdeas : [{user_id:"mouad",topic_id: topic_id, title : "get data",description: "ff"}]
// {
// 	_id : "vffff",
// 	user_id : "vffff",
// 	creator_name : "vffff",
// 	title : topic_id,
// 	background_image : "string",
// 	docs : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// 	courses : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// 	articles : [{user_id:"mouad",topic_id: topic_id, title : "get data",link: "ff"}],
// 	ProjectIdeas : [{user_id:"mouad",topic_id: topic_id, title : "get data",description: "ff"}]
// }