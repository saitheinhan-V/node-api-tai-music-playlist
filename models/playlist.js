function Playlist(playlistId, userId, songIdList, playlistName, createdDate) {      
    this.playlistId = playlistId || null;
    this.playlistName = playlistName || null;
    this.songIdList = songIdList || "";
    this.userId = userId || null;
    this.createdDate = createdDate || null;

}

Playlist.prototype.getPlaylistId = function() {
    return this.playlistId;
}

Playlist.prototype.setPlaylistId = function(playlistId) {
    this.playlistId = playlistId;
}

Playlist.prototype.getUserId = function() {
    return this.userId;
}

Playlist.prototype.setUserId = function(userId) {
    this.userId = userId;
}

Playlist.prototype.getPlaylistName = function() {
    return this.playlistName;
}

Playlist.prototype.setPlaylistName = function(playlistName) {
    this.playlistName = playlistName;
}

Playlist.prototype.getCreatedDate = function() {
    return this.createdDate;
}

Playlist.prototype.setCreatedDate = function(createdDate) {
    this.createdDate = createdDate;
}

Playlist.prototype.getSongIdList = function() {
    return this.songIdList;
}

Playlist.prototype.setSongIdList = function(songIdList) {
    this.songIdList = songIdList;
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

module.exports = Playlist;