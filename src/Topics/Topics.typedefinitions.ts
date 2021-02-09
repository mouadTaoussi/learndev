interface TopicServiceInt {
	searchTopic()          :Promise<{message: string|null,found  :boolean,data:any}>
	searchContentInTopic() :Promise<{message: string|null,found  :boolean,data:any}>
	getTopic()             :Promise<{message: string|null,found  :boolean,data:any}>
	getTopics(limit:number,skip:number)            :Promise<{message: string|null,found  :boolean,data:any}>
	addTopic()             :Promise<{message: string|null,added  :boolean,data:any}>
	deleteTopic()          :Promise<{message: string|null,deleted:boolean,data:any}>
	addDocs()              :Promise<{message: string|null,added  :boolean,data:any}>
	deleteDocs()           :Promise<{message: string|null,deleted:boolean,data:any}>
	addCourse()            :Promise<{message: string|null,added  :boolean,data:any}>
	deleteCourse()         :Promise<{message: string|null,deleted:boolean,data:any}>
	addArticle()           :Promise<{message: string|null,added  :boolean,data:any}>
	deleteArticle()        :Promise<{message: string|null,deleted:boolean,data:any}>
	addProjectIdea()       :Promise<{message: string|null,added  :boolean,data:any}>
	deleteProjectIdea()    :Promise<{message: string|null,deleted:boolean,data:any}>
}

export { TopicServiceInt };