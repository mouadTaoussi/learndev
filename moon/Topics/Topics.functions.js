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
    return items_to_be_processed;
}
exports.sortByUpvotes = sortByUpvotes;
