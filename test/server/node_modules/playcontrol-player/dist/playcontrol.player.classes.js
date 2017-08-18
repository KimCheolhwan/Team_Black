/// <reference path="./index.ts" />
var Player = (function () {
    function Player() {
    }
    Player.prototype.playAudiofile = function (audiofileArg) {
        var _this = this;
        plugins.beautylog.info("Playing audio from " + audiofileArg.path.blue);
        plugins.beautylog.info("File Type is " + audiofileArg.fileType.blue);
        plugins.beautylog.info("Compression Type is " + audiofileArg.compressionType.blue);
        if (audiofileArg.compressionType === "lossy") {
            plugins.beautylog.warn("you are playing back a lossy file.");
        }
        else if (audiofileArg.compressionType === "lossless") {
            plugins.beautylog.success("you are playing back a lossless file.");
        }
        else {
            plugins.beautylog.error("check the specified file");
        }
        if (audiofileArg.locationType === "local") {
            plugins.beautylog.log("locationType is local");
            this.player = plugins.av.Player.fromFile(audiofileArg.path);
            this.player.play();
        }
        else if (audiofileArg.locationType === "server") {
            this.player = plugins.av.Player.fromURL(audiofileArg.path);
            this.player.preload();
            this.player.on('ready', function () {
                console.log("ready");
                _this.player.play();
            });
        }
    };
    ;
    Player.prototype.playFromPath = function () {
    };
    ;
    Player.prototype.playFromFS = function (pathArg) {
        var audiofile = new Audiofile(pathArg);
        this.playAudiofile(audiofile);
    };
    ;
    Player.prototype.playFromUrl = function (pathArg) {
        var audiofile = new Audiofile(pathArg);
        audiofile.locationType = "server";
        this.playAudiofile(audiofile);
    };
    Player.prototype.volume = function (percentageArg) {
        this.player.volume = percentageArg;
    };
    Player.prototype.currentTime = function () {
    };
    return Player;
}());
var Audiofile = (function () {
    function Audiofile(pathArg) {
        this.path = plugins.path.resolve(pathArg);
        this.compressionType = PlayControlPlayerAudiofile.getCompressionType(pathArg);
        this.locationType = PlayControlPlayerAudiofile.getLocationType(pathArg);
        this.fileType = PlayControlPlayerAudiofile.getFileType(pathArg);
    }
    ;
    return Audiofile;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXljb250cm9sLnBsYXllci5jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQztJQUVJO0lBRUEsQ0FBQztJQUNELDhCQUFhLEdBQWIsVUFBYyxZQUFzQjtRQUFwQyxpQkF3QkM7UUF2QkcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25GLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUVMLENBQUM7O0lBQ0QsNkJBQVksR0FBWjtJQUVBLENBQUM7O0lBQ0QsMkJBQVUsR0FBVixVQUFXLE9BQWM7UUFDckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDOztJQUNELDRCQUFXLEdBQVgsVUFBWSxPQUFjO1FBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELHVCQUFNLEdBQU4sVUFBTyxhQUFvQjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUNELDRCQUFXLEdBQVg7SUFFQSxDQUFDO0lBQ0wsYUFBQztBQUFELENBaERBLEFBZ0RDLElBQUE7QUFFRDtJQUtJLG1CQUFZLE9BQU87UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsMEJBQTBCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsR0FBRywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7SUFFTCxnQkFBQztBQUFELENBWkEsQUFZQyxJQUFBIiwiZmlsZSI6InBsYXljb250cm9sLnBsYXllci5jbGFzc2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW5kZXgudHNcIiAvPlxuY2xhc3MgUGxheWVyIHtcbiAgICBwbGF5ZXI7XG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBwbGF5QXVkaW9maWxlKGF1ZGlvZmlsZUFyZzpBdWRpb2ZpbGUpe1xuICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5pbmZvKFwiUGxheWluZyBhdWRpbyBmcm9tIFwiICsgYXVkaW9maWxlQXJnLnBhdGguYmx1ZSk7XG4gICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJGaWxlIFR5cGUgaXMgXCIgKyBhdWRpb2ZpbGVBcmcuZmlsZVR5cGUuYmx1ZSk7XG4gICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJDb21wcmVzc2lvbiBUeXBlIGlzIFwiICsgYXVkaW9maWxlQXJnLmNvbXByZXNzaW9uVHlwZS5ibHVlKTtcbiAgICAgICAgaWYgKGF1ZGlvZmlsZUFyZy5jb21wcmVzc2lvblR5cGUgPT09IFwibG9zc3lcIikge1xuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cud2FybihcInlvdSBhcmUgcGxheWluZyBiYWNrIGEgbG9zc3kgZmlsZS5cIik7XG4gICAgICAgIH0gZWxzZSBpZiAoYXVkaW9maWxlQXJnLmNvbXByZXNzaW9uVHlwZSA9PT0gXCJsb3NzbGVzc1wiKSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5zdWNjZXNzKFwieW91IGFyZSBwbGF5aW5nIGJhY2sgYSBsb3NzbGVzcyBmaWxlLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiY2hlY2sgdGhlIHNwZWNpZmllZCBmaWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdWRpb2ZpbGVBcmcubG9jYXRpb25UeXBlID09PSBcImxvY2FsXCIpIHtcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmxvZyhcImxvY2F0aW9uVHlwZSBpcyBsb2NhbFwiKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGx1Z2lucy5hdi5QbGF5ZXIuZnJvbUZpbGUoYXVkaW9maWxlQXJnLnBhdGgpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvZmlsZUFyZy5sb2NhdGlvblR5cGUgPT09IFwic2VydmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGx1Z2lucy5hdi5QbGF5ZXIuZnJvbVVSTChhdWRpb2ZpbGVBcmcucGF0aCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5wcmVsb2FkKCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5vbigncmVhZHknLCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlYWR5XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHBsYXlGcm9tUGF0aCgpe1xuXG4gICAgfTtcbiAgICBwbGF5RnJvbUZTKHBhdGhBcmc6c3RyaW5nKXtcbiAgICAgICAgdmFyIGF1ZGlvZmlsZSA9IG5ldyBBdWRpb2ZpbGUocGF0aEFyZyk7XG4gICAgICAgIHRoaXMucGxheUF1ZGlvZmlsZShhdWRpb2ZpbGUpO1xuICAgIH07XG4gICAgcGxheUZyb21VcmwocGF0aEFyZzpzdHJpbmcpe1xuICAgICAgICB2YXIgYXVkaW9maWxlID0gbmV3IEF1ZGlvZmlsZShwYXRoQXJnKTtcbiAgICAgICAgYXVkaW9maWxlLmxvY2F0aW9uVHlwZSA9IFwic2VydmVyXCI7XG4gICAgICAgIHRoaXMucGxheUF1ZGlvZmlsZShhdWRpb2ZpbGUpO1xuICAgIH1cbiAgICB2b2x1bWUocGVyY2VudGFnZUFyZzpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIudm9sdW1lID0gcGVyY2VudGFnZUFyZztcbiAgICB9XG4gICAgY3VycmVudFRpbWUoKXtcblxuICAgIH1cbn1cblxuY2xhc3MgQXVkaW9maWxlIHtcbiAgICBwdWJsaWMgcGF0aDpzdHJpbmc7XG4gICAgcHVibGljIGxvY2F0aW9uVHlwZTpzdHJpbmc7XG4gICAgcHVibGljIGZpbGVUeXBlOnN0cmluZztcbiAgICBwdWJsaWMgY29tcHJlc3Npb25UeXBlOnN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihwYXRoQXJnKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBsdWdpbnMucGF0aC5yZXNvbHZlKHBhdGhBcmcpO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uVHlwZSA9IFBsYXlDb250cm9sUGxheWVyQXVkaW9maWxlLmdldENvbXByZXNzaW9uVHlwZShwYXRoQXJnKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvblR5cGUgPSBQbGF5Q29udHJvbFBsYXllckF1ZGlvZmlsZS5nZXRMb2NhdGlvblR5cGUocGF0aEFyZyk7XG4gICAgICAgIHRoaXMuZmlsZVR5cGUgPSBQbGF5Q29udHJvbFBsYXllckF1ZGlvZmlsZS5nZXRGaWxlVHlwZShwYXRoQXJnKTtcbiAgICB9O1xuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
