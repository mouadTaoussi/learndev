import { Schema, model } from 'mongoose';

const TopicSchema = new Schema({
	user_id : {
		type : String, required : true
	},
	creator_name : {
		type : String, required: true
	},
	topic_title : {
		type : String, required : true
	},
	level : {
		type : String, required: true
	},
	// Search trough the web about an image that relevents to that topic
	background_image : {
		type : String, required : true
	},
});

const DocsSchema = new Schema({
// get metadata about the link in meta tags ( image - title )
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	docs_title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	docs_link  : {
		type : String, required: true
	},
	upvotes : {
		type: Number, required: false, default : 0
	}


});

const CourseSchema = new Schema({
// get metadata about the link in meta tags ( image - title )
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	course_title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	course_link : {
		type : String, required: true
	},
	upvotes : {
		type: Number, required: false, default : 0
	}

});

const ArticleSchema = new Schema({
// get metadata about the link in meta tags ( image - title )
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	article_title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	article_link  : {
		type : String, required: true
	},
	upvotes : {
		type: Number, required: false, default : 0
	}

});

const ProjectIdeaSchema = new Schema({
	user_id : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id: {
		type : String, required: true
	},
	project_idea_title : {
		type : String, required: true
	}, 
	level : {
		type : String, required: true
	},
	description : {
		type : String, required: true
	},
	upvotes : {
		type: Number, required: false, default : 0
	}
});

// docs- courses- articles- projects ideas

const TopicModel       = model('topics',       TopicSchema);
const DocsModel        = model('docs',         DocsSchema);
const CourseModel      = model('courses',      CourseSchema);
const ArticleModel     = model('articles',     ArticleSchema);
const ProjectIdeaModel = model('projectideas', ProjectIdeaSchema);

export { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel };