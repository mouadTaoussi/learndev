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
			else { continue }
		}
		else { continue }
	}
	// // Return 
	return items_to_be_processed;
}


export function sortByUpvotes ( items_to_be_processed: any ) :unknown | any {
	// Cannot pass this block
	for (var i = 0; i < items_to_be_processed.length - 1 ; i++) {
		// one_step_index
		const one_step_index = i + 1;

		if (items_to_be_processed[i].upvotes_count > items_to_be_processed[one_step_index].upvotes_count){
			// The array is sorted from greater to smaller values
			continue;
		}
		else {
			// ERRRR!!!
			// Reverse the two elemnets
			const smallerValue = items_to_be_processed[i]; // SMALLER VALUE IS BEFORE THE GREATER ONE
			const greaterValue = items_to_be_processed[one_step_index]; // GREATER VALUE ID AFTER THE SMALLER ONE
			// Swap the two elements
			items_to_be_processed[i]   = greaterValue; // <<< SWAP THE GRATER VALUE LEFT OF THE ARRAY <<<
			items_to_be_processed[one_step_index] =  smallerValue; // >>> SWAP THE SMALLER VALUE RIGHT OF THE ARRAY >>>
			console.log('8888888888')
		}
	}
	console.log('hhhalf')
	// Check if it is sorted
	let isSorted = true;

	for(var j = 0 ; j < items_to_be_processed.length - 1 ; j++){
		// one_step_index
		const one_step_index = j + 1; 

		if(items_to_be_processed[j].upvotes_count > items_to_be_processed[one_step_index].upvotes_count) {
			console.log("Sorted")
			continue;
		}else {
			console.log("not")
			isSorted = false;
			break;
		}
	}
	if (isSorted == false) {
		// Resort the array // recursive function
		sortByUpvotes(items_to_be_processed)
		console.log("not worted")
	}

	// dont resort it and return the finale results
	return items_to_be_processed
	
}