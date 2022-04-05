function Genre(genreId, genreName, genreProfile, rankOrder) {      
    this.genreId = genreId || null;
    this.genreName = genreName || null;
    this.genreProfile = genreProfile || null;
    this.rankOrder = rankOrder || null;
}

Genre.prototype.getGenreId = function() {
    return this.genreId;
}

Genre.prototype.setGenreId = function(genreId) {
    this.genreId = genreId;
}

Genre.prototype.getGenreName = function() {
    return this.genreName;
}

Genre.prototype.setGenreName = function(genreName) {
    this.genreName = genreName;
}

Genre.prototype.getGenreProfile = function() {
    return this.genreProfile;
}

Genre.prototype.setGenreProfile = function(genreProfile) {
    this.genreProfile = genreProfile;
}

Genre.prototype.getRankOrder = function() {
    return this.rankOrder;
}

Genre.prototype.setRankOrder = function(rankOrder) {
    this.rankOrder = rankOrder;
}


// Cat.prototype.equals = function(otherCat) {
//     return otherCat.getName() == this.getName()
//         && otherCat.getAge() == this.getAge();
// }

// Cat.prototype.fill = function(newFields) {
//     for (var field in newFields) {
//         if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
//             if (this[field] !== 'undefined') {
//                 this[field] = newFields[field];
//             }
//         }
//     }
// };

module.exports = Genre;