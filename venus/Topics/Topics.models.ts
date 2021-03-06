import { Schema, model } from 'mongoose';

const TopicSchema = new Schema({
	user_id : {
		type : String, required : true
	},
	creator_name : {
		type : String, required : true
	},
	title : {
		type : String, required : true
	},
	upvotes_count : {
		type : Number, default: 0, required: false
	},
	// Search trough the web about an image that relevents to that topic
	background_image : {
		type : String, required : true
	},
	// tags : [{type: String}]
});

const DocsSchema = new Schema({
	
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	link  : {
		type : String, required: true
	},
	upvotes_count : {
		type : Number, default: 0, required: false
	},
	upvotes : [{type: String}],
	// tags : [{type: String}]
});

const CourseSchema = new Schema({
	
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	link : {
		type : String, required: true
	},
	upvotes_count : {
		type : Number, default: 0, required: false
	},
	upvotes : [{type: String}],
	// tags : [{type: String}]
});

const ArticleSchema = new Schema({
	
	user_id	 : {
		type : String, required: true
	},
	creator_name : {
		type : String, required: true
	},
	topic_id : {
		type : String, required: true
	},
	title : {
		type : String, required: true
	},
	level : {
		type : String, required: true
	},
	link  : {
		type : String, required: true
	},
	upvotes_count : {
		type : Number, default: 0, required: false
	},
	upvotes : [{type: String}],
	// tags : [{type: String}]

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
	title : {
		type : String, required: true
	}, 
	level : {
		type : String, required: true
	},
	description : {
		type : String, required: true
	},
	upvotes_count : {
		type : Number, default: 0, required: false
	},
	upvotes : [{type: String}],
	// tags : [{type: String}]
});

// docs- courses- articles- projects ideas

const TopicModel       = model('topics',       TopicSchema);
const DocsModel        = model('docs',         DocsSchema);
const CourseModel      = model('courses',      CourseSchema);
const ArticleModel     = model('articles',     ArticleSchema);
const ProjectIdeaModel = model('projectideas', ProjectIdeaSchema);

export { TopicModel, DocsModel, CourseModel, ArticleModel, ProjectIdeaModel };