/// <reference path="./index.ts" />
var PlayControlPlayerAudiofile;
(function (PlayControlPlayerAudiofile) {
    PlayControlPlayerAudiofile.getCompressionType = function (pathArg) {
        var compressionType;
        var fileType = PlayControlPlayerAudiofile.getFileType(pathArg);
        switch (fileType) {
            case "mp3":
                compressionType = "lossy";
                break;
            case "m4v":
            case "flac":
                compressionType = "lossless";
                break;
            default:
                plugins.beautylog.error("Filetype not recognised: " + fileType);
                compressionType = "unknown";
                break;
        }
        ;
        return compressionType;
    };
    PlayControlPlayerAudiofile.getFileType = function (pathArg) {
        var fileType = plugins.pathParse(pathArg).ext;
        fileType = fileType.replace(/\.([a-z]*)/, "$1"); //remove . form fileType
        return fileType;
    };
    PlayControlPlayerAudiofile.getLocationType = function (pathArg) {
        return "local";
    };
})(PlayControlPlayerAudiofile || (PlayControlPlayerAudiofile = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXljb250cm9sLnBsYXllci5hdWRpb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLElBQU8sMEJBQTBCLENBNkJoQztBQTdCRCxXQUFPLDBCQUEwQixFQUFDLENBQUM7SUFDcEIsNkNBQWtCLEdBQUcsVUFBUyxPQUFjO1FBQ25ELElBQUksZUFBc0IsQ0FBQztRQUMzQixJQUFJLFFBQVEsR0FBRyxzQ0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDZCxLQUFLLEtBQUs7Z0JBQ04sZUFBZSxHQUFHLE9BQU8sQ0FBQztnQkFDMUIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLE1BQU07Z0JBQ1AsZUFBZSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQ2hFLGVBQWUsR0FBRyxTQUFTLENBQUE7Z0JBQzNCLEtBQUssQ0FBQztRQUNkLENBQUM7UUFBQSxDQUFDO1FBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFUyxzQ0FBVyxHQUFHLFVBQVMsT0FBTztRQUNyQyxJQUFJLFFBQVEsR0FBVSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDeEUsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFUywwQ0FBZSxHQUFHLFVBQVMsT0FBTztRQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUMsQ0FBQTtBQUNMLENBQUMsRUE3Qk0sMEJBQTBCLEtBQTFCLDBCQUEwQixRQTZCaEMiLCJmaWxlIjoicGxheWNvbnRyb2wucGxheWVyLmF1ZGlvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2luZGV4LnRzXCIgLz5cbm1vZHVsZSBQbGF5Q29udHJvbFBsYXllckF1ZGlvZmlsZSB7XG4gICAgZXhwb3J0IHZhciBnZXRDb21wcmVzc2lvblR5cGUgPSBmdW5jdGlvbihwYXRoQXJnOnN0cmluZykge1xuICAgICAgICB2YXIgY29tcHJlc3Npb25UeXBlOnN0cmluZztcbiAgICAgICAgdmFyIGZpbGVUeXBlID0gZ2V0RmlsZVR5cGUocGF0aEFyZyk7XG4gICAgICAgIHN3aXRjaCAoZmlsZVR5cGUpe1xuICAgICAgICAgICAgY2FzZSBcIm1wM1wiOlxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uVHlwZSA9IFwibG9zc3lcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtNHZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJmbGFjXCI6XG4gICAgICAgICAgICAgICAgY29tcHJlc3Npb25UeXBlID0gXCJsb3NzbGVzc1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcIkZpbGV0eXBlIG5vdCByZWNvZ25pc2VkOiBcIiArIGZpbGVUeXBlKTtcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvblR5cGUgPSBcInVua25vd25cIlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29tcHJlc3Npb25UeXBlO1xuICAgIH07XG5cbiAgICBleHBvcnQgdmFyIGdldEZpbGVUeXBlID0gZnVuY3Rpb24ocGF0aEFyZykge1xuICAgICAgICB2YXIgZmlsZVR5cGU6c3RyaW5nID0gcGx1Z2lucy5wYXRoUGFyc2UocGF0aEFyZykuZXh0O1xuICAgICAgICBmaWxlVHlwZSA9IGZpbGVUeXBlLnJlcGxhY2UoL1xcLihbYS16XSopLyxcIiQxXCIpOyAvL3JlbW92ZSAuIGZvcm0gZmlsZVR5cGVcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlO1xuICAgIH07XG5cbiAgICBleHBvcnQgdmFyIGdldExvY2F0aW9uVHlwZSA9IGZ1bmN0aW9uKHBhdGhBcmcpe1xuICAgICAgICByZXR1cm4gXCJsb2NhbFwiO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
