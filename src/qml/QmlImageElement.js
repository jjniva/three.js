var __texImageToImageMap = {};
export { __texImageToImageMap };

function QtEvent() {
};

Object.assign( QtEvent.prototype, {
    constructor: QtEvent
});

export { QtEvent };

function Image () {
    this.crossOrigin = undefined;
    this._src = undefined;
    this._onSuccessCallback  = undefined;
    this._onProgressCallback = undefined;
    this._onErrorCallback    = undefined;
    this._width  = 0;
    this._height = 0;
    this._texImage = TextureImageFactory.newTexImage();
    __texImageToImageMap[""+this._texImage.id()] = this;

    // Setup mapping between the native QObject image and this image
    var _this = this;

    this._texImage.imageLoaded.connect(function() { _this.notifySuccess(_this) });
    this._texImage.imageLoadingFailed.connect(function() { _this.notifyError(_this) });

    this.__defineGetter__("src", function(){
        return _this._src;
    });

    this.__defineSetter__("src", function(url){
        if (url && url !== '' && url !== _this._src) {
            _this._texImage.src = ""+url;
            _this._texImage.name = ""+url;
        }
        _this._src = url;
    });

    this.__defineGetter__("width", function(){
        return (_this._texImage !== undefined)?_this._texImage.width:0;
    });

    this.__defineSetter__("width", function(url){
        console.log("TODO: Implement image resize");
    });

    this.__defineGetter__("height", function(){
        return (_this._texImage !== undefined)?_this._texImage.height:0;
    });

    this.__defineSetter__("height", function(url){
        console.log("TODO: Implement image resize");
    });
};

Object.assign( Image.prototype, {

    constructor: Image,

    addEventListener: function( eventName, callback, flag ) {
      if (eventName === 'load') {
          this._onSuccessCallback = callback;
      } else if (eventName === 'progress') {
          this._onProgressCallback = callback;
      } else if (eventName === 'error') {
          this._onErrorCallback = callback;
      }
    },

    notifySuccess: function(image) {
      if (this._onSuccessCallback !== undefined) {
          this._onSuccessCallback(new QtEvent());
      }
    },

    notifyProgress: function(image) {
      if (this._onProgressCallback !== undefined) {
          this._onProgressCallback(new QtEvent());
      }
    },

    notifyError: function(image) {
      if (this._onErrorCallback !== undefined) {
          this._onErrorCallback(new QtEvent());
      }
    },

    texImage: function() {
      return this._texImage;
    },

    data: function() {
      console.error("Image.data not implemented!");
    }
});

// TODO: Support for resizing:
//where.image.width = width;
//where.image.height = height;
//where.image.getContext( '2d' ).drawImage( this, 0, 0, width, height );

export { Image };
