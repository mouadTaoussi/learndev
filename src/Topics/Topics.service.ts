import { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel } from './Topics.models';
import { TopicServiceInt, Topic, Docs, Course, Article, ProjectIdea } from './Topics.typedefinitions';
import { filterByQuery, sortByUpvotes, removeDuplicates } from "./Topics.functions";


class TopicService implements TopicServiceInt {
	public async searchTopic(query: string[],limit: number,skip:number) :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			// Get the topics by limit and skip
			const topics = await TopicModel.find().skip(skip).limit(limit);
			// const topics = await TopicModel.find();

			// Filter by query
			const topics_needed     = filterByQuery(topics, query);
			
			// Remove duplicates
			const topics_need_to_be_unduplicated = removeDuplicates(topics_needed);

			// Sort them by upvotes
			const topics_to_be_sent = sortByUpvotes(topics_need_to_be_unduplicated);
			
			if (topics_needed.length > 0) {
				return {
					message : null,
					found : true,
					data : topics_to_be_sent
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

			// Filter by query
			const docs_needed          = filterByQuery(docs, query);
			const courses_needed       = filterByQuery(courses, query);
			const articles_needed      = filterByQuery(articles, query);
			const project_ideas_needed = filterByQuery(projectIdeas, query);

			// Remove duplicates
			const docs_need_to_be_unduplicated          = removeDuplicates(docs_needed);
			const courses_need_to_be_unduplicated       = removeDuplicates(courses_needed);
			const articles_need_to_be_unduplicated      = removeDuplicates(articles_needed);
			const project_ideas_need_to_be_unduplicated = removeDuplicates(project_ideas_needed);

			// Sort them by upvotes
			const docs_to_be_sent          = sortByUpvotes(docs_need_to_be_unduplicated);
			const courses_to_be_sent       = sortByUpvotes(courses_need_to_be_unduplicated);
			const articles_to_be_sent      = sortByUpvotes(articles_need_to_be_unduplicated);
			const project_ideas_to_be_sent = sortByUpvotes(project_ideas_need_to_be_unduplicated);


			if( user_session !== null ) {
				// Check if the user upvoted some of the content in each resource // if logged in
				// if true then set upvoted to true
				const user_id: string = user_session.user.id;

				for ( var i = 0; docs_to_be_sent.length > i; i++ ) {

					if (docs_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						docs_to_be_sent[i].upvoted = true;
					} 
					else {
						// set upvoted to false 
						docs_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the courses
				for ( var i = 0; courses_to_be_sent.length > i; i++ ) {

					if (courses_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						courses_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						courses_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the articles
				for ( var i = 0; articles_to_be_sent.length > i; i++ ) {

					if (articles_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						articles_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						articles_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the projectIdeas
				for ( var i = 0; project_ideas_to_be_sent.length > i; i++ ) {

					if (project_ideas_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						project_ideas_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						project_ideas_to_be_sent[i].upvoted = false;
					}
				}
			}
			else{
				for ( var i = 0; docs_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					docs_to_be_sent[i].upvoted = false;
				}
				// Check in the courses
				for ( var i = 0; courses_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					courses_to_be_sent[i].upvoted = false;
				}
				// Check in the articles
				for ( var i = 0; articles_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					articles_to_be_sent[i].upvoted = false;
				}
				// Check in the projectIdeas
				for ( var i = 0; project_ideas_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					project_ideas_to_be_sent[i].upvoted = false;
				}
			}
			return {
				message : null,
				found : false,
				data : {
					docs         :docs_to_be_sent,
					courses      :courses_to_be_sent,
					articles     :articles_to_be_sent,
					project_idea :project_ideas_to_be_sent
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

			// Sort them by upvotes
			const docs_to_be_sent          = sortByUpvotes(docs);
			const courses_to_be_sent       = sortByUpvotes(courses);
			const articles_to_be_sent      = sortByUpvotes(articles);
			const project_ideas_to_be_sent = sortByUpvotes(projectIdeas);
			
			if( user_session !== null ) {
				// Check if the user upvoted some of the content in each resource // if logged in
				// if true then set upvoted to true
				const user_id: string = user_session.user.id;
				// Check in the docs
				for ( var i = 0; docs_to_be_sent.length > i; i++ ) {

					if (docs_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						docs_to_be_sent[i].upvoted = true;
					} 
					else {
						// set upvoted to false 
						docs_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the courses
				for ( var i = 0; courses_to_be_sent.length > i; i++ ) {

					if (courses_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						courses_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						courses_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the articles
				for ( var i = 0; articles_to_be_sent.length > i; i++ ) {

					if (articles_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						articles_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						articles_to_be_sent[i].upvoted = false;
					}
				}
				// Check in the projectIdeas
				for ( var i = 0; project_ideas_to_be_sent.length > i; i++ ) {

					if (project_ideas_to_be_sent[i].upvotes.includes(user_id)) {
						// set upvoted to true
						project_ideas_to_be_sent[i].upvoted = true;
					}
					else {
						// set upvoted to false 
						project_ideas_to_be_sent[i].upvoted = false;
					}
				}
			}
			else{
				for ( var i = 0; docs_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					docs_to_be_sent[i].upvoted = false;
				}
				// Check in the courses
				for ( var i = 0; courses_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					courses_to_be_sent[i].upvoted = false;
				}
				// Check in the articles
				for ( var i = 0; articles_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					articles_to_be_sent[i].upvoted = false;
				}
				// Check in the projectIdeas
				for ( var i = 0; project_ideas_to_be_sent.length > i; i++ ) {
					// set upvoted to false 
					project_ideas_to_be_sent[i].upvoted = false;
				}
			}
			return {
				message : null,
				found : false,
				data : {
					_id : topic._id,
					user_id : topic.user_id,
					creator_name : topic.creator_name,
					title : topic.title,
					background_image : topic.background_image,
					// docs
					docs : docs_to_be_sent,
					// courses
					courses : courses_to_be_sent,
					// articels
					articles : articles_to_be_sent,
					// projectIdeas
					project_idea : project_ideas_to_be_sent
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

			// Filter topics by user interests
			// Filter topics by users interests
			// Filter topics by content volume 
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
	public async getUserTopics (user_id: string) :Promise<{message:string|null,found:boolean,data:any}> {
		try {
			const topics = await TopicModel.find({user_id : user_id});
			return {
				message: null,
				found  : true,
				data   : topics
			}
		}catch(err){
			return {
				message: 'Something went wrong!',
				found  : false,
				data   : null
			}
		}
	}
	public async getUpvotedContent(user_id: string) :Promise<{message: string|null,found:boolean,data:any}> {
			try{
				// Get docs
				const docs = await DocsModel.find({upvotes : user_id});
				// Get articels
				const articles = await ArticleModel.find({upvotes : user_id});
				// Get courses
				const course = await CourseModel.find({upvotes : user_id});
				// Get projectIdeas
				let output = await ProjectIdeaModel.find({upvotes : user_id});
				
				// Merge them into single place
				for (var i = 0; i < docs.length; i++) {
					// code...
					output.push(docs[i])
				}
				for (var i = 0; i < articles.length; i++) {
					// code...
					output.push(articles[i])
				}
				for (var i = 0; i < course.length; i++) {
					// code...
					output.push(course[i])
				}

				// set upvoted to true
				for ( var i = 0; output.length > i; i++ ) {
					output[i].upvoted = true;
				}
				
				return {
					message: null,
					found  : true,
					data   : output
				}
			}
			catch(err){
				return {
					message: "Something went wrong!",
					found  : false,
					data   : null
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
		// Find the right resource
		let resource: any = null;

		if (type == "docs"){
			resource = await DocsModel.findOne({_id : resource_id});
		} 
		if (type == "course"){
			resource = await CourseModel.findOne({_id : resource_id});
		}
		if (type == "article"){
			resource = await ArticleModel.findOne({_id : resource_id});
		}
		if (type == "projectidea"){
			resource = await ProjectIdeaModel.findOne({_id : resource_id});
		}

		// Check if the user upvoted
		if (resource.upvotes.includes(user_id)) {
			
			// Down vote the resource and remove user id from the upvotes array if already upvoted
			// Get the index of the user in upvotes
			const index_of_upvote = resource.upvotes.indexOf(user_id);

			// Delete that upvote
			resource.upvotes.splice(index_of_upvote, 1);

			// Decrease upvotes_count 
			resource.upvotes_count--;

			await resource.save();

			// false means that the user removed the upvoted
			return false
		}
		else {
			
			// Upvote the resource and save user id to the upvotes array if not upvoted
			resource.upvotes.push(user_id);

			// Increase upvotes_count 
			resource.upvotes_count++;

			await resource.save();
			
			// true means that the user is upvoted
			return true;
		}
		// Add to upvoted list when he upvoted to the upvoted list
		// Remove the content from the upvoted list of the user
	}

}

export default TopicService;


// const query_to_database = { 
			// 	title: {
			// 	    $in: ["Learn","C++"]
			// 	}
			// };
			// 
			// Search by tags
			// const query_to_database = { 
			// 	"title": "Learn dev",
			// };
			// 
			// 
			// const topic = await TopicModel.find({title:{"$in": query }}).limit(limit).skip(skip);
			// { title: { $in:['C++'] } }


			// // Filter the topics by the query
			// let topics_needed : any = [];

			// // Filter topics by query
			// for ( var i = 0; topics.length > i; i++ ) {

			// 	for ( var io = 0; query.length > io; io++ ) {

			// 		if( topics[i].title.includes(query[io])) {
			// 			topics_needed.push(topics[i])
			// 		}
			// 	}
			// }

			// // Remove Replucates (Repitition)
			// for (var i = 0; topics_needed.length > i; i++) {
			// 	console.log( topics_needed[i]._id == topics_needed[i+1]._id )

			// 	const next = i + 1;

			// 	if ( topics_needed[i]._id == topics_needed[next]._id) {
			// 		topics_needed.splice(next, 1);
			// 	}
			// }