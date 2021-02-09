import { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel } from './Topics.models';
import { TopicServiceInt } from './Topics.typedefinitions';


class TopicService implements TopicServiceInt {
	public async searchTopic() :Promise<{message: string|null,found:boolean,data:any}>{
		try {

			const topic = await TopicModel;
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
	public async searchContentInTopic() :Promise<{message: string|null,found:boolean,data:any}>{
		try {

			const topic = await TopicModel;
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
	public async getTopic () :Promise<{message: string|null,found:boolean,data:any}>{
		try {
			const topic = await TopicModel;
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
	public async addTopic () :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addtopic = await TopicModel;
			//
			return {
				message : null ,
				added : false,
				data : null
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
	public async deleteTopic () :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletetopic = await TopicModel;
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

	public async addDocs () :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const adddocs = await DocsModel;
			//
			return {
				message : null ,
				added : false,
				data : null
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
	public async deleteDocs () :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletedocs = await DocsModel;
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

	public async addCourse () :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addcourse = await CourseModel;
			//
			return {
				message : null ,
				added : false,
				data : null
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
	public async deleteCourse () :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deletecourse = await CourseModel;
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

	public async addArticle () :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addarticle = await ArticleModel;
			//
			return {
				message : null ,
				added : false,
				data : null
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
	public async deleteArticle () :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const dletearticle = await ArticleModel;
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

	public async addProjectIdea () :Promise<{message: string|null,added:boolean,data:any}>{
		try {
			const addprojectidea = await ProjectIdeaModel;
			//
			return {
				message : null ,
				added : false,
				data : null
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
	public async deleteProjectIdea () :Promise<{message: string|null,deleted:boolean,data:any}>{
		try {
			const deleteprojectidea = await ProjectIdeaModel;
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