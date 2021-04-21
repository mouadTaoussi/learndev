"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByUpvotes = exports.removeDuplicates = exports.filterByQuery = void 0;
function filterByQuery(items_to_be_processed, query) {
    const items_needed = [];
    for (var i = 0; items_to_be_processed.length > i; i++) {
        for (var io = 0; query.length > io; io++) {
            if (items_to_be_processed[i].title.toLowerCase().includes(query[io].toLowerCase())) {
                items_needed.push(items_to_be_processed[i]);
            }
        }
    }
    return items_needed;
}
exports.filterByQuery = filterByQuery;
function removeDuplicates(items_to_be_processed) {
    for (var i = 0; items_to_be_processed.length > i; i++) {
        const next = i + 1;
        if (items_to_be_processed[i + 1] !== undefined) {
            if (items_to_be_processed[i]._id == items_to_be_processed[next]._id) {
                items_to_be_processed.splice(next, 1);
            }
            else {
                continue;
            }
        }
        else {
            continue;
        }
    }
    return items_to_be_processed;
}
exports.removeDuplicates = removeDuplicates;
function sortByUpvotes(items_to_be_processed) {
    for (var i = 0; i < items_to_be_processed.length - 1; i++) {
        const one_step_index = i + 1;
        if (items_to_be_processed[i].upvotes_count > items_to_be_processed[one_step_index].upvotes_count) {
            continue;
        }
        else {
            const smallerValue = items_to_be_processed[i];
            const greaterValue = items_to_be_processed[one_step_index];
            items_to_be_processed[i] = greaterValue;
            items_to_be_processed[one_step_index] = smallerValue;
            console.log('8888888888');
        }
    }
    console.log('hhhalf');
    let isSorted = true;
    for (var j = 0; j < items_to_be_processed.length - 1; j++) {
        const one_step_index = j + 1;
        if (items_to_be_processed[j].upvotes_count > items_to_be_processed[one_step_index].upvotes_count) {
            console.log("Sorted");
            continue;
        }
        else {
            console.log("not");
            isSorted = false;
            break;
        }
    }
    if (isSorted == false) {
        sortByUpvotes(items_to_be_processed);
        console.log("not worted");
    }
    return items_to_be_processed;
}
exports.sortByUpvotes = sortByUpvotes;
