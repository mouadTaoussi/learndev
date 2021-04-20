import { Topic } from "./Topics.typedefinitions";

export function filterByQuery( items_to_be_processed: any, query: any ) :unknown | any {
	const items_needed = [];
	// Filter topics by query
	for ( var i = 0; items_to_be_processed.length > i; i++ ) {
		for ( var io = 0; query.length > io; io++ ) {

			if( items_to_be_processed[i].title.toLowerCase().includes(query[io].toLowerCase()) ) {
				items_needed.push(items_to_be_processed[i]);
			}
		}
	}
	// Return 
	return items_needed;
}

export function removeDuplicates( items_to_be_processed: any ) :unknown | any {
	// Remove Replucates (Repitition)
	for (var i = 0; items_to_be_processed.length > i; i++) {

		const next = i + 1;
		if (items_to_be_processed[i+1] !== undefined) {
			if ( items_to_be_processed[i]._id == items_to_be_processed[next]._id) {
				items_to_be_processed.splice(next, 1);
			}
			else {
				continue
			}
		}
		else {
			continue
		}
	}
	// // Return 
	return items_to_be_processed;
}


export function sortByUpvotes ( items_to_be_processed: any ) :unknown | any {
	// Cannot pass this block
	for (var i = 0; i < items_to_be_processed.length ; i++) {
		if (items_to_be_processed[i].upvotes_count > items_to_be_processed[i+1].upvotes_count){
			console.log(0)
			const smallerValue = items_to_be_processed[i+1];
			const greaterValue = items_to_be_processed[i];
			// Swap the two elements
			items_to_be_processed[i]   = smallerValue;
			items_to_be_processed[i+1] = greaterValue;
			console.log("////////////////////////////////////////////")
			console.log(items_to_be_processed[i])
			console.log(items_to_be_processed[i]+1)
		}
		else {
			console.log(2222222222)
			// continue
		}
	}
		console.log("2")
	// Check if it is sorted
	let isSorted = true;

	for(var j = 0 ; j < items_to_be_processed.length - 1 ; j++){

		if(items_to_be_processed[j].upvotes_count > items_to_be_processed[j+1].upvotes_count) {
			isSorted = false;
			break;
		}
	}
	if (isSorted == false) {
		console.log("3")
		// Resort the array
		sortByUpvotes(items_to_be_processed)
	}
	console.log("4")
	// dont resort it and return the finale results
	return items_to_be_processed
	
	console.log(items_to_be_processed)
}