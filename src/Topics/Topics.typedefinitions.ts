interface TopicServiceInt {
	searchTopic(query: string[])          :Promise<{message: string|null,found  :boolean,data:any}>
	searchContentInTopic(query: string[]) :Promise<{message: string|null,found  :boolean,data:any}>
	
	getTopic(item_id: string)                :Promise<{message: string|null,found  :boolean,data:any}>
	getTopics(limit:number,skip:number)      :Promise<{message: string|null,found  :boolean,data:any}>

	addTopic(topic: Topic)                   :Promise<{message: string|null,added  :boolean,data:any}>
	deleteTopic(item_id: string)             :Promise<{message: string|null,deleted:boolean,data:any}>
	
	addDocs(docs: Docs)            :Promise<{message: string|null,added  :boolean,data:any}>
	deleteDocs(item_id: string)    :Promise<{message: string|null,deleted:boolean,data:any}>
	
	addCourse(course: Course)      :Promise<{message: string|null,added  :boolean,data:any}>
	deleteCourse(item_id: string)  :Promise<{message: string|null,deleted:boolean,data:any}>
	
	addArticle(article: Article)   :Promise<{message: string|null,added  :boolean,data:any}>
	deleteArticle(item_id: string) :Promise<{message: string|null,deleted:boolean,data:any}>
	
	addProjectIdea(projectIdea: ProjectIdea) :Promise<{message: string|null,added  :boolean,data:any}>
	deleteProjectIdea(item_id: string)       :Promise<{message: string|null,deleted:boolean,data:any}>
	
	upvote(user_id:string, type:string, resource_id:string) : Promise<boolean>
}

type Topic = {
	user_id          :string,
	creator_name     :string,
	topics_title     :string,
	level            :string,
	background_image :string
}
type Docs = {
	user_id	     : string,
	creator_name : string,
	topic_id     : string,
	docs_title   : string,
	level        : string,
	docs_link    : string
}
type Course = {
	user_id	     : string,
	creator_name : string,
	topic_id     : string,
	course_title : string,
	level        : string,
	course_link  : string
}
type Article = {
	user_id	     : string,
	creator_name : string,
	topic_id     : string,
	article_title: string,
	level        : string,
	article_link : string
}
type ProjectIdea = {
	user_id      : string,
	creator_name : string,
	topic_id     : string,
	project_idea_title : string, 
	level        : string,
	description  : string
}
export { TopicServiceInt, Topic, Docs, Course, Article, ProjectIdea };