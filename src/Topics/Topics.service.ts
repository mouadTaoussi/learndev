import { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel } from './Topics.models';
import { TopicServiceInt, Topic, Docs, Course, Article, ProjectIdea } from './Topics.typedefinitions';


class TopicService implements TopicServiceInt {
	public async searchTopic(query: string[],limit: number,skip:number) :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			// const query_to_database = { 
			// 	topic_title: {
			// 	    $in: ["Learn","C++"]
			// 	}
			// };
			// 
			// Search by tags
			// const query_to_database = { 
			// 	"topic_title": "Learn dev",
			// };
			// 
			// 
			// const topic = await TopicModel.find({topic_title:{"$in": query }}).limit(limit).skip(skip);
			// { topic_title: { $in:['C++'] } }

			// Get the topics by limit and skip
			const topics = await TopicModel.find().skip(skip).limit(limit);

			// Filter the topics by the query
			let topics_needed : any = [];

			// Filter topics by query
			for ( var i = 0; topics.length > i; i++ ) {

				for ( var io = 0; query.length > io; io++ ) {

					if( topics[i].topic_title.includes(query[io])) {
						topics_needed.push(topics[i])
					}
				}
			}

			// Remove Replucates (Repitition)
			for (var i = 0; topics_needed.length > i; i++) {
				console.log( topics_needed[i]._id == topics_needed[i+1]._id )

				const next = i + 1;

				if ( topics_needed[i]._id == topics_needed[next]._id) {
					topics_needed.splice(next, 1);
				}
			}

