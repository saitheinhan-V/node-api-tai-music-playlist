function Artist(artistId, artistName, artistProfile, rankOrder) {      
    this.artistId = artistId || null;
    this.artistName = artistName || null;
    this.artistProfile = artistProfile || null;
    this.rankOrder = rankOrder || null;
}

Artist.prototype.getArtistId = function() {
    return this.artistId;
}

Artist.prototype.setArtistId = function(artistId) {
    this.artistId = artistId;
}

Artist.prototype.getArtistName = function() {
    return this.artistName;
}

Artist.prototype.setArtistName = function(artistName) {
    this.artistName = artistName;
}

Artist.prototype.getArtistProfile = function() {
    return this.artistProfile;
}

Artist.prototype.setArtistProfile = function(artistProfile) {
    this.artistProfile = artistProfile;
}

Artist.prototype.getRankOrder = function() {
    return this.rankOrder;
}

Artist.prototype.setRankOrder = function(rankOrder) {
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

module.exports = Artist;