export function filterByQuery( items_to_be_processed: any, query: any ) {
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

export function removeDuplicates( items_to_be_processed: any ){
	// Remove Replucates (Repitition)
	console.log("items_to_be_processed")
	for (var i = 0; items_to_be_processed.length > i; i++) {
		console.log(1)
		const next = i + 1;
		console.log(2)
		console.log(items_to_be_processed[i]._id == items_to_be_processed[next]._id)
		if ( items_to_be_processed[i]._id == items_to_be_processed[next]._id ) {
		console.log(3)
			items_to_be_processed.splice(next, 1);
		}
		console.log(4)
	}
	console.log(5)
	// Return 
	return items_to_be_processed;
}