			// Skip // Limit
			if (topics_needed.length > 0) {
				return {
					message : null,
					found : true,
					data : topics_needed
				}
			}
			else {
				return {
					message : "No content :-(",
					found : false,
					data : null
				}	
			}
		}
		catch(err){
			return {
				message : null,
				found : false,
				data : null
			}
		}
	}
	public async searchContentInTopic(query: string[], topic_id:string | null, user_session: any, limit: number,skip:number) :Promise<{message: string|null,found:boolean,data:any}>{
			
		try {
			// .find({'$and': [{'Name': {'$in': ['Chris', 'David']}, 'Marks': {'$in': [34,89]}}]});
			// Get from Docs // Skip // Limit // Add upvoted field set to false
			const docs = await DocsModel.find().skip(skip).limit(limit);
			// Get from Courses // Skip // Limit // Add upvoted field set to false
			const courses = await CourseModel.find().skip(skip).limit(limit);
			// Get from Articles // Skip // Limit // Add upvoted field set to false
			const articles = await ArticleModel.find().skip(skip).limit(limit);
			// Get from ProjectIdea // Skip // Limit // Add upvoted field set to false
			const projectIdeas = await ProjectIdeaModel.find().skip(skip).limit(limit);

			if( user_session !== null ) {
				// Check if the user upvoted some of the content in each resource // if logged in
				// if true then set upvoted to true
				const user_id: string = user_session.user.id;
			}

			return {
				message : null,
				found : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null,
				found : false,
				data : null
			}
		}

	}
	public async getTopic (item_id: string, user_session: any, limit: number,skip:number) :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			const topic = await TopicModel.findById(item_id);

			// Get from Docs // Skip // Limit // Add upvoted field set to false
			const docs = await DocsModel.find({ topic_id: item_id }).skip(skip).limit(limit);
			// Get from Courses // Skip // Limit // Add upvoted field set to false
			const courses = await CourseModel.find({ topic_id: item_id }).skip(skip).limit(limit);
			// Get from Articles // Skip // Limit // Add upvoted field set to false
			const articles = await ArticleModel.find({ topic_id: item_id }).skip(skip).limit(limit);
			// Get from ProjectIdea // Skip // Limit // Add upvoted field set to false
			const projectIdeas = await ProjectIdeaModel.find({ topic_id: item_id }).skip(skip).limit(limit);

			if( user_session !== null ) {
				// Check if the user upvoted some of the content in each resource // if logged in
				// if true then set upvoted to true
				const user_id: string = user_session.user.id;
			}

			return {
				message : null,
				found : false,
				data : {
					_id : topic._id,
					user_id : topic.user_id,
					creator_name : topic.creator_name,
					topic_title : topic.topic_title,
					background_image : topic.background_image,
					// docs
					docs : docs,
					// courses
					courses : courses,
					// articels
					articles : articles,
					// projectIdeas
					projectIdeas : projectIdeas
				}
			}
		}
		catch(err){
			return {
				message : null,
				found : false,
				data : null
			}
		}

	}
	public async getTopics (limit:number,skip:number) :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			const topics = await TopicModel.find().skip(skip).limit(limit).exec();
			//
			return {
				message : null,
				found : false,
				data : topics
			}
		}
		catch(err){
			return {
				message : null,
				found : false,
				data : null
			}
		}

	}
	public async addTopic (topic: Topic) :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addtopic = new TopicModel(topic);

			await addtopic.save();
			//
			return {
				message : null,
				added : false,
				data : addtopic
			}
		}
		catch(err){
			return {
				message : null,
				added : false,
				data : null
			}
		}

	}
	public async deleteTopic (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletetopic = await TopicModel.findById(item_id).remove();

			// Delete all of it's content
			const deletingDocs         = await DocsModel.deleteMany({topic_id:item_id});
			const deletingCourses      = await CourseModel.deleteMany({topic_id:item_id});
			const deletingArticles     = await ArticleModel.deleteMany({topic_id:item_id});
			const deletingProjectIdeas = await ProjectIdeaModel.deleteMany({topic_id:item_id});

			return {
				message : null ,deleted : false, data : null
			}
		}
		catch(err){
			return {
				message : null,
				deleted : false,
				data : null
			}
		}

	}

	public async addDocs (docs : Docs) :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const adddocs = new DocsModel(docs);

			await adddocs.save();
			//
			return {
				message : null,
				added : false,
				data : adddocs
			}
		}
		catch(err){
			return {
				message : null,
				added : false,
				data : null
			}
		}

	}
	public async deleteDocs (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletedocs = await DocsModel.findById(item_id).remove();
			//
			return {
				message : null,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null,
				deleted : false,
				data : null
			}
		}

	}

	public async addCourse (course: Course) :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addcourse = new CourseModel(course);

			await addcourse.save();
			//
			return {
				message : null,
				added : false,
				data : addcourse
			}
		}
		catch(err){
			return {
				message : null,
				added : false,
				data : null
			}
		}

	}
	public async deleteCourse (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletecourse = await CourseModel.findById(item_id).remove();
			//
			return {
				message : null,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null,
				deleted : false,
				data : null
			}
		}

	}

	public async addArticle (article: Article) :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addarticle = new ArticleModel(article);

			await addarticle.save();
			//
			return {
				message : null,
				added : false,
				data : addarticle
			}
		}
		catch(err){
			return {
				message : null,
				added : false,
				data : null
			}
		}

	}
	public async deleteArticle (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletearticle = await ArticleModel.findById(item_id).remove();
			// 
			return {
				message : null,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null,
				deleted : false,
				data : null
			}
		}

	}

	public async addProjectIdea (projectIdea: ProjectIdea) :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addprojectidea = new ProjectIdeaModel(projectIdea);
			
			await addprojectidea.save();
			//
			return {
				message : null,
				added : false,
				data : addprojectidea
			}
		}
		catch(err){
			return {
				message : null,
				added : false,
				data : null
			}
		}

	}
	public async deleteProjectIdea (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deleteprojectidea = await ProjectIdeaModel.findById(item_id).remove();
			//
			return {
				message : null,
				deleted : false,
				data : null
			}
		}	
		catch(err){
			return {
				message : null,
				deleted : false,
				data : null
			}
		}

	}
	public async upvote(user_id:string, type:string, resource_id:string) : Promise<boolean>{
		// Find the resource 
			// Check if the user upvoted
			// Upvote the resource and save user id to the upvotes array if not upvoted
			// Down vote the resource and remove user id from the upvotes array if already upvoted
			// Add to upvoted list when he upvoted to the upvoted list
			// Remove the content from the upvoted list of the user
			return false;
	}

}



export default TopicService;