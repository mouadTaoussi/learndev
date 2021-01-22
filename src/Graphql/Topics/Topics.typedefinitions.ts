interface topicResolver {
	getTopic(topic_id: string) :Promise<any>
	getTopics(topic_id: string) :Promise<any>
	addTopic(topic_id: string) :Promise<any>
	deleteTopic(topic_id: string) :Promise<any>
}
interface docsResolver {
	addDocs(new_docs: DocsInput) :Promise<any>
	deleteDocs(docs_id: string) :Promise<any> 
}
interface courseResolver {
	addCourse(new_course: CourseInput) : Promise<any>
	deleteCourse(course_id: string) : Promise<any>
}
interface articleResolver {
	addArticle(new_article: ArticleInput) : Promise<any>
	deleteArticle(article_id: string) : Promise<any>
}
interface projectIdeaResolver {
	addProjectIdea( new_project_idea: ProjectIdeaInput) : Promise<any>
	deleteProjectIdea( project_idea_id: string) : Promise<any>
}

export  {
	topicResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver
}