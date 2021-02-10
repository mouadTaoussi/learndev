import { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel } from './Topics.models';
import { TopicServiceInt, Topic, Docs, Course, Article, ProjectIdea } from './Topics.typedefinitions';


class TopicService implements TopicServiceInt {
	public async searchTopic(query: string[]) :Promise<{message: string|null,found:boolean,data:any}>{
		try {

			const topic = await TopicModel;
			// .find({'$and': [{'Name': {'$in': ['Chris', 'David']}, 'Marks': {'$in': [34,89]}}]});
			return {
				message : null ,
				found : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
				found : false,
				data : null
			}
		}
	}
	public async searchContentInTopic(query: string[]) :Promise<{message: string|null,found:boolean,data:any}>{
		try {

			const topic = await TopicModel;
			// .find({'$and': [{'Name': {'$in': ['Chris', 'David']}, 'Marks': {'$in': [34,89]}}]});
			return {
				message : null ,
				found : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
				found : false,
				data : null
			}
		}

	}
	public async getTopic (item_id: string) :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			const topic = await TopicModel.findById(item_id);
			//
			return {
				message : null ,
				found : false,
				data : topic
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				found : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				added : false,
				data : addtopic
			}
		}
		catch(err){
			return {
				message : null ,
				added : false,
				data : null
			}
		}

	}
	public async deleteTopic (item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletetopic = await TopicModel.findById(item_id).remove();
			//
			return {
				message : null ,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				added : false,
				data : adddocs
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				added : false,
				data : addcourse
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				added : false,
				data : addarticle
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				deleted : false,
				data : null
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				added : false,
				data : addprojectidea
			}
		}
		catch(err){
			return {
				message : null ,
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
				message : null ,
				deleted : false,
				data : null
			}
		}	
		catch(err){
			return {
				message : null ,
				deleted : false,
				data : null
			}
		}

	}

}



export default TopicService;