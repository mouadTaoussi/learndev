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

	return items_to_be_processed;

}